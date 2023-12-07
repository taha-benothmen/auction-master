import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Flex, Heading, Button, Spacer, HStack } from '@chakra-ui/react';
import { ChatIcon, BellIcon } from '@chakra-ui/icons';
import sopra from '../assets/sopra.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from './ProfileEdit';
import profile_Image from '../assets/temp-avatar.jpg';
import { Radio, RadioGroup } from '@chakra-ui/react'
import axios from 'axios';
import { Switch } from '@chakra-ui/react'
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
  Portal
} from '@chakra-ui/react'
import Animation_Hammer from '../assets/Animation_Hammer.gif'
import {
  Menu,
  Avatar,
  AvatarBadge,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Select,
  Stack,
  Box,
  Grid,
  GridItem,
  ModalOverlay,
  Modal,
  Text,
  useDisclosure,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react'
import {

  Image,
} from '@chakra-ui/react';

const icon = require('../assets/icon.png');

const Profile = () => {
  const editModal = useDisclosure();
  const logoutModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [description, setDescription] = useState('');
  const [school, setSchool] = useState('');

  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  let IsAdmin = cookies.get('ISADMIN');
  let IsRh = cookies.get('ISRH');

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:1234/users/?username=${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setDescription(res.data.description);
            setSchool(res.data.school_name);
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
          cookies.remove('ISADMIN', { path: '/' });
          cookies.remove('ISRH', { path: '/' });
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
    cookies.remove('ISADMIN', { path: '/' });
    cookies.remove('ISRH', { path: '/' });
    history('/', {});
  };

  return (
    <>

      <Flex
        bgColor={"white"}
        justifyContent="space-between"
        borderBottom="1px solid #E2E8F0"
      >
        <Link>
          <Image
            h="80px"
            marginLeft={20} marginRight={20}
            src={sopra}
            objectFit="cover"
            alt="profile"
          />
        </Link>

        {token && (
          <div>
            <HStack spacing="20px" pt="20px">
              <Link to="/home">
                <Button bg="white">ACCUEIL</Button>
              </Link>
              <Link to="/listings">
                <Button bg="white">ENCHÈRE</Button>
              </Link>

             

              <Link to="/contact">
                <Button bg="white">CONTACTS</Button>
              </Link>


            </HStack>
          </div>
        )}

        <Spacer />

        {token && (
          <div>
            <HStack spacing="20px" mr="20px" pt="20px">
              <Link to="/notifications">
                <Button color="#F2B0AE">
                  <BellIcon />
                </Button>
              </Link>

              <Link to="/messageboard">
                <Button color="#F2B0AE">
                  <ChatIcon />
                </Button>
              </Link>

              <Menu>
                <MenuButton as={Button} color="#F2B0AE" spacing={4}>

                  <Text paddingBlock="1rem" fontWeight="bold" > <Avatar spacing={2} size='xs' marginRight={2}>
                    <AvatarBadge boxSize="1em" bg="green.500" /></Avatar>  {username}</Text>
                </MenuButton>
                <MenuList>
                  <MenuGroup >
                    <MenuItem onClick={editModal.onOpen}>Modifier mot de passe</MenuItem>

                    <Popover>
                      <PopoverTrigger style={{ position: 'absolute', left: '-120%', top: '0' }}>
                        <Button onClick={() => { setRerender(!rerender); }}
                          colorScheme='white' color='black' fontWeight='normal'>Changer role</Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>

                          <PopoverCloseButton />
                          <PopoverBody>
                            <Link to="/mangmentrh">
                              {(IsAdmin == 1) && <Button bg="white">Admin</Button>}
                            </Link>
                            <Link to="/validateusers">
                              {(IsRh == 1) && <Button bg="white">RH</Button>}
                            </Link>
                            <Link to="/home">
                              <Button bg="white">Collaborateur</Button>
                            </Link>
                          </PopoverBody>

                        </PopoverContent>
                      </Portal>
                    </Popover>

                    <MenuItem onClick={logoutModal.onOpen}>Se deconnecter</MenuItem>
                  </MenuGroup>

                </MenuList>
              </Menu>
            </HStack>
          </div>
        )}

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
            <Button color="green" marginBottom="1rem" onClick={() => { logout();  logoutModal.onClose()}}>
              Oui
            </Button>
            <Button
              color="pink"
              marginBottom="1rem"
              onClick={logoutModal.onClose}
            >
              Non
            </Button>
          </Flex>
        </ModalContent>
      </Modal>

      <Modal
        borderRadius="3rem"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Êtes-vous sûr de vouloir supprimer votre compte?
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
