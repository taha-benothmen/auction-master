import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Box, Text, Flex, VStack, HStack, Heading } from '@chakra-ui/react';

export default function Themes() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [topThemes, setTopThemes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1234/themes/top', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTopThemes(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box>
      <VStack spacing="5px" mt="15px">
        <Heading>
            Top Themes by User Count
        </Heading>
        {topThemes.map((theme) => {
          return (
            <Flex justifyContent="center">
              <HStack>
                <Text>{theme.theme_name}</Text>
                <Text>{theme.user_count}</Text>
              </HStack>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}
