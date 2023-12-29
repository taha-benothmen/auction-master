import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Link,
  ListItem,
  Icon,
  SimpleGrid,
  Container,
  Stack,
  UnorderedList,
  Box,
  Heading
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { FaUsers } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiShoppingTag } from "react-icons/ci";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';



const StatsWithIcons = () => {
  const [users, setUsers] = useState([]);
  const [themes, setThemes] = useState([]);
  const [listings, setListings] = useState([]);
  const [listingsCount, setlistingsCount] = useState(); // New state to store themes count

  const data = themes.map((theme) => ({
    name: theme.theme_name,
    value: theme.num_listings,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Add more colors as needed

  let statData = [
    {
      id: 1,
      label: "Nombre d'utilisateurs total",
      score: users.length ? users.length : 'zero',
      icon: FaUsers,

    },
    {
      id: 2,
      label: "Nombre de thèmes total",
      score: themes.length ? themes.length : 'zero',
      icon: BiSolidCategoryAlt,

    },
    {
      id: 3,
      label: "Nombre d'articles total",
      score: listings.length ? listings.length : 'zero',
      icon: CiShoppingTag,

    }
  ];

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:1234/getAllUsers');

      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users list:', error);
    }
  };
  const fetchListingsList = async () => {
    try {
      const response = await axios.get('http://localhost:1234/listingCount');
      setListings(response.data.listings);
    } catch (error) {
      console.error('Error fetching listings list:', error);
    }
  };


  const fetchThemesList = async () => {
    try {
      const response = await axios.get('http://localhost:1234/themesCount');
      setThemes(response.data);
    } catch (error) {
      console.error('Error fetching themes list:', error);
    }
  };

  useEffect(() => {
    fetchUserList();
    fetchThemesList();
    fetchListingsList();

  }, []);



  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={6} mb={4}>
        {statData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </SimpleGrid>
      <Text fontWeight="bold" color="black" margin={5}> Statistiques par thème :</Text>

      {themes.map((theme) => (
        <Box
          key={theme.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
       
          p={4}
          mb={4}
        >
          <Text fontWeight="bold" color="blue.500">
            {theme.theme_name}
          </Text>
          <Text>Nombre d'enchère : {theme.num_listings}</Text>
        </Box>
      ))}
            <Text fontWeight="bold" color="black" margin={5}> Diagrame de cas :</Text>

      <Flex
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        p={4}
        mb={4}
        bgColor={'gray.100'}>
        <ResponsiveContainer width="100%" height={400}
        >
          <PieChart
          >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
              width="100%"

            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="150%" height={400}>
          <BarChart data={statData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Container>
  );
};


const Card = ({ data }) => {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <Stack
        direction="column"
        rounded="md"
        boxShadow={useColorModeValue(
          '0 4px 6px rgba(160, 174, 192, 0.6)',
          '2px 4px 6px rgba(9, 17, 28, 0.9)'
        )}
        w="100%"
        textAlign="left"
        align="start"
        spacing={0}
        role="group"
        overflow="hidden"
      >
        <HStack py={6} px={5} spacing={4} bg={useColorModeValue('gray.100', 'gray.800')} w="100%">
          <Flex
            justify="center"
            alignItems="center"
            rounded="lg"
            p={2}
            bg="green.400"
            position="relative"
            w={12}
            h={12}
            overflow="hidden"
            lineHeight={0}
            boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
          >
            <Icon as={data.icon} w={6} h={6} color="white" />
          </Flex>
          <VStack spacing={0} align="start" maxW="lg" h="100%">
            <Text as="h3" fontSize="md" noOfLines={2} color="gray.400">
              {data.label}
            </Text>
            <HStack spacing={2}>
              <Text as="h2" fontSize="lg" fontWeight="extrabold">
                {data.score}
              </Text>
              <Flex>
                
                <Text as="h2" fontSize="md">
                  {data.percentage}
                </Text>
              </Flex>
            </HStack>
          </VStack>
        </HStack>
       
      </Stack>
    </motion.div>
  );
};

export default StatsWithIcons;