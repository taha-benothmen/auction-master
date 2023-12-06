import React from 'react';
import { ReactNode } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { MdOutlineCategory } from "react-icons/md";
import { GoLocation } from 'react-icons/go'
import auction from '../assets/auction.jpg'
import {
  chakra,
  Container,
  Stack,
  useColorModeValue,
  Image,
  Box,
  Heading,
  List,
  ListItem,
  Link,
  Text,
  HStack,
  VStack,
  Button,
  Avatar,
  useBreakpointValue,
  Flex,
  Stat,
  StatNumber,
  StatLabel,
  SimpleGrid
} from '@chakra-ui/react';


const Testimonial = (props) => {
  const { children } = props

  return <Box>{children}</Box>
}

const TestimonialContent = (props) => {
  const { children } = props

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  )
}

const TestimonialHeading = (props) => {
  const { children } = props

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = (props) => {
  const { children } = props

  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
  src,
  name,
  title,
}) => {

  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}
function StatsCard(props) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

const MissionAndOverviewSection = () => {
  return (
    <Container maxW="6xl" px={{ base: 6, md: 3 }} py={14}>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: '#F2B0AE',
                  zIndex: -1,
                }}>
                EXPLOREZ
              </Text>
              <br />{' '}
              <Text color={'#F2B0AE'} as={'span'} fontSize={40} >
              ACHETEZ AUX ENCHÈRES
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Découvrez un monde d'exception ! Notre plateforme vous invite à explorer une collection unique d'objets rares et à participer à des enchères passionnantes. Parcourez notre sélection variée, faites des offres et trouvez des trésors uniques pour enrichir votre collection. Rejoignez-nous pour une expérience d'achat aux enchères inoubliable !
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
             <Button
                rounded={'full'}
                bg={'#F2B0AE'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                ACHETEZ
              </Button>
              <Button rounded={'full'}>ENCHÈRES</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
          />
        </Flex>
      </Stack>

      <chakra.h2 fontSize="4xl" fontWeight="bold" textAlign="center" mb={2} mt={10}>
      Comment ça fonctionne?
            </chakra.h2>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 0, md: 3 }}
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing={4} alignItems="flex-start" mb={{ base: 5, md: 0 }} maxW="md">
          {overviewList.map((data) => (
            <Box key={data.id}>
              <HStack spacing={2}>
                <Flex
                  fontWeight="bold"
                  boxShadow="md"
                  color="white"
                  bg="#F2B0AE"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                  w={10}
                  h={10}
                >
                  {data.id}
                </Flex>
                <Text fontSize="xl">{data.label}</Text>
              </HStack>
              <Text fontSize="md" color="gray.500" ml={12}>
                {data.subLabel}
              </Text>
            </Box>
          ))}
        </VStack>
        <Image
          boxSize={{ base: 'auto', md: 'lg' }}
          objectFit="contain"
          src={auction}
          rounded="lg"
        />
      </Stack>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Notre entreprise est en pleine expansion, vous pourriez l'être aussi.
                </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'Utilisateurs Actifs'} stat={'5,000'} icon={<BsPerson size={'3em'} />} />
          <StatsCard title={'Enchères Quotidiennes '} stat={'1,000'} icon={<FiServer size={'3em'} />} />
          <StatsCard title={"Catégories d'Articles"} stat={'+5'} icon={<MdOutlineCategory  size={'3em'} />} />
        </SimpleGrid>
      </Box>
      <Box >
        <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={'center'}>
            <Heading>Avis du Mois d'Octobre</Heading>
            <Text>Nous travaillons avec des clients du monde entier</Text>
          </Stack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 10, md: 4, lg: 10 }}>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Collaboration Efficace</TestimonialHeading>
                <TestimonialText>
                Nous avons eu le plaisir de collaborer efficacement avec des clients du monde entier. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                }
                name={'Chaima Ben Othmen'}
                title={'CEO at ABC Corporation'}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Design Intuitif</TestimonialHeading>
                <TestimonialText>
                Notre expérience a été améliorée par le design intuitif. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                }
                name={'Foulen ben foulen'}
                title={'CEO at ABC Corporation'}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Service Époustouflant</TestimonialHeading>
                <TestimonialText>
                Le service fourni nous a véritablement impressionnés. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                }
                name={'Abd el kader'}
                title={'CEO at ABC Corporation'}
              />
            </Testimonial>
          </Stack>
        </Container>
      </Box>

      {/* FOOTER  */}
      <Box
        as="footer"
        borderTop="1px solid"
        borderColor="gray.300"
        py="2.5rem"
        fontSize="0.875rem"
      >
        <Box
          maxW="64rem"
          marginX="auto"
          pb="2rem"
          mb="1.5rem"
          px={10}
          borderBottom="1px solid"
          borderColor="gray.300"
        >
          <Flex flexWrap="wrap" alignItems="start" justify="space-between">
            <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
              <Heading as="h5" color="gray.700" mb="0.5rem" fontSize="0.875rem" fontWeight="600">
              <Link href="#" mr="0.5rem">Sopra HR</Link>
              </Heading>
              
            </Box>
            <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
              <Heading as="h5" color="gray.700" mb="0.5rem" fontSize="0.875rem" fontWeight="600">
              <Link href="#" mr="0.5rem"> ENCHÈRES </Link>
              </Heading>
              
            </Box>
            <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
              <Heading as="h5" color="gray.700" mb="0.5rem" fontSize="0.875rem" fontWeight="600" href="/home">
              <Link href="#" mr="0.5rem">DASHBORD</Link>
              </Heading>
              
            </Box>
            <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
              <Flex justify="start" mb="0.5rem" alignItems="baseline">
                <Link href="#" mr="0.5rem">
                  <svg
                    style={{ width: '1rem', height: '1rem' }}
                    fill="blue.400"
                    viewBox="0 0 32 32"
                    role="img"
                    aria-label="Navigate to Facebook"
                    focusable="false"
                  >
                    <path
                      d="m8 14.41v-4.17c0-.42.35-.81.77-.81h2.52v-2.08c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81h-5.21c-.42 0-.8-.39-.8-.81v-16h-2.52a.78.78 0 0 1 -.78-.78"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" mr="0.5rem">
                  <svg
                    style={{ width: '1rem', height: '1rem' }}
                    fill="blue.400"
                    viewBox="0 0 32 32"
                    role="img"
                    aria-label="Navigate to Twitter"
                    focusable="false"
                  >
                    <path
                      d="m31 6.36c-1.16.49-2.32.82-3.55.95 1.29-.76 2.22-1.87 2.72-3.38a13.05 13.05 0 0 1 -3.91 1.51c-1.23-1.28-2.75-1.94-4.51-1.94-3.41 0-6.17 2.73-6.17 6.12 0 .49.07.95.17 1.38-4.94-.23-9.51-2.6-12.66-6.38-.56.95-.86 1.97-.86 3.09 0 2.07 1.03 3.91 2.75 5.06-1-.03-1.92-.3-2.82-.76v.07c0 2.89 2.12 5.42 4.94 5.98-.63.17-1.16.23-1.62.23-.3 0-.7-.03-1.13-.13a6.07 6.07 0 0 0 5.74 4.24c-2.22 1.74-4.78 2.63-7.66 2.63-.56 0-1.06-.03-1.43-.1 2.85 1.84 6 2.76 9.41 2.76 7.29 0 12.83-4.01 15.51-9.3 1.36-2.66 2.02-5.36 2.02-8.09v-.46c-.03-.17-.03-.3-.03-.33a12.66 12.66 0 0 0 3.09-3.16"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" mr="0.5rem">
                  <svg
                    style={{ width: '1rem', height: '1rem' }}
                    fill="blue.400"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Navigate to Instagram"
                    focusable="false"
                  >
                    <path
                      d="m23.09.91c-.61-.61-1.33-.91-2.17-.91h-17.84c-.85 0-1.57.3-2.17.91s-.91 1.33-.91 2.17v17.84c0 .85.3 1.57.91 2.17s1.33.91 2.17.91h17.84c.85 0 1.57-.3 2.17-.91s.91-1.33.91-2.17v-17.84c0-.85-.3-1.57-.91-2.17zm-14.48 7.74c.94-.91 2.08-1.37 3.4-1.37 1.33 0 2.47.46 3.41 1.37s1.41 2.01 1.41 3.3-.47 2.39-1.41 3.3-2.08 1.37-3.41 1.37c-1.32 0-2.46-.46-3.4-1.37s-1.41-2.01-1.41-3.3.47-2.39 1.41-3.3zm12.66 11.63c0 .27-.09.5-.28.68a.92.92 0 0 1 -.67.28h-16.7a.93.93 0 0 1 -.68-.28.92.92 0 0 1 -.27-.68v-10.13h2.2a6.74 6.74 0 0 0 -.31 2.05c0 2 .73 3.71 2.19 5.12s3.21 2.12 5.27 2.12a7.5 7.5 0 0 0 3.75-.97 7.29 7.29 0 0 0 2.72-2.63 6.93 6.93 0 0 0 1-3.63c0-.71-.11-1.39-.31-2.05h2.11v10.12zm0-13.95c0 .3-.11.56-.31.77a1.05 1.05 0 0 1 -.77.31h-2.72c-.3 0-.56-.11-.77-.31a1.05 1.05 0 0 1 -.31-.77v-2.58c0-.29.11-.54.31-.76s.47-.32.77-.32h2.72c.3 0 .56.11.77.32s.31.47.31.76z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </Flex>
              <List lineHeight="2">
                <LinkItem text="CONTACT" />
                
              </List>
            </Box>
          </Flex>
        </Box>
        <Flex maxW="64rem" mx="auto" alignItems="center" px={10}>
        
          <Text color="gray.600" fontSize="0.875rem" pl="0.5rem">
            &copy; 2023 SOPRA RH, Inc. All rights reserved.
          </Text>
        </Flex>
      </Box>

    </Container>
  );
};





const LinkItem = ({ text, isTag = false, tagText }) => {
  return (
    <ListItem display="flex">
      <Link
        fontWeight="600"
        href="#"
        color="rgba(113, 128, 150, 1)"
        _hover={{ color: 'blue.400' }}
      >
        {text}
      </Link>
      {isTag && (
        <Text
          as="span"
          bg="blue.400"
          px="0.25rem"
          display="inline-flex"
          alignItems="center"
          color="#fff"
          height="1.25rem"
          borderRadius="0.25rem"
          ml="0.25rem"
          mt="0.25rem"
          fontSize="0.75rem"
        >
          {tagText}
        </Text>
      )}
    </ListItem>
  );
};


const Content = ({ children, ...props }) => {
  return (
    <Text
      fontSize="md"
      textAlign="left"
      lineHeight="1.375"
      fontWeight="400"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};

function DottedBox() {
  return (
    <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
      <svg
        color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
      </svg>
    </Box>
  );
}

const overviewList = [
  { id: 1, label: 'Connexion quotidienne simplifiée', subLabel: 'Un seul login par jour pour une expérience rapide et pratique.' },
  {
    id: 2,
    label: 'Révision des enchères',
    subLabel: 'Revoyez les enchères sélectionnées précédemment pour une expérience personnalisée et enrichissante.'
  },
  {
    id: 3,
    label: 'Augmentation de la série de participation',
    subLabel: 'Chaque jour, votre série de participation augmente dès que vous terminez vos évaluations.'
  },
  {
    id: 4,
    label: 'Choisissez votre leçon',
    subLabel: 'Sélectionnez votre leçon pour intégrer cinq nouvelles enchères à évaluer, approfondissant ainsi votre expertise.'
  }
];

export default MissionAndOverviewSection;
