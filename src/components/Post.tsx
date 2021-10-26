import { Avatar } from '@chakra-ui/avatar';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useUpvoteMutation } from '../queries';
import { Post as Props } from '../types';

export function Post(props: Props) {
  const { id, username, title, content, votes } = props;
  const { mutateAsync, isLoading } = useUpvoteMutation();

  const vote = () => {
    mutateAsync({ id });
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading>{title}</Heading>
      <Flex alignItems="center" mb={2}>
        <Avatar name={username} size="sm"/>
        <Text ml={2} isTruncated>{username}</Text>
      </Flex>
      <Text>{content}</Text>
      <Button onClick={vote} isLoading={isLoading} leftIcon={<StarIcon />}>{votes || 0} votes</Button>
    </Box>
  );
}
