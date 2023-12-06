// import '../css/Authorization.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
import bg from '../assets/bg.jpg' 
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
  Select,
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
  const [school, setSchool] = useState('');
  const [availableSchools, setAvailableSchools] = useState([]);
  const [valid, setValid] = useState(false);


  useEffect(() => {
    
  }, [history, token]);

  async function submit(e) {
    e.preventDefault();

    console.log(school);

    if (
      !name ||
      !username ||
      !school ||
      !password ||
      !confirmPassword
    ) {
      setValid(true);
      // alert('One or more field is empty!');
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
          school,
        })
        .then((res) => {
          console.log(res.data);
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

  async function getSchoolsList() {
    try {
      await axios
        .get('http://localhost:1234/schools')
        .then((res) => {
          const modifiedData = res.data.map((school) => ({
            ...school,
            id: uuidv4(),
          }));
          console.log(modifiedData);
          // Update the state with the modified data
          setAvailableSchools(modifiedData);
        });
      console.log(availableSchools);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSchoolsList();
  }, []);

  return (
    <Box
    bgImage={bg} // Set the background image using bgImage prop
    backgroundSize="cover"
    backgroundPosition="center"
    minHeight="100vh" // Ensure the background covers the entire viewport
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
          <Alert status='error' position="fixed" top="0" width={{ base:"full", md:"30%" }} zIndex="5" borderRadius={{ base: "0", md: "10px"}} bgColor={'#cfeee8'}>
            <AlertIcon />
            Un ou plusieurs champs obligatoires sont vides !
          </Alert>
        ) : null}
      </VStack>

      <VStack spacing="4" align="flex-start" w="full">
        <VStack spacing="1" align="center" w="full">
          <Heading>Inscription nouveau RH</Heading>
          
        </VStack>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nom</FormLabel>
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
          <FormLabel>Confirmer Mot de passe</FormLabel>
          <Input
            type="password"
            name="password-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="filled"
          />
        </FormControl>

        <Button onClick={submit} bgColor="#fdcac6" w="full">
        Créer un compte
        </Button>

        

      </VStack>
    </Box>
    </Box>

  );
};

export default Register;
