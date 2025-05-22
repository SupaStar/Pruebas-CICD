import { axiosInstance } from '../config/axios'
import { ENDPOINTS } from '../config/endpoints'
import { Product } from '../models/Products/Product'

export const getProducts = async (): Promise<Array<Product>> => {
  const response = await axiosInstance.get(ENDPOINTS.GET_PRODUCTS)
  return response.data.map((item: any) => new Product(item))
}

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axiosInstance.get(ENDPOINTS.GET_PRODUCT(id))
  return new Product(response.data)
}

export const updateProductById = async (product: Product): Promise<Product> => {
  const response = await axiosInstance.put(
    ENDPOINTS.UPDATE_PRODUCT(product.id),
    product,
  )
  return new Product(response.data)
}

export const deleteProductById = async (id: number): Promise<boolean> => {
  const response = await axiosInstance.delete(ENDPOINTS.DELETE_PRODUCT(id))
  return response.status == 200
}

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await axiosInstance.post(ENDPOINTS.ADD_PRODUCT, product)
  return new Product(response.data)
}
