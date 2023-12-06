import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Flex, Heading, Button, Spacer, HStack } from '@chakra-ui/react';
import { ChatIcon, BellIcon } from '@chakra-ui/icons';
import sopra from '../assets/sopra.png' 
import Animation_Hammer from '../assets/Animation_Hammer.gif' 

import {
  
  Image,
} from '@chakra-ui/react';

const icon = require('../assets/icon.png');

export default function Navbar() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  return (
    <Flex
    bgColor={"white"}
      justifyContent="space-between"
      borderBottom="1px solid #E2E8F0"
    >
       <Link to="/">
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
              <Button bg="white">Listings</Button>
            </Link>

            <Link to="/housinginfo">
              <Button bg="white">Housing</Button>
            </Link>

            <Link to="/schools">
              <Button bg="white"> Schools</Button>
            </Link>

            <Link to="/searchresidences">
              <Button bg="white"> Projection</Button>
            </Link>

            <Link to="/admin">
              <Button bg="white"> Selection</Button>
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

            <Link to="/profile">
              <Button color="#F2B0AE">Profile</Button>
            </Link>
          </HStack>
        </div>
      )}
    </Flex>
  );
}
