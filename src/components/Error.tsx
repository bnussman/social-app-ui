import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/alert";

interface Props {
  error: any;
}

export function Error(props: Props) {
  const { error } = props;

  return (
    <Alert status="error">
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}