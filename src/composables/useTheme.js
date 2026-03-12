import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
    const toggleTheme = (event) => {
        isDark.value = !isDark.value

        // Get click position for animation
        const x = event?.clientX ?? window.innerWidth / 2
        const y = event?.clientY ?? window.innerHeight / 2

        // Create circular reveal animation (Telegram-style)
        if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const transition = document.startViewTransition(() => {
                applyTheme()
            })
        } else {
            // Fallback for browsers without View Transition API
            createCircularReveal(x, y)
            applyTheme()
        }
    }

    const createCircularReveal = (x, y) => {
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        // Create overlay element
        const overlay = document.createElement('div')
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: ${isDark.value ? '#111827' : '#f9fafb'};
      clip-path: circle(0px at ${x}px ${y}px);
      transition: clip-path 0.5s ease-in-out;
    `

        document.body.appendChild(overlay)

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`
        })

        // Remove overlay after animation
        setTimeout(() => {
            overlay.remove()
        }, 500)
    }

    const setTheme = (dark) => {
        isDark.value = dark
        applyTheme()
    }

    const applyTheme = () => {
        const root = document.documentElement

        if (isDark.value) {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            root.style.colorScheme = 'dark'
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            root.style.colorScheme = 'light'
        }
    }

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme')

        if (savedTheme) {
            isDark.value = savedTheme === 'dark'
        } else {
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }

        applyTheme()

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                isDark.value = e.matches
                applyTheme()
            }
        })
    }

    return {
        isDark,
        toggleTheme,
        setTheme,
        initTheme
    }
}
