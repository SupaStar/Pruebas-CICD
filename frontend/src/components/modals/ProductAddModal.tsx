import { useEffect, useState } from 'react'
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { addProduct } from '@/api/services/productsService'
import { Product } from '@/api/models/Products/Product'

interface ProductEditModalProps {
  open: boolean
  onClose: (product: Product | null) => void
}
export const ProductAddModal = ({ open, onClose }: ProductEditModalProps) => {
  const [product, setProduct] = useState<Product>(new Product({}))
  const [isError, setIsError] = useState(false)
  const [isloading, setIsLoading] = useState(false)

  useEffect(() => {
    setProduct(new Product({}))
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedProduct = new Product({
      ...product,
      [name]: value,
    })
    setProduct(updatedProduct)
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    addProduct(product)
      .then((response) => {
        onClose(response)
      })
      .catch((error) => {
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Dialog.Root open={open} onOpenChange={() => onClose(null)}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Agregar Producto</Dialog.Title>
        <form onSubmit={handleAdd}>
          <Flex direction="column" gap="4">
            <div hidden={!isError}>
              <Callout.Root color="red">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Hubo un error al guardar el producto.
                </Callout.Text>
              </Callout.Root>
            </div>
            <Flex direction="column" gap="1">
              <Text as="label" htmlFor="title">
                Título:
              </Text>
              <TextField.Root
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Título del producto"
              />
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="label" htmlFor="image">
                URL de Imagen:
              </Text>
              <TextField.Root
                id="image"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="label" htmlFor="price">
                Precio:
              </Text>
              <TextField.Root
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Precio"
                type="number"
              />
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="label" htmlFor="description">
                Descripción:
              </Text>
              <TextField.Root
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Descripción del producto"
              />
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="label" htmlFor="category">
                Categoría:
              </Text>
              <TextField.Root
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Categoría"
              />
            </Flex>
            <Flex justify="center" gap="3">
              <Button variant="solid" size="3" loading={isloading}>
                Guardar
              </Button>
              <Dialog.Close>
                <Button variant="solid" size="3" color="red">
                  Cancelar
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
