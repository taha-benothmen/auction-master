import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from './ProfileEdit';
import profile_Image from '../assets/temp-avatar.jpg';
import axios from 'axios';
import bgg from '../assets/bgg.png' 

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  ModalOverlay,
  Modal,
  Text,
  useDisclosure,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';

const Profile = () => {
  const editModal = useDisclosure();
  const logoutModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [description, setDescription] = useState('');
  const [theme, setSchool] = useState('');

  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:1234/users/?username=${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setDescription(res.data.description);
            setSchool(res.data.theme_name);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const deleteAccount = async () => {
    try {
      await axios
        .delete(`http://localhost:1234/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('deleted');
          cookies.remove('TOKEN', { path: '/' });
          cookies.remove('USERNAME', { path: '/' });
          history('/home', {});
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    cookies.remove('USERNAME', { path: '/' });
    history('/home', {});
  };

  return (
    <
  
    >
    
      <Grid
        marginInline={{ md: '5vw', xl: '10vw' }}
        templateColumns="1fr 3fr"
        gap={6}
       
      >
        <GridItem w="100%" h="100%">
          <Image
            src={profile_Image}
            objectFit="cover"
            alt="profile"
            borderRadius="full"
          />
          <Text marginBlock="0.5rem" textAlign="center">
            
          </Text>
        </GridItem>
        <GridItem w="100%" h="100%" borderRadius="1rem">
          <Box>
            <Text paddingBlock="1rem" fontSize="3xl" fontWeight="bold">
              {username}
            </Text>
            <Box bg="blue.100" borderRadius="1rem" p="1rem">
              <Text fontSize="lg" fontWeight="bold">
                Description
              </Text>
              <Text>{description}</Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Flex width="100%" justifyContent="center" p="2rem" gap="1rem">
        <Button
          size="sm"
          variant="solid"
          colorScheme="green"
          onClick={editModal.onOpen}
        >
          Editer profile
        </Button>
        <Button
          size="sm"
          variant="solid"
          colorScheme="red"
          onClick={logoutModal.onOpen}
        >
          Se déconnecter
        </Button>
        <Button
          size="sm"
          variant="solid"
          colorScheme="red"
          onClick={deleteModal.onOpen}
        >
          Supprimer le compte
        </Button>
      </Flex>
      <Modal
        borderRadius="2rem"
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProfile
              props={{
                token,
                username,
                description,
                setDescription,
                onClose: editModal.onClose,
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        borderRadius="2rem"
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
          Êtes-vous sûr de vouloir vous déconnecter?
          </ModalHeader>
          <ModalCloseButton />
          <Flex gap="1rem" justifyContent="center">
            <Button colorScheme="green" marginBottom="1rem" onClick={logout}>
              Oui
            </Button>
            <Button
              colorScheme="red"
              marginBottom="1rem"
              onClick={logoutModal.onClose}
            >
              Non
            </Button>
          </Flex>
        </ModalContent>
      </Modal>

      <Modal
        borderRadius="2rem"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
          Êtes-vous sûr de vouloir supprimer votre compte ?
          </ModalHeader>
          <ModalCloseButton />
          <Flex gap="1rem" justifyContent="center">
            <Button
              colorScheme="green"
              marginBottom="1rem"
              onClick={deleteAccount}
            >
              Oui
            </Button>
            <Button
              colorScheme="red"
              marginBottom="1rem"
              onClick={deleteModal.onClose}
            >
              Non
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
      {/* </div> */}
    </>
  );
};

export default Profile;
