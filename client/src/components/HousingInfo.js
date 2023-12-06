import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import NewResidence from './NewResidence';
import {
  Flex,
  List,
  ListItem,
  ListIcon,
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Stack,
  Text,
  Heading,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { StarIcon, AddIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';

const HousingInfo = () => {
  const [residences, setResidences] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [residenceRatings, setResidenceRatings] = useState([]);
  const [topResidences, setTopResidence] = useState([]);
  const [isVersatileResidences, setIsVersatileResidences] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event, res) => {
    event.stopPropagation();
    setSelectedResidence(res);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  async function getHousingInfo() {
    try {
      await axios
        .get('http://localhost:1234/housinginfo', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setResidences(res.data);
        })
        .catch((e) => console.log('error fetching residences'));
    } catch (e) {
      console.log(e);
    }
  }

  async function getTopHousing() {
    try {
      await axios
        .get('http://localhost:1234/tophousing', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTopResidence(res.data);
        })
        .catch((e) => console.log('error fetching residences'));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getHousingInfo();
    getResidenceRatings();
    getTopHousing();
  }, []);

  const getResidenceRatings = async () => {
    await axios
      .get('http://localhost:1234/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setResidenceRatings(res.data));
  };

  return (
    <Flex flexDirection="column" maxW="75%" mx="auto">
      
      <Stack spacing="10" p="20px">
        {residences.map((residence) => (
          <Residence
            key={residence.res_name}
            residence={residence}
            setSelectedResidence={setSelectedResidence}
            ratings={residenceRatings}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </Stack>
      <Box position="fixed" right="40px" bottom="30px">
        <Button
          colorScheme="blue"
          p="30px"
          borderRadius="30px"
          onClick={(e) => handleOpenModal(e, undefined)}
        >
          <Flex align="center">
            <Icon as={AddIcon} boxSize={4} mr="2" />
            Add Residence
          </Flex>
        </Button>
      </Box>
      {/* Modal component with isOpen, onOpen, and onClose props */}
      <NewResidence
        props={{
          username,
          token,
          selectedResidence,
        }}
        isOpen={isModalOpen}
        onOpen={handleOpenModal}
        onClose={handleCloseModal}
      />
    </Flex>
  );
};

const Residence = ({ residence, ratings, handleOpenModal }) => {
  const rating = ratings.find(
    (rating) => rating.res_name === residence.res_name
  );
  const overall =
    rating && rating.overall !== undefined
      ? Math.round(rating.overall * 10) / 20
      : 0;

  const prices_list = residence.prices_list
    .split(',')
    .reduce((acc, priceItem) => {
      const [unitType, price] = priceItem.split(':');
      acc[unitType.trim()] = parseInt(price, 10);
      return acc;
    }, {});

  const unitPrices = residence.types_list
    .split(',')
    .map((unit) => prices_list[unit.trim()]);
  const minPrice = Math.min(...unitPrices);
  const maxPrice = Math.max(...unitPrices);
  const navigate = useNavigate();

  const handleClick = (e) => {
    const name = residence.res_name;
    navigate(`${name}`);
  };

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      onClick={handleClick}
      cursor="pointer"
      transition="box-shadow 0.4s ease"
      _hover={{
        boxShadow: 'xl',
      }}
      maxH="300px"
    >
      <Image
        objectFit="cover"
        h="300px"
        w="400px"
        src={`http://localhost:1234/images/residences/${residence.image}`}
        alt="Residence"
      />

      <Stack w="full">
        <Text
          position="absolute"
          top="0"
          right="0"
          p="2"
          fontSize="sm"
          fontWeight="bold"
        >
          ${minPrice} - ${maxPrice}/month
        </Text>
        <CardBody>
          <Heading size="md">{residence.res_name}</Heading>
          {[...Array(Math.floor(overall))].map((_, index) => (
            <StarIcon key={index} color="yellow.400" />
          ))}
          {overall - Math.floor(overall) >= 0.5 && (
            <StarIcon color="yellow.400" />
          )}
          {[...Array(5 - Math.ceil(overall))].map((_, index) => (
            <StarIcon key={index} color="gray.300" />
          ))}
          <Text py="2">
            {residence.street_address}, {residence.city}, {residence.province}{' '}
            {residence.postal_code}
          </Text>
        </CardBody>
        <Divider my="2" width="100%" borderWidth="2px" />
        <CardFooter>
          {residence.types_list.split(',').map((unit, index) => (
            <div key={index}>
              <Image
                src={`http://localhost:1234/images/units/${unit}.png`}
                maxW="100%"
                objectFit="contain"
                alt={unit}
                margin="10px"
              />
            </div>
          ))}
          <Box position="absolute" bottom="2" right="2">
            <Icon
              as={EditIcon}
              w={6}
              h={6}
              color="gray.400"
              cursor="pointer"
              transition="color 0.2s ease"
              _hover={{ color: 'blue.500' }}
              onClick={(event) => handleOpenModal(event, residence)}
            />
          </Box>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default HousingInfo;
