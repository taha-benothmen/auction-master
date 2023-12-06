import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
import NewListing from './NewListing';
import { useNavigate } from 'react-router-dom';
import {
  Icon,
  Box,
  Flex,
  Button,
  SimpleGrid,
  Image,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { Search2Icon, AddIcon, SmallCloseIcon } from '@chakra-ui/icons';

const Listings = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [search, setSearch] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [availableSchools, setAvailableSchools] = useState([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1234/getAllListings`)
      .then((res) => {
        setListings(res.data);
        console.log("🚀 ~ file: Listings.js:49 ~ .then ~ res.data:", res.data)
        setFilteredListings(res.data);
        getSchoolsList();
      })
      .catch((e) => {
        console.log('Error fetching listings data');
      });
  }, []);

  const handleFilter = (e) => {
    if (search !== '' || min || max) {
      setFilterApplied(true);
    }
    const filtered = listings.filter(
      (listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()) &&
        (!min || listing.price >= parseFloat(min)) &&
        (!max || listing.price <= parseFloat(max))
    );
    setFilteredListings(filtered);
  };

  const clearFilters = (e) => {
    setFilterApplied(false);
    setSearch('');
    setMin('');
    setMax('');
    setFilteredListings(listings);
  };

  const handleKeyDown = (e) => {
    if (
      e.keyCode === 69 || // 'e' key
      e.keyCode === 187 || // '+' key
      e.keyCode === 189 // '-' key
    ) {
      e.preventDefault(); // Prevent the input of these characters
    }
  };

  async function getSchoolsList() {
    try {
      axios.get('http://localhost:1234/getAllThemes/').then((res) => {
        setAvailableSchools(res.data);

      });

    } catch (e) {
      console.log(e);
    }
  }

  const handleDropDown = async (e) => {
    // setSelectedSchool(e.target.value);

    if (e.target.value == "") {
      setFilteredListings(listings)
    }
    else {
      let newList = listings.listings.filter((objet) => {
        return (objet.theme == e.target.value)
      })
      setFilteredListings({ listings: newList })
    }
  };

  return (
    <Flex flexDirection="column">
      <Box
        mt="20px"
        borderRadius="20px"
        position="sticky"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        w="50%"
        h="70px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <InputGroup w="60%" mr="10px">
          <InputLeftElement children={<Search2Icon color="gray.600" />} />
          <Input
            type="text"
            variant="filled"
            placeholder="Search listings"
            value={search}
            borderWidth="1px"
            onChange={(e) => setSearch(e.target.value)}
            _focus={{
              borderColor: 'blue.300',
              boxShadow: 'none',
            }}
          />
        </InputGroup>
        <InputGroup w="20%" mx="10px">
          <InputLeftElement
            pointerEvents="none"
            color="gray.600"
            fontSize="1.2em"
            children="$"
          />
          <Input
            type="number"
            variant="filled"
            placeholder="Min"
            value={min}
            borderWidth="1px"
            onChange={(e) => setMin(e.target.value)}
            onKeyDown={handleKeyDown}
            _focus={{
              borderColor: 'blue.300',
              boxShadow: 'none',
            }}
          />
        </InputGroup>
        <InputGroup w="20%" m="10px">
          <InputLeftElement
            pointerEvents="none"
            color="gray.600"
            fontSize="1.2em"
            children="$"
          />
          <Input
            type="number"
            variant="filled"
            placeholder="Max"
            value={max}
            borderWidth="1px"
            onChange={(e) => setMax(e.target.value)}
            onKeyDown={handleKeyDown}
            _focus={{
              borderColor: 'blue.300',
              boxShadow: 'none',
            }}
          />
        </InputGroup>
        <Flex alignItems="center">
          <Button colorScheme="blue" onClick={handleFilter}>
            Filter Results
          </Button>
          {filterApplied && (
            <Button
              variant={'ghost'}
              onClick={clearFilters}
              ml="5px"
              _hover={{ color: 'red' }}
            >
              <SmallCloseIcon mr="3px" />
              Clear Filters
            </Button>
          )}
        </Flex>
      </Box>
      <InputGroup>
        <Select
          placeholder="Select category"
          onChange={handleDropDown}
          variant="filled"
        >
          {availableSchools.schools && availableSchools.schools.map((school) => {
            return <option key={school.school_name} >{school.school_name}</option>;
          })}
        </Select>
      </InputGroup>
      <SimpleGrid p="20px" spacing="10" minChildWidth="300px">
        {filteredListings.listings && filteredListings.listings.map((listing) => {
          return (
            <Listing
              key={listing.lid}
              lid={listing.lid}
              name={listing.name}
              type={listing.type}
              price={listing.price}
              image={listing.image}
              theme={listing.theme}
            />
          );
        })}
      </SimpleGrid>

      <Box position="fixed" right="40px" bottom="30px">
        <Button
          position="fixed"
          right="40px"
          bottom="30px"
          colorScheme="blue"
          p="30px"
          borderRadius="30px"
          onClick={handleOpenModal}
        >
          <Flex align="center">
            <Icon as={AddIcon} boxSize={4} mr="2" />
            Add Listing
          </Flex>
        </Button>
      </Box>

      <NewListing
        props={{
          username,
          token,
        }}
        isOpen={isModalOpen}
        onOpen={handleOpenModal}
        onClose={handleCloseModal}
      />
    </Flex>
  );
};

const Listing = ({ lid, name, price, image, type, theme }) => {
  const navigate = useNavigate();
  const base64String = btoa(String.fromCharCode(...new Uint8Array(image)));
  image = `data:image/jpeg;base64,${base64String}`;


  const handleClick = (e) => {
    navigate(e.currentTarget.id);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      id={lid}
      onClick={handleClick}
      cursor="pointer"
      transition="box-shadow 0.3s ease"
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <Image
        src={image}
        h="300px"
        w="full"
        objectFit="cover"
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">

          <Badge borderRadius="full" px="2" colorScheme="red">
            {theme}
          </Badge>

        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {name}
        </Box>

        <Box>
          ${price}
        </Box>
      </Box>
    </Box>
  );
};

export default Listings;