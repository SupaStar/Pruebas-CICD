import { useAuthStore } from "../stores/useAuthStore"
import { useRouter } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"
import { deleteProductById, getProducts } from "@/api/services/productsService"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Table,
  Text,
  Separator,
  Badge,
  IconButton,
  Callout,
  AlertDialog,
  TextField,
  Select,
} from "@radix-ui/themes"
import { Utils } from "@/components/Utils/Utils"
import { EyeOpenIcon, InfoCircledIcon, MagnifyingGlassIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { ProductDetailModal } from "@/components/modals/ProductDetailModal"
import { ProductEditModal } from "@/components/modals/ProductEditModal"
import { Product } from "@/api/models/Products/Product"
import { ProductAddModal } from "@/components/modals/ProductAddModal"

export const Dashboard = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [modalDetailOpen, setModalDetailOpen] = useState(false)
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [modalAddOpen, setModalAddOpen] = useState(false)
  const [isEdited, setIsEdited] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [productIdDelete, setProductIdDelete] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<number[]>([1])
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProductsPerPage("10");
      setDebouncedValue(search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    handleDebouncedChange();
  }, [debouncedValue]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setFilteredProducts(data);
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setSearch("");
    calculatePagesAndData();
  }, [products, productsPerPage, page]);

  const calculatePagesAndData = () => {
    const totalPages = Math.ceil(products.length / Number(productsPerPage));
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
    obtenerProductosPagina();
  }
  const handleLogout = () => {
    logout()
    router.navigate({ to: "/" })
  }

  const handleViewProduct = useCallback((id: number) => {
    setSelectedProductId(id);
    setModalDetailOpen(true);
  }, []);

  const handleEditProduct = useCallback((id: number) => {
    setSelectedProductId(id);
    setModalEditOpen(true);
  }, []);

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const handleDebouncedChange = () => {
    if (debouncedValue == "") {
      obtenerProductosPagina();
    } else {
      const productosFiltrados = products.filter(product =>
        product.title.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setFilteredProducts(productosFiltrados);
    }
  };

  const obtenerProductosPagina = () => {
    const totalPages = Math.ceil(products.length / Number(productsPerPage));
    if (page > totalPages && totalPages != 0) {
      setPage(totalPages);
    } else {
      const inicio = (page - 1) * Number.parseInt(productsPerPage);
      const fin = page * Number.parseInt(productsPerPage);
      setFilteredProducts(products.slice(inicio, fin));
    }
  }

  const handleDeleteProduct = () => {
    setIsDeleting(true);
    deleteProductById(productIdDelete!)
      .then(() => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productIdDelete));
        setProductIdDelete(null);
      }).finally(() =>
        setIsDeleting(false)
      );
  }

  const processCloseEditModal = (state: number) => {
    switch (state) {
      case 0:
        setModalEditOpen(false);
        setIsEdited(true);
        setTimeout(() => {
          setIsEdited(false);
        }, 3000);
        break;
      default:
        setModalEditOpen(false);
        break;
    }
  }

  const proccessCloseAddModal = (product: Product | null) => {
    setModalAddOpen(false);
    if (product != null) {
      setProducts([...products, product]);
    }
  }

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  }

  return (
    <Box mb="4"
      p="4"
      style={{
        background: 'white',
        color: 'black',
        borderRadius: '12px',
      }}>
      <Flex align="center" justify="between">
        <Flex align="center" gap="4">
          <Avatar fallback={user?.[0]?.toUpperCase() || "U"} size="4" radius="full"

          />
          <Box>
            <Heading size="20">Hola, {user} 👋</Heading>
            <Text size="4">Bienvenido al panel de administración</Text>
          </Box>
        </Flex>
        <Button onClick={() => setModalAddOpen(true)}>Agregar producto</Button>
      </Flex>

      <ProductDetailModal
        productId={selectedProductId}
        open={modalDetailOpen}
        onClose={() => setModalDetailOpen(false)}
      />
      <ProductEditModal
        productId={selectedProductId}
        open={modalEditOpen}
        onClose={(respuesta) => processCloseEditModal(respuesta)}
      />
      <ProductAddModal
        open={modalAddOpen}
        onClose={(respuesta) => proccessCloseAddModal(respuesta)}
      />
      <AlertDialog.Root open={productIdDelete != null}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Eliminar Producto</AlertDialog.Title>
          <AlertDialog.Description size="2">
            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={() => setProductIdDelete(null)}>
              Cancelar
            </Button>
            <Button variant="solid" color="red" loading={isDeleting} onClick={handleDeleteProduct}>
              Eliminar
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <div hidden={!isEdited}>
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Cambios guardados con exito.
          </Callout.Text>
        </Callout.Root>
        <Separator size="4" mb="4" />

      </div>

      <Flex direction="row" gap={"3"}>
        <Flex align={"end"}>
          <TextField.Root
            value={search}
            onChange={handleSearch}
            placeholder="Buscar..."
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        <Flex direction={"row"}>
          <Select.Root value={productsPerPage} onValueChange={(newValue) => setProductsPerPage(newValue)}>
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="3">3</Select.Item>
              <Select.Item value="6">6</Select.Item>
              <Select.Item value="10">10</Select.Item>
            </Select.Content>
          </Select.Root>
          {pages.map((newPage) => (
            <Button onClick={() => changePage(newPage)} disabled={newPage == page} key={newPage}>{newPage}</Button>
          ))}
        </Flex>

      </Flex>
      {loading ? (
        <Flex direction="column" gap="4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} style={{ height: '60px', borderRadius: '8px' }} />
          ))}
        </Flex>
      ) : (
        <Box style={{ maxHeight: '600px', overflowY: 'auto', scrollBehavior: 'smooth' }}>
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
                  <Table.Cell><Badge color={Utils.getRandomColor()}>{product.category}</Badge></Table.Cell>
                  <Table.Cell>
                    <Flex gap="2" justify="start">
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

  )
}

export default Dashboard