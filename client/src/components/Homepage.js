import React from 'react';
import { ReactNode } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
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
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                Freelance
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                Design Projects
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              The project board is an exclusive resource for contract work. It&apos;s
              perfect for freelancers, agencies, and moonlighters.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
             <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Create Project
              </Button>
              <Button rounded={'full'}>How It Works</Button>
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
        How it works?
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
                  bg="blue.400"
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
          src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80`}
          rounded="lg"
        />
      </Stack>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
          Our company is expanding, you could be too.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'Users'} stat={'5,000'} icon={<BsPerson size={'3em'} />} />
          <StatsCard title={'Servers'} stat={'1,000'} icon={<FiServer size={'3em'} />} />
          <StatsCard title={'Datacenters'} stat={'7'} icon={<GoLocation size={'3em'} />} />
        </SimpleGrid>
      </Box>
      <Box bg={useColorModeValue('gray.100', 'gray.700')}>
        <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={'center'}>
            <Heading>Our Clients Speak</Heading>
            <Text>We have been working with clients around the world</Text>
          </Stack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 10, md: 4, lg: 10 }}>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Efficient Collaborating</TestimonialHeading>
                <TestimonialText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed
                  imperdiet nibh lectus feugiat nunc sem.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                }
                name={'Jane Cooper'}
                title={'CEO at ABC Corporation'}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Intuitive Design</TestimonialHeading>
                <TestimonialText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed
                  imperdiet nibh lectus feugiat nunc sem.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                }
                name={'Jane Cooper'}
                title={'CEO at ABC Corporation'}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Mindblowing Service</TestimonialHeading>
                <TestimonialText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed
                  imperdiet nibh lectus feugiat nunc sem.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                }
                name={'Jane Cooper'}
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
                Company Name
              </Heading>
              <List lineHeight="2" justifyContent="center">
                <LinkItem text="Careers" />
                <LinkItem text="News" />
                <LinkItem text="Policies" />
                <LinkItem text="Help" />
                <LinkItem text="Diversity & Belonging" />
              </List>
            </Box>
            <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
              <Heading as="h5" color="gray.700" mb="0.5rem" fontSize="0.875rem" fontWeight="600">
                Discover
              </Heading>
              <List lineHeight="2">
                <LinkItem text="Trust &amp; Safety" />
                <LinkItem text="Travel Credit" />
                <LinkItem text="Gift Cards" />
                <LinkItem text="Airbnb Citizen" />
                <LinkItem text="Business Travel" />
                <LinkItem text="Things To Do" isTag={true} tagText="New" />
                <LinkItem text="Airbnbmag" />
              </List>
            </Box>
            <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
              <Heading as="h5" color="gray.700" mb="0.5rem" fontSize="0.875rem" fontWeight="600">
                Hosting
              </Heading>
              <List lineHeight="2">
                <LinkItem text="Why Host" />
                <LinkItem text="Hospitality" />
                <LinkItem text="Responsible Hosting" />
                <LinkItem text="Community Center" />
                <LinkItem text="Host an Experience" isTag={true} tagText="New" />
                <LinkItem text="Open Homes" />
                <LinkItem text="Donations" isTag={true} tagText="New" />
              </List>
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
                <LinkItem text="Terms" />
                <LinkItem text="Privacy" />
                <LinkItem text="Site Map" />
              </List>
            </Box>
          </Flex>
        </Box>
        <Flex maxW="64rem" mx="auto" alignItems="center" px={10}>
          <svg
            fill="blue.400"
            style={{ width: '1.25rem', height: '1.25rem' }}
            viewBox="0 0 1000 1000"
            role="presentation"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1.1 232.1-123 181.1-263.1z"></path>
          </svg>
          <Text color="gray.600" fontSize="0.875rem" pl="0.5rem">
            &copy; 2019 company, Inc. All rights reserved.
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
  { id: 1, label: 'Login once per day', subLabel: 'The process should be quick.' },
  {
    id: 2,
    label: 'Do your reviews',
    subLabel: 'Reviews come from previous flashcards that you chose.'
  },
  {
    id: 3,
    label: 'Streak increase',
    subLabel: 'Your streak increases once per day as long as you finish your reviews.'
  },
  {
    id: 4,
    label: 'Choose your lesson',
    subLabel: 'This will add 5 new flashcards to your reviews.'
  }
];

export default MissionAndOverviewSection;
