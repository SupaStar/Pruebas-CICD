import { useEffect, useState } from "react"
import { Dialog, Flex, Text, Spinner, TextField, Button, Callout } from "@radix-ui/themes"
import { getProductById, updateProductById } from "@/api/services/productsService"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Product } from "@/api/models/Products/Product"

interface ProductEditModalProps {
    productId: number | null
    open: boolean
    onClose: (state: number) => void
}

export const ProductEditModal = ({ productId, open, onClose }: ProductEditModalProps) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!productId || !open) return
        setLoading(true)
        getProductById(productId)
            .then(setProduct)
            .finally(() => setLoading(false));
    }, [productId, open])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (product) {
            const updatedProduct = new Product({
                ...product,
                [name]: value,
            })
            setProduct(updatedProduct)
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setIsError(false);
        updateProductById(product!).then((respuesta) => {
            if (respuesta.id == productId) {
                onClose(0);
            } else {
                setIsError(true);
            }
        }).finally(() => setLoading(false));
    }

    return (
        <Dialog.Root open={open} onOpenChange={() => onClose(1)}>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Editar Producto</Dialog.Title>
                {loading ? (
                    <Flex justify="center" align="center" height="200px">
                        <Spinner />
                    </Flex>
                ) : product ? (
                    <form onSubmit={handleEdit}>
                        <Flex direction="column" gap="4">
                            <div hidden={!isError}>
                                <Callout.Root color="red">
                                    <Callout.Icon>
                                        <InfoCircledIcon />
                                    </Callout.Icon>
                                    <Callout.Text>
                                        Hubo un error al guardar los cambios del producto.
                                    </Callout.Text>
                                </Callout.Root>
                            </div>
                            <Flex direction="column" gap="1">
                                <Text as="label" htmlFor="title">Título:</Text>
                                <TextField.Root
                                    id="title"
                                    name="title"
                                    value={product.title}
                                    onChange={handleChange}
                                    placeholder="Título del producto"
                                />
                            </Flex>
                            <Flex direction="column" gap="1">
                                <Text as="label" htmlFor="image">URL de Imagen:</Text>
                                <TextField.Root
                                    id="image"
                                    name="image"
                                    value={product.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </Flex>
                            <Flex direction="column" gap="1">
                                <Text as="label" htmlFor="price">Precio:</Text>
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
                                <Text as="label" htmlFor="description">Descripción:</Text>
                                <TextField.Root
                                    id="description"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    placeholder="Descripción del producto"
                                />
                            </Flex>
                            <Flex direction="column" gap="1">
                                <Text as="label" htmlFor="category">Categoría:</Text>
                                <TextField.Root
                                    id="category"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    placeholder="Categoría"
                                />
                            </Flex>
                            <Flex justify="center" gap="3">
                                <Button variant="solid" size="3">Guardar</Button>
                                <Dialog.Close>
                                    <Button variant="solid" size="3" color="red">Cancelar</Button>
                                </Dialog.Close>
                            </Flex>
                        </Flex>
                    </form>
                ) : (
                    <Text>No se pudo cargar el producto.</Text>
                )}
            </Dialog.Content>
        </Dialog.Root>
    )
}