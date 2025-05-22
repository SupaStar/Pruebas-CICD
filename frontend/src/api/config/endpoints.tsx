export const ENDPOINTS = {
  LOGIN: '/auth/login',
  GET_PRODUCTS: '/products',
  ADD_PRODUCT: '/products',
  GET_PRODUCT: (id: number) => `/products/${id}`,
  UPDATE_PRODUCT: (id: number) => `/products/${id}`,
  DELETE_PRODUCT: (id: number) => `/products/${id}`,
}
