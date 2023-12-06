
import { Center, Heading } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Box
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import bg from '../assets/bg.jpg' 
import { useNavigate, Link } from 'react-router-dom';


export default function VerifyEmailForm() {

    const history = useNavigate(); // Initialize the useHistory hook

    const handleVerification = () => {
      // Perform any verification logic here before routing to another page
      // For example, you can check the entered pin code and proceed accordingly
  
      // Redirect to another page upon successful verification
      history('/home'); // Replace '/other-page' with the path of the page you want to navigate to
    };
    
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
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
>      
<Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '3xl', md: '5xl' }}>
          Vérifiez votre e-mail
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
         Nous avons envoyé le code à votre email
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.400')}>
          username@mail.com
        </Center>
        <FormControl>
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
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'#cfeee8'}
            color={'white'}
            _hover={{
              bg: '#F4B4B2',
            }}
            onClick={handleVerification}>
            Vérifier
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </Box>
  )
}