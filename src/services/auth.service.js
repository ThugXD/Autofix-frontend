import api from '@/services/api'

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', {
    email,
    password,
  })

  return data
}

export const register = async payload => {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export const getMe = async () => {
  const { data } = await api.get('/auth/me')
  return data
}

export const refreshToken = async refreshToken => {
  const { data } = await api.post('/auth/refresh', {
    refreshToken,
  })
  return data
}
