import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/alert";
import { APIError } from "../types";

interface Props {
  error: APIError;
}

export function Error(props: Props) {
  const { error } = props;

  return (
    <Alert status="error" mb={2}>
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}