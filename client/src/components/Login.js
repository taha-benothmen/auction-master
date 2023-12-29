import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import bg from '../assets/bg.jpg';
import { PinInput, PinInputField } from '@chakra-ui/react'

import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  VStack,
  Heading,
  Text,
  HStack,
  Checkbox,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const Login = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    if (token) {
      history('/home');
    }
  }, [history, token]);


  async function handleLogin() {
    try {
      const response = await axios.post('http://localhost:1234/login', {
        username: username.toLowerCase(),
        password,
      });
      const { data } = response;

      cookies.set('TOKEN', data.token, {
        path: '/',
      });
      cookies.set('USERNAME', data.username, {
        path: '/',
      });

      fetch("http://localhost:1234/getAllUserData/" + username.toLowerCase())
        .then((response) => response.json())
        .then((res) => {

          cookies.set('ISRH', res.user.IsRh, {
            path: '/',
          });
          cookies.set('ISADMIN', res.user.IsAdmin, {
            path: '/',
          });
        })

      // axios.post(
      //   'http://localhost:1234/notifications',
      //   {
      //     title: 'Welcome to the app!',
      //     username: data.username,
      //     content: `Welcome back ${data.username}`,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${data.token}`,
      //     },
      //   }
      // );


      history('/home', { email: data.username });
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  }

  async function submit(e) {
    e.preventDefault();

    let currentStatus;

    fetch("http://localhost:1234/getVerifiedStatus/" + username.toLowerCase())
      .then((response) => response.json())
      .then((res) => {

        currentStatus = res.verified

        if (currentStatus == 0) {
          alert("Vous n'etes pas vérifié !")
        } else {
          handleLogin()
        }

      }).catch((e) => { console.log(e); })


  }

  return (
    <Box
      bgImage={bg}
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={{ base: 'full', md: 'md' }}
        p={{ base: 8, md: 10 }}
        mb="80px"
        mt={{ base: 20, md: '10vh' }}
        mx="auto"
        border={{ base: 'none', md: '3px' }}
        borderColor={{ base: '4px', md: '#BCE3E0' }}
        borderRadius="10"
        bgColor={'white'}
      >
        <VStack spacing="4" align="flex-start" w="full">
          <VStack spacing="1" align="center" w="full">
            <Heading color={'#F4B4B2'}>Se connecter</Heading>
            <Text>Entrez votre Email et Mot de passe </Text>
          </VStack>

          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="filled"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Mot de passe:</FormLabel>
            <Input
              type="password"
              name="username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
            />
          </FormControl>

          <HStack w="full" justify="space-between">
            <Checkbox>Souviens de moi</Checkbox>
            <Button variant="link" color="#F4B4B2">
              Mot de passe oublié ?
            </Button>
          </HStack>
          <Button ref={btnRef} color="#F4B4B2" w="full" onClick={onOpen}>
            Se connecter</Button>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Vérifiez votre e-mail</DrawerHeader>

              <DrawerBody>
                <Center
                  fontSize={{ base: 'sm', sm: 'md' }}
                  color={useColorModeValue('gray.800', 'gray.400')}>
                  Nous avons envoyé le code à votre email
                </Center>
                <Center
                  fontSize={{ base: 'sm', sm: 'md' }}
                  fontWeight="bold"
                  color={useColorModeValue('gray.800', 'gray.400')}
                  margin={5}>
                  {username}
                </Center>
                <Center>
                  <HStack>
                    <PinInput
                      color='#cfeee8'>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </Center>
              </DrawerBody>

              <DrawerFooter>
                <Button variant='outline' mr={3} >
                  envoyer à nouveau
                </Button>
                <Button bg={'#cfeee8'}
                  color={'white'}
                  _hover={{
                    bg: '#F4B4B2',
                  }} onClick={submit}>Verifier</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>


          <HStack w="full" justify="center">
            <Text>Vous n'avez pas de compte ?</Text>
            <Link to="/register">
              <Button variant="link" color="#F4B4B2">
                S'inscrire
              </Button>
            </Link>
          </HStack>

          {/* DrawerExample component */}

          {/* End of DrawerExample */}
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
