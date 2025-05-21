import { axiosInstance } from "../config/axios";
import { Product } from "../models/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("/products");
  return response.data.map((item: any) => new Product(item));
};