import { AlertDialog, Flex, Spinner } from "@radix-ui/themes";

export type LoaderProps = {
    isLoading?: boolean;
    message?: string;
}

export const Loader = ({ isLoading = true, message }: LoaderProps) => {
    if (!isLoading) { console.log(isLoading); return null; }

    return (
        <AlertDialog.Root>
            <AlertDialog.Content>
                <Spinner size={"3"}></Spinner>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}
