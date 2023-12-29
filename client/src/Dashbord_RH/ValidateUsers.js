import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Button,
  Stack,
  SimpleGrid
} from '@chakra-ui/react';
import {
  Icon,
  Image,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Center,
  Link,
  useColorModeValue,
  HStack,
  useDisclosure,
  FormLabel,
  Portal,
  useToast
} from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
} from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,

} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react'

import { Search2Icon, AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import bgg from '../assets/bgg.png'
const ValidateCollab = () => {
  const toast = useToast();

  const [isModalOpen, setModalOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [themes, setThemes] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [adminUsers, setAdminUsers] = useState([]);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameRH, setUsernameRH] = useState('');
  const [emailRH, setEmailRH] = useState('');
  const [passwordRH, setPasswordRH] = useState('');


  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    await axios.get('http://localhost:1234/getAllCollab').then((response) => {
      setAdminUsers(response.data.users);
      console.log(response.data);
    }).catch((error) => { console.log(error) })

  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const verifyUser = (username) => {
    const dataObject = {
      username: username,
      newVerifiedStatus: 1
    };

    axios
      .post(`http://localhost:1234/updateVerifiedStatus`, dataObject)
      .then((res) => {
        toast({
          title: 'User verified successfully!.',
          description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        fetchAdminUsers();
      })
      .catch((e) => console.log(e));
  };

  const unverifyUser = (username) => {
    const dataObject = {
      username: username,
      newVerifiedStatus: 0
    };

    axios
      .post(`http://localhost:1234/updateVerifiedStatus`, dataObject)
      .then((res) => {
        toast({
          title: 'User unverified successfully!',
          description: "",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        fetchAdminUsers();
      })
      .catch((e) => console.log(e));
  };



  return (
    <Flex flexDirection="column" bgImage={'bgg'}>
      <Center
        bgImage={bgg} // Set the background image using bgImage prop
        backgroundSize="cover"
        backgroundPosition="center"
        minHeight="100vh" // Ensure the background covers the entire viewport
        display="flex"
        justifyContent="center"
      >
        <SimpleGrid columns={4} spacing={10}>
          {adminUsers && adminUsers.map((user) => (
            <Box
              margin={5}
              maxW={'320px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}>
              <Avatar
                size={'xl'}
                Avatar
                mb={4}
                pos={'relative'}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: 'green.300',
                  border: '2px solid white',
                  rounded: 'full',
                  pos: 'absolute',
                  bottom: 0,
                  right: 3,
                }}
              />
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {user.name}
              </Heading>
              <Text fontWeight={600} color={'gray.500'} mb={4}>
                {'email:' + user.username}
              </Text>

              <Stack mt={8} direction={'row'} spacing={4}>

                {user.verified && <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'#fdcac6'}
                  color={'white'}
                  boxShadow={
                    '#d2f1eb'
                  }
                  _hover={{
                    bg: '#fdcac6',
                  }}
                  _focus={{
                    bg: '#d2f1eb',
                  }}
                  onClick={() => unverifyUser(user.username)}>
                  Supprimer
                </Button>}
                {/* user not verified case  */}

                {(user.verified == 0) && <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg='green'
                  color={'white'}
                  boxShadow={
                    '#d2f1eb'
                  }
                  _hover={{
                    bg: '#d2f1eb',
                  }}
                  _focus={{
                    bg: '#d2f1eb',
                  }}
                  onClick={() => verifyUser(user.username)}>
                  Valider inscription
                </Button>}

              </Stack>
            </Box>

          ))
          }
        </SimpleGrid>

      </Center>

    </Flex>
  );
};

export default ValidateCollab;
