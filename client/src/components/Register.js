import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import bg from '../assets/bg.jpg';
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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const Register = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (token) {
      history('/home');
    }
  }, [history, token]);

  async function submit(e) {
    e.preventDefault();

    if (!name || !username || !password || !confirmPassword) {
      setValid(true);
      return;
    }

    if (password !== confirmPassword) {
      alert('Password does not match!');
      return;
    }

    try {
      await axios
        .post('http://localhost:1234/register', {
          username: username.toLowerCase(),
          password,
          name,
        })
        .then((res) => {
          cookies.set('TOKEN', res.data.token, {
            path: '/',
          });
          cookies.set('USERNAME', res.data.username, {
            path: '/',
          });
          history('/home', {});
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
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
        border={{ base: 'none', md: '1px' }}
        borderColor={{ base: '', md: 'gray.300' }}
        borderRadius="10"
        bgColor={'white'}
      >
        <VStack display="flex" justifyItems="center">
          {valid ? (
            <Alert status='error' position="fixed" top="0" width={{ base: "full", md: "30%" }} zIndex="5" borderRadius={{ base: "0", md: "10px" }}>
              <AlertIcon />
              One or more required field is empty!
            </Alert>
          ) : null}
        </VStack>

        <VStack spacing="4" align="flex-start" w="full">
          <VStack spacing="1" align="center" w="full">
            <Heading color={'#F2B0AE'}>S'inscrire</Heading>
          </VStack>

          <FormControl isRequired>
            <FormLabel>Nom</FormLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="filled"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              variant="filled"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirmer mot de passe</FormLabel>
            <Input
              type="password"
              name="password-confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="filled"
            />
          </FormControl>

          <Button onClick={submit} color="#F2B0AE" w="full">
            S'inscrire
          </Button>

          <HStack w="full" justify="center">
            <Text>Vous avez déjà un compte?</Text>
            <Link to="/">
              <Button variant="link" color="#F2B0AE">
                Se connecter
              </Button>
            </Link>
          </HStack>

        </VStack>
      </Box>
    </Box>
  );
};

export default Register;
