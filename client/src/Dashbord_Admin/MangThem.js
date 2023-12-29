import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, useToast } from '@chakra-ui/react';

import {
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Button,
  Stack,
  SimpleGrid,
  theme
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
  Portal
} from '@chakra-ui/react';
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
import { PinInput, PinInputField } from '@chakra-ui/react'

import { Search2Icon, AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import bgg from '../assets/bgg.png'



const Listings = () => {
  const toast = useToast();


  const [isModalOpen, setModalOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [themes, setThemes] = useState([]);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [theme, setTheme] = useState('');


  const cookies = new Cookies();
  const token = cookies.get('TOKEN');


  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    getThemesList();
  }, []);

  async function getThemesList() {
    try {
      const response = await axios.get('http://localhost:1234/themes');
      console.log("🚀 ~ file: MangThem.js:89 ~ getThemesList ~ response:", response)
      setThemes(response.data);
    } catch (error) {
      console.log('Error fetching themes:', error);
    }
  }
  const handleAddSchool = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch("http://localhost:1234/addThemeEndpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ themeName: newSchoolName }),
      });

      await response.json().then((res) => {
        console.log("🚀 ~ file: MangThem.js:84 ~ result ~ result:", res);

        getThemesList();
        setNewSchoolName('');
      });


    } catch (error) {
      console.log('Error adding theme:', error);
    }
  };
  const handleDeletetheme = async (themeName) => {
    try {
      const response = await axios.get(`http://localhost:1234/checkThemeUsage?themeName=${themeName}`);

      if (response.data.usedInListings) {
        // Theme exists in listings, cannot delete
        
        toast({
          title: 'Theme is used in listings, cannot delete.',
          description: "We've deleted the theme successfully.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return;
      }

      await axios.delete('http://localhost:1234/deletetheme', {
        data: { themeName }
      });
      getThemesList(); // Update theme list after deletion
      toast({
        title: 'Theme deleted successfully.',
        description: "We've deleted the theme successfully.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error deleting theme:', error);
      // Handle error scenarios
      toast({
        title: 'Failed to delete theme.',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };
  const [newThemeName, setNewThemeName] = useState('');

  const submitTheme = (themeName) => {
    const dataObject = {
      oldTheme: themeName,
      newTheme: newThemeName,
    };

    axios.post(`http://localhost:1234/updateTheme`, dataObject)
      .then((res) => {
        toast({
          title: 'Theme updated successfully!',
          description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        getThemesList();
      })
      .catch((error) => {
        console.error('Error updating theme:', error);
        
        toast({
          title: 'Failed to update theme.',
          description: "",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      });
  };


  return (
    <Flex flexDirection="column"
      bgImage={bgg}
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh" // Ensure the background covers the entire viewport
      display="flex">
      <Center
        minHeight="20vh" // Ensure the background covers the entire viewport
      >
        <Heading>Gérez votre thème</Heading>
      </Center>      <Center
        backgroundPosition="center"
        minHeight="30vh" // Ensure the background covers the entire viewport
        display="flex"

      >

        <SimpleGrid columns={3} spacing={5} >
          {themes.map((theme) => (
            <Box
              key={theme.id}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
              bgColor={'white'}
            >

              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {theme.theme_name}
              </Heading>

              <Stack mt={8} direction={'row'} spacing={2}>

                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'#fdcac6'}
                  color={'white'}
                  boxShadow={'#d2f1eb'}
                  _hover={{
                    bg: '#fdcac6',
                  }}
                  _focus={{
                    bg: '#d2f1eb',
                  }}
                  onClick={() => handleDeletetheme(theme.theme_name)}
                >
                  Supprimer
                </Button>

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
                      }}>Editer</Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Modifier votre thème</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
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
                              placeholder={theme.theme_name}
                              value={newThemeName}
                              onChange={(e) => setNewThemeName(e.target.value)}
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
                            onClick={() => { submitTheme(theme.theme_name) }}>Modifier</Button></center>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Center>

      <Box   >
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
            Ajouter un thème
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
          <DrawerHeader> Ajouter un thème</DrawerHeader>

          <DrawerBody>

            <FormControl isRequired>
              <FormLabel htmlFor="newSchool">Ajouter un thème</FormLabel>
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
                  id="newSchool"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                />
              </InputGroup>
            </FormControl>

          </DrawerBody>

          <DrawerFooter>

            <Button
              onClick={handleAddSchool}
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
