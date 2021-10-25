import { Spinner } from '@chakra-ui/spinner';
import { Box, Button, Center, Container, Flex, Heading, Spacer, Stack, Text, useColorMode, useDisclosure } from '@chakra-ui/react';
import { usePostsQuery } from './queries'
import { Error } from './components/Error';
import { Post as PostType } from './types';
import { Post } from './components/Post';
import { NewPostDialog } from './components/NewPostDialog';
import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

function App() {
  const { isLoading, data, error } = usePostsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="container.lg">
      <Flex alignItems="center" mb={4} mt={4}>
        <Box>
          <Heading size="xl">Social App</Heading>
          <Heading size="sm" color="gray.500">for Cloudflare Internship by Banks Nussman</Heading>
        </Box>
        <Spacer />
        <Stack direction={["column", "row"]} spacing={4}>
          <Button onClick={toggleColorMode} rightIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Button
            onClick={onOpen}
            rightIcon={<AddIcon />}
          >
            New Post
          </Button>
        </Stack>
      </Flex>
      {error && <Error error={error} />}
      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}
      {data?.length === 0 && <Text>No Posts</Text>}
      <Stack spacing={4}>
        {data?.map((post: PostType) => <Post key={post.id} {...post} />)}
      </Stack>
      <NewPostDialog
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  )
}

export default App
