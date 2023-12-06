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
       <Link>
          <Image
           h="80px" 
           marginLeft={20} marginRight={20} 
            src={sopra}
            objectFit="cover"
            alt="profile"
          />
      </Link>

      
    </Flex>
  );
}
