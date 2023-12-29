import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Flex, Box, Heading, Text, Avatar, Button, Stack, SimpleGrid, Center } from '@chakra-ui/react';

import {
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Input,
  InputGroup,
  InputLeftElement,

  useColorModeValue,

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
const Listings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [themes, setThemes] = useState([]);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [adminUsers, setAdminUsers] = useState([]);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameRH, setUsernameRH] = useState('');
  const [emailRH, setEmailRH] = useState('');
  const [passwordRH, setPasswordRH] = useState('');

  // confirmation for deletion uses
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const cancelRef = React.useRef();
  const [userToBeDeleted, setUserToBeDeleted] = useState('');


  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {

    await axios.get('http://localhost:1234/getAllRH').then((response) => {
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


  const handleAddRhUser = async (e) => {
    e.preventDefault();
    const dataObject = {
      name: username,
      username: email,
      password: password
    }
    try {
      await axios.post('http://localhost:1234/addNewRhUser', dataObject).then(() => {
        fetchAdminUsers()

      })

    } catch (error) {
      console.log('Error adding theme:', error);
    }
  };

  const handleDeleteUser = async (usernameToDelete) => {
    try {
      const res = await axios.delete('http://localhost:1234/deleteRhUser', {
        data: { username: usernameToDelete }
      });

      if (res.status === 200) {
        toast({
          title: 'Utilisateur supprimé avec succès !',
          description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        onCloseDelete()
        fetchAdminUsers(); // Assuming this function fetches the updated user list

      } else {
        // Handle non-200 status codes if necessary
        onCloseDelete()
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error scenarios
      onCloseDelete()
    }
  };

  const UpdateRH = (user) => {

    const dataObject = {
      newUsername: emailRH,
      newPassword: passwordRH,
      newName: usernameRH,
      oldUsername: user.username,
    };
    console.log("🚀 ~ file: MangmentRH.js:135 ~ UpdateRH ~ dataObject:", dataObject)

    axios
      .post(`http://localhost:1234/updateRhUser`, dataObject)
      .then((res) => {

        toast({
          title: 'Mise à jour effectuée avec succès !',
          description: "",
          status: 'succes',
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
                {'@' + user.username}
              </Text>




              <Stack mt={8} direction={'row'} spacing={4}>

                <Popover>
                  <PopoverTrigger>
                    <Button
                      flex={1}
                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'#d2f1eb'}
                      color={'white'}
                      boxShadow={'#d2f1eb'}
                      _hover={{
                        bg: '#fdcac6',
                      }}
                      _focus={{
                        bg: '#d2f1eb',
                      }}>Modifier</Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Modifier les données du compte </PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <FormLabel>Nom</FormLabel>
                        <FormControl isRequired>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                            />
                            <Input
                              type="text"
                              min="0"
                              variant="filled"

                              onChange={(e) => setUsernameRH(e.target.value)}
                            />
                          </InputGroup>
                          <FormLabel>Email</FormLabel>

                        </FormControl>
                        <FormControl isRequired>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                            />
                            <Input
                              type="text"
                              min="0"
                              variant="filled"

                              onChange={(e) => setEmailRH(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormLabel>Mot de passe</FormLabel>

                        <FormControl isRequired>
                          <InputGroup>
                            <InputLeftElement

                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                            />
                            <Input
                              min="0"
                              variant="filled"
                              type="password"
                              name="password"
                              onChange={(e) => setPasswordRH(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                        <center>
                          <Button
                            margin={3}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'#d2f1eb'}
                            color={'white'}
                            boxShadow={'#d2f1eb'}
                            _hover={{
                              bg: '#fdcac6',
                            }}
                            _focus={{
                              bg: '#d2f1eb',
                            }}
                            onClick={() => { UpdateRH(user) }}
                          >Modifier</Button></center>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>

                <Button rounded='full' fontSize={'sm'}
                  colorScheme='red'
                  onClick={() => {
                    setUserToBeDeleted(user.username);
                    onOpenDelete();
                  }}
                >Supprimer
                </Button>

                <AlertDialog
                  motionPreset='slideInBottom'
                  leastDestructiveRef={cancelRef}
                  onClose={onCloseDelete}
                  isOpen={isOpenDelete}
                  isCentered
                >
                  <AlertDialogOverlay />

                  <AlertDialogContent>
                    <AlertDialogHeader>Delete user {userToBeDeleted}?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      Are you sure you wan tto delete user {userToBeDeleted} permanently ?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseDelete}>
                        No
                      </Button>
                      <Button colorScheme='red' ml={3}
                        onClick={() => handleDeleteUser(userToBeDeleted)}>
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Stack>
            </Box>

          ))
          }
        </SimpleGrid>

      </Center>

      <Box>
        <Button
          position="fixed"
          right="40px"
          left="40px"
          marginLeft="1100px"
          bottom="30px"
          color="#F2B0AE"
          colorScheme='gray'
          p="30px"
          borderRadius="30px"
          ref={btnRef} onClick={onOpen}
        >
          <Flex align="center">
            <Icon as={AddIcon} boxSize={4} mr="2" />
            Ajouter un responsable RH
          </Flex>
        </Button>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> Ajouter un responsable RH</DrawerHeader>

          <DrawerBody>
            <FormLabel htmlFor="newSchool"></FormLabel>

            <SimpleGrid columns={1} spacing={5}>
              <FormControl isRequired flexBasis="30%">
                <FormLabel>Nom</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired flexBasis="30%">
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired flexBasis="30%">
                <FormLabel>Mot de passe</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                />
              </FormControl>
            </SimpleGrid>
          </DrawerBody>


          <DrawerFooter>

            <Button
              onClick={handleAddRhUser}
              position="fixed"
              right="40px"
              left="40px"
              p="30px"
              bottom="30px"
              bg={'#cfeee8'}
              color={'white'}
              _hover={{
                bg: '#F4B4B2',
              }}
            >Ajouter</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>

  );
};

export default Listings;
