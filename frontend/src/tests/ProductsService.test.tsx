import { axiosInstance } from '@/api/config/axios'
import { ENDPOINTS } from '@/api/config/endpoints'
import { Product } from '@/api/models/Products/Product'
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from '@/api/services/productsService'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest' // ajusta la ruta si es distinta

// Datos de prueba
const rawProducts = [
    {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
            'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image:
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
    {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts ',
        price: 22.3,
        description:
            'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts…',
        category: "men's clothing",
        image:
            'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    },
    {
        id: 3,
        title: 'Mens Cotton Jacket',
        price: 55.99,
        description:
            'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping…',
        category: "men's clothing",
        image:
            'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    },
    {
        id: 4,
        title: 'Mens Casual Slim Fit',
        price: 15.99,
        description:
            'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person…',
        category: "men's clothing",
        image:
            'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    },
    {
        id: 5,
        title:
            "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description:
            "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl…",
        category: 'jewelery',
        image:
            'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    },
]
const rawProduct = {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 15.99,
    description:
        'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person…',
    category: "men's clothing",
    image:
        'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
}

describe('Product services', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    test('debe llamar al endpoint y devolver 5 instancias de Product', async () => {
        vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({ data: rawProducts })

        const products = await getProducts()

        expect(axiosInstance.get).toHaveBeenCalledWith(ENDPOINTS.GET_PRODUCTS)
        expect(Array.isArray(products)).toBe(true)
        expect(products).toHaveLength(rawProducts.length)
        products.forEach((p, idx) => {
            const src = rawProducts[idx]
            expect(p).toBeInstanceOf(Product)
            expect(p.id).toBe(src.id)
            expect(p.title).toBe(src.title)
            expect(p.price).toBe(src.price)
            expect(p.description).toBe(src.description)
            expect(p.category).toBe(src.category)
            expect(p.image).toBe(src.image)

            const expectedFormatted = `$${src.price.toFixed(2)}`
            expect(p.formattedPrice).toBe(expectedFormatted)
        })
    })

    test('getProductById debería devolver instancia de Product', async () => {
        const id = 4
        vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({ data: rawProduct })

        const product = await getProductById(id)

        expect(axiosInstance.get).toHaveBeenCalledWith(ENDPOINTS.GET_PRODUCT(id))
        expect(product).toBeInstanceOf(Product)
        expect(product.id).toBe(rawProduct.id)
        expect(product.title).toBe(rawProduct.title)
        expect(product.price).toBe(rawProduct.price)
        expect(product.description).toBe(rawProduct.description)
        expect(product.category).toBe(rawProduct.category)
        expect(product.image).toBe(rawProduct.image)

        const expectedFormatted = `$${rawProduct.price.toFixed(2)}`
        expect(product.formattedPrice).toBe(expectedFormatted)
    })

    test('updateProductById debería enviar PUT y devolver instancia actualizada', async () => {
        const updatedRaw = { ...rawProduct, price: 1234 }
        const productToUpdate = new Product(rawProduct)
        vi.spyOn(axiosInstance, 'put').mockResolvedValueOnce({ data: updatedRaw })

        const updated = await updateProductById(productToUpdate)

        expect(axiosInstance.put).toHaveBeenCalledWith(
            ENDPOINTS.UPDATE_PRODUCT(productToUpdate.id),
            productToUpdate,
        )
        expect(updated).toBeInstanceOf(Product)
        expect(updated.price).toBe(updatedRaw.price)
    })

    test('deleteProductById debería devolver true si status es 200', async () => {
        const id = 7
        vi.spyOn(axiosInstance, 'delete').mockResolvedValueOnce({ status: 200 })

        const result = await deleteProductById(id)

        expect(axiosInstance.delete).toHaveBeenCalledWith(ENDPOINTS.DELETE_PRODUCT(id))
        expect(result).toBe(true)
    })

    test('deleteProductById debería devolver false si status no es 200', async () => {
        const id = 8
        vi.spyOn(axiosInstance, 'delete').mockResolvedValueOnce({ status: 404 })

        const result = await deleteProductById(id)

        expect(result).toBe(false)
    })

    test('addProduct debería enviar POST y devolver nueva instancia de Product', async () => {
        vi.spyOn(axiosInstance, 'post').mockResolvedValueOnce({ data: rawProduct })
        const newProduct = new Product({ name: 'Nuevo', price: 500 })

        const created = await addProduct(newProduct)

        expect(axiosInstance.post).toHaveBeenCalledWith(ENDPOINTS.ADD_PRODUCT, newProduct)
        expect(created).toBeInstanceOf(Product)
        expect(created.name).toBe(rawProduct.name)
        expect(created.price).toBe(rawProduct.price)
    })
})
