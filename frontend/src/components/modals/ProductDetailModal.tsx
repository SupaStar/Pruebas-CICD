import { useEffect, useState } from 'react'
import { Avatar, Dialog, Flex, Heading, Spinner, Text } from '@radix-ui/themes'
import type { Product } from '@/api/models/Products/Product'
import { getProductById } from '@/api/services/productsService'

interface ProductDetailModalProps {
  productId: number | null
  open: boolean
  onClose: () => void
}

export const ProductDetailModal = ({
  productId,
  open,
  onClose,
}: ProductDetailModalProps) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productId || !open) return
    setLoading(true)
    getProductById(productId)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [productId, open])

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Detalle del producto</Dialog.Title>
        {loading ? (
          <Flex justify="center" align="center" height="200px">
            <Spinner />
          </Flex>
        ) : product ? (
          <Flex direction="column" gap="4">
            <Heading>{product.title}</Heading>
            <Flex justify="center">
              <Avatar src={product.image} size="9" fallback={'A'} />
            </Flex>
            <Text>
              <strong>Precio:</strong> ${product.price}
            </Text>
            <Text>
              <strong>Descripción:</strong> {product.description}
            </Text>
            <Text>
              <strong>Categoría:</strong> {product.category}
            </Text>
          </Flex>
        ) : (
          <Text>No se pudo cargar el producto.</Text>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
