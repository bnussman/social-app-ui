import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Input, Stack, Textarea, Text } from "@chakra-ui/react";
import { usePostsMutation } from "../queries";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export function NewPostDialog(props: Props) {
  const { onClose, isOpen } = props;
  const { mutateAsync, isLoading, error } = usePostsMutation();
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");

  const onPost = () => {
    mutateAsync({ title, username, content }).then(() => {
      onClose()
    });
  };

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text>{error}</Text>}
          <Stack spacing={2}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your post content here..."
          />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            onClick={onPost}
            colorScheme="blue"
          >
              Add Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}