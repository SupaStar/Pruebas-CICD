import { useRouter } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import {
  AlertDialog,
  Avatar,
  Badge,
  Box,
  Button,
  Callout,
  Flex,
  Heading,
  IconButton,
  Select,
  Separator,
  Skeleton,
  Table,
  Text,
  TextField,
} from '@radix-ui/themes'
import {
  EyeOpenIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { useAuthStore } from '../stores/useAuthStore'
import type { Product } from '@/api/models/Products/Product'
import { ProductDetailModal } from '@/components/modals/ProductDetailModal'
import { ProductEditModal } from '@/components/modals/ProductEditModal'
import { deleteProductById, getProducts } from '@/api/services/productsService'
import { ProductAddModal } from '@/components/modals/ProductAddModal'
import { Utils } from '@/components/Utils/Utils'

export const Dashboard = () => {
  const user = useAuthStore((s) => s.user)

  const [products, setProducts] = useState<Array<Product>>([])
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([])
  const [loading, setLoading] = useState(true)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  )
  const [modalDetailOpen, setModalDetailOpen] = useState(false)
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [modalAddOpen, setModalAddOpen] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [productsPerPage, setProductsPerPage] = useState('10')
  const [page, setPage] = useState(1)
  const [productIdDelete, setProductIdDelete] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<Array<number>>([1])
  const [debouncedValue, setDebouncedValue] = useState(search)

  const Footer = () => (
    <Box
      as="div"
      mt="2"
      pt="3"
      px="4"
      style={{
        background: '#f0f2f8',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <Separator size="4" mb="3" />
      <Flex justify="between" align="center" wrap="wrap">
        <Text size="2" color="gray">
          © {new Date().getFullYear()} MiApp. Todos los derechos reservados.
        </Text>
        <Flex gap="3"></Flex>
      </Flex>
    </Box>
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setProductsPerPage('10')
      setDebouncedValue(search)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    handleDebouncedChange()
  }, [debouncedValue])

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setFilteredProducts(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setSearch('')
    calculatePagesAndData()
  }, [products, productsPerPage, page])

  const handleViewProduct = useCallback((id: number) => {
    setSelectedProductId(id)
    setModalDetailOpen(true)
  }, [])

  const handleEditProduct = useCallback((id: number) => {
    setSelectedProductId(id)
    setModalEditOpen(true)
  }, [])

  const handleSearch = (event: any) => setSearch(event.target.value)

  const handleDebouncedChange = () => {
    if (debouncedValue === '') {
      obtenerProductosPagina()
    } else {
      const productosFiltrados = products.filter(
        (product) =>
          product.title.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()),
      )
      setFilteredProducts(productosFiltrados)
    }
  }

  const calculatePagesAndData = () => {
    const totalPages = Math.ceil(products.length / Number(productsPerPage))
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1))
    obtenerProductosPagina()
  }

  const obtenerProductosPagina = () => {
    const totalPages = Math.ceil(products.length / Number(productsPerPage))
    if (page > totalPages && totalPages !== 0) {
      setPage(totalPages)
    } else {
      const inicio = (page - 1) * Number.parseInt(productsPerPage)
      const fin = page * Number.parseInt(productsPerPage)
      setFilteredProducts(products.slice(inicio, fin))
    }
  }

  const handleDeleteProduct = () => {
    setIsDeleting(true)
    deleteProductById(productIdDelete!)
      .then(() => {
        setProducts((prev) =>
          prev.filter((product) => product.id !== productIdDelete),
        )
        setProductIdDelete(null)
      })
      .finally(() => setIsDeleting(false))
  }

  const processCloseEditModal = (state: number) => {
    setModalEditOpen(false)
    if (state === 0) {
      setIsEdited(true)
      setTimeout(() => setIsEdited(false), 3000)
    }
  }

  const proccessCloseAddModal = (product: Product | null) => {
    setModalAddOpen(false)
    if (product) {
      setProducts([...products, product])
    }
  }

  const changePage = (pageNumber: number) => setPage(pageNumber)

  return (
    <Box
      style={{
        minHeight: '99vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f4f5fb',
      }}
    >
      <Box
        mb="2"
        p="4"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          flexGrow: 1,
        }}
      >
        <Flex align="center" justify="between">
          <Flex align="center" gap="4">
            <Avatar
              fallback={user?.[0]?.toUpperCase() || 'U'}
              size="4"
              radius="full"
              style={{ border: '2px solid #4a5568' }}
            />
            <Box>
              <Heading>Hola, {user} 👋</Heading>
              <Text size="2">Bienvenido al panel de administración</Text>
            </Box>
          </Flex>
          <Button color="blue" onClick={() => setModalAddOpen(true)}>
            Agregar producto
          </Button>
        </Flex>

        <Separator size="4" my="4" />

        <ProductDetailModal
          productId={selectedProductId}
          open={modalDetailOpen}
          onClose={() => setModalDetailOpen(false)}
        />
        <ProductEditModal
          productId={selectedProductId}
          open={modalEditOpen}
          onClose={processCloseEditModal}
        />
        <ProductAddModal open={modalAddOpen} onClose={proccessCloseAddModal} />

        <AlertDialog.Root open={productIdDelete != null}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Eliminar Producto</AlertDialog.Title>
            <AlertDialog.Description size="2">
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no
              se puede deshacer.
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={() => setProductIdDelete(null)}
              >
                Cancelar
              </Button>
              <Button
                variant="solid"
                color="red"
                loading={isDeleting}
                onClick={handleDeleteProduct}
              >
                Eliminar
              </Button>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>

        {isEdited && (
          <>
            <Callout.Root>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Cambios guardados con éxito.</Callout.Text>
            </Callout.Root>
            <Separator size="4" my="4" />
          </>
        )}

        <Flex direction="row" gap="3" mb="3" wrap="wrap">
          <TextField.Root
            value={search}
            onChange={handleSearch}
            placeholder="Buscar..."
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

          <Select.Root
            value={productsPerPage}
            onValueChange={setProductsPerPage}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="3">3</Select.Item>
              <Select.Item value="6">6</Select.Item>
              <Select.Item value="10">10</Select.Item>
            </Select.Content>
          </Select.Root>

          {pages.map((p) => (
            <Button key={p} onClick={() => changePage(p)} disabled={p === page}>
              {p}
            </Button>
          ))}
        </Flex>

        {loading ? (
          <Flex direction="column" gap="4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                style={{ height: '60px', borderRadius: '8px' }}
              />
            ))}
          </Flex>
        ) : (
          <Box
            style={{
              maxHeight: '600px',
              overflowY: 'auto',
              scrollBehavior: 'smooth',
            }}
          >
            <Table.Root variant="surface" size="2">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Imagen</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Título</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Precio</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Categoría</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Acciones</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredProducts.map((product) => (
                  <Table.Row key={product.id}>
                    <Table.RowHeaderCell>
                      <Avatar
                        src={product.image}
                        fallback="?"
                        radius="full"
                        size="5"
                      />
                    </Table.RowHeaderCell>
                    <Table.Cell>{product.title}</Table.Cell>
                    <Table.Cell>${product.price}</Table.Cell>
                    <Table.Cell>
                      <Text size="2" color="gray">
                        {product.description.slice(0, 60)}...
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={Utils.getRandomColor()}>
                        {product.category}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Flex gap="2">
                        <IconButton
                          variant="soft"
                          color="yellow"
                          title="Editar"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Pencil1Icon />
                        </IconButton>
                        <IconButton
                          variant="soft"
                          color="red"
                          title="Eliminar"
                          onClick={() => setProductIdDelete(product.id)}
                        >
                          <TrashIcon />
                        </IconButton>
                        <IconButton
                          variant="soft"
                          color="gray"
                          title="Ver detalles"
                          onClick={() => handleViewProduct(product.id)}
                        >
                          <EyeOpenIcon />
                        </IconButton>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  )
}

export default Dashboard
