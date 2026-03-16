<template>
  <div class="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden border border-gray-100 shadow-sm">
    <div ref="mapContainer" class="w-full h-full z-0"></div>
    
    <!-- Custom Map Legend -->
    <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-lg border border-gray-100 shadow-lg z-[1000] text-xs space-y-2">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></span>
        <span class="text-gray-700 font-medium">Recursos</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-200"></span>
        <span class="text-gray-700 font-medium">Áreas de Risco</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  resources: {
    type: Array,
    default: () => []
  },
  risks: {
    type: Array,
    default: () => []
  }
})

const mapContainer = ref(null)
let map = null
let markersGroup = null

// Fix Leaflet's default icon path issues in Vite
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
  })
}

const initMap = () => {
  if (!mapContainer.value) return

  fixLeafletIcon()

  // Initialize map centered on Maputo area (adjust coordinates as needed for your specific community)
  map = L.map(mapContainer.value, {
    center: [-25.9692, 32.5732],
    zoom: 13,
    zoomControl: false // We'll position it later or keep it minimal
  })

  // Use a beautiful, minimal tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map)

  // Add zoom control at a better position
  L.control.zoom({
    position: 'topright'
  }).addTo(map)

  markersGroup = L.layerGroup().addTo(map)
  renderMarkers()
}

const renderMarkers = () => {
  if (!markersGroup) return
  markersGroup.clearLayers()

  // Helper for random-ish offsets for demo data if coordinates aren't provided
  const getRandomOffset = () => (Math.random() - 0.5) * 0.02

  // Add Resources
  props.resources.forEach((res, index) => {
    // For demo: if no lat/lng, spread them around Maputo
    const lat = -25.9692 + getRandomOffset()
    const lng = 32.5732 + getRandomOffset()

    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg transform transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })

    L.marker([lat, lng], { icon: customIcon })
      .bindPopup(`
        <div class="font-sans p-1">
          <h4 class="font-bold text-gray-900 border-b pb-1 mb-2">${res.name}</h4>
          <p class="text-xs text-gray-600 mb-1"><strong>Tipo:</strong> ${res.type}</p>
          <p class="text-xs text-gray-600"><strong>Local:</strong> ${res.location}</p>
          <div class="mt-2 text-[10px] font-bold uppercase tracking-wider ${res.status === 'Ativo' ? 'text-green-600' : 'text-orange-600'}">
            ${res.status}
          </div>
        </div>
      `)
      .addTo(markersGroup)
  })

  // Add Risks
  props.risks.forEach((risk, index) => {
    const lat = -25.9692 + getRandomOffset()
    const lng = 32.5732 + getRandomOffset()

    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })

    L.marker([lat, lng], { icon: customIcon })
      .bindPopup(`
        <div class="font-sans p-1 min-w-[150px]">
          <h4 class="font-bold text-red-600 border-b border-red-100 pb-1 mb-2">${risk.name}</h4>
          <p class="text-xs text-gray-700 leading-relaxed">${risk.description}</p>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-[10px] text-gray-500">${risk.families} famílias</span>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${risk.priority === 'Crítica' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}">
              ${risk.priority}
            </span>
          </div>
        </div>
      `)
      .addTo(markersGroup)
  })

  // Fit bounds if we have markers
  if (markersGroup.getLayers().length > 0) {
    const group = new L.featureGroup(markersGroup.getLayers())
    map.fitBounds(group.getBounds().pad(0.1))
  }
}

watch([() => props.resources, () => props.risks], () => {
  renderMarkers()
}, { deep: true })

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style>
/* Leaflet Popup Styling */
.leaflet-popup-content-wrapper {
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.leaflet-popup-tip {
  background: rgba(255, 255, 255, 0.95);
}

.leaflet-container {
  font-family: inherit;
}

.custom-div-icon {
  background: transparent;
  border: none;
}
</style>
