import { useAuthStore } from "../stores/useAuthStore"
import { useRouter } from "@tanstack/react-router"
import "../styles.css"
import { useEffect, useState } from "react"
import { getProducts } from "@/api/services/productsService"
import { Avatar, Container, Flex, Skeleton, Table, Text } from "@radix-ui/themes"
import { Product } from "@/api/models/Product"

export const Dashboard = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true);

  const handleLogout = () => {
    logout()
    router.navigate({ to: "/" })
  }

  useEffect(() => {
    productsService();
  }, [router]);

  useEffect(() => {
    if (products.length > 0) {
      setProductsLoading(false);
    }
  }, [products]);

  const productsService = async () => {
    getProducts().then(setProducts);
  };

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user} 👋</h1>
      <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      <Table.Root className="light" hidden={productsLoading}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Imagen</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Titulo</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Precio</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Descripcion</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Categoría</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.RowHeaderCell>
                <Avatar src={product.image} fallback={"A"} />
              </Table.RowHeaderCell>
              <Table.Cell>{product.title}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div hidden={!productsLoading}>
        <Container size={"4"} className="light" >
          <Flex direction="column" gap="6" >
            <Text>
              <Skeleton>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                erat, fringilla sed commodo sed, aliquet nec magna.
              </Skeleton>
            </Text>

            <Skeleton>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                erat, fringilla sed commodo sed, aliquet nec magna.
              </Text>
            </Skeleton>
            <Skeleton>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                erat, fringilla sed commodo sed, aliquet nec magna.
              </Text>
            </Skeleton>
            <Skeleton>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                erat, fringilla sed commodo sed, aliquet nec magna.
              </Text>
            </Skeleton>
          </Flex>
        </Container>
      </div>
    </div>
  )
}
export default Dashboard
