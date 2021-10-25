import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Post as Props } from '../types';

export function Post(props: Props) {
  const { username, title, content } = props;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading>{title}</Heading>
      <Flex alignItems="center" mb={2}>
        <Avatar name={username} size="sm"/>
        <Text ml={2}>{username}</Text>
      </Flex>
      <Text>{content}</Text>
    </Box>
  );
}