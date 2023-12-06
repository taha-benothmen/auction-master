import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import {
  Box,
  Button,
  VStack,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';

export default function NewListing({ props, isOpen, onOpen, onClose }) {

  //form files
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState();
  const [theme, setTheme] = useState('');

  //deprecated
  const [type, setType] = useState('sublet');
  const [quantity, setQuantity] = useState();
  const [unitType, setUnitType] = useState();
  const [residence, setResidence] = useState();
  const [housingInfo, setHousingInfo] = useState([]);
  const [schools, setSchools] = useState([]);
  // const [file, setFile] = useState();
  const toast = useToast();

  useEffect(() => {
    const getHousingInfo = async () => {
      try {
        await axios
          .get('http://localhost:1234/housinginfo', {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => {
            const modifiedData = res.data.map((housing) => ({
              ...housing,
              id: uuidv4(),
            }));
            setHousingInfo(modifiedData);
            console.log(modifiedData);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getHousingInfo();
    getSchoolsList()
  }, []);

  async function getSchoolsList() {
    try {
      const response = await axios.get('http://localhost:1234/schools');
      setSchools(response.data); // Assuming response.data is an array of objects with a 'name' property for each school
    } catch (error) {
      console.log('Error fetching schools:', error);
    }
  }

  useEffect(() => {
    if (props.listing) {
      setName(props.listing.name);
      setPrice(props.listing.price);
      setDescription(props.listing.description);
      setType(props.listing.type);
      setQuantity(props.listing.quantity);
      setUnitType(props.listing.unit);
      setResidence(props.listing.res_name);
    }
  }, [props.listing]);


  const AddListingSubmit = (e) => {
    e.preventDefault();

    const cookies = new Cookies();
    const localUser = cookies.get('USERNAME');
    console.log("🚀 ~ file: NewListing.js:103 ~ AddListingSubmit ~ localUser:", localUser)

    const formData = {
      username: localUser,
      description,
      name,
      price,
      image,
      theme,
    };
    console.log("🚀 ~ file: NewListing.js:114 ~ AddListingSubmit ~ formData:", formData)

    // POST request using Axios with the form data
    axios
      .post('http://localhost:1234/addNewListing', formData)
      .then((response) => {
        if (response.status === 200) {
          // Success: Handle the successful response
          alert('Listing added successfully!');
        } else {
          // Handle other status codes if needed
          alert('Failed to add listing. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error sending form data:', error);
        // Handle error or show an error message
        alert('An error occurred while adding the listing.');
      });
  };


  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('quantity', quantity);
    formData.append('unitType', unitType);
    formData.append('residence', residence);
    formData.append('image', file);


    if (props.listing) {
      console.log(formData);
      axios.put(
        `http://localhost:1234/listings/${props.listing.lid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
    } else {
      axios.post('http://localhost:1234/listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${props.token}`,
        },
      });
    }

    onClose();
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

  let inputSection;
  if (type === 'item') {
    inputSection = (
      /* JSX for the input section when type is "Items" */
      <Box w="full">
        <FormControl isRequired>
          <FormLabel>Item Quantity:</FormLabel>
          <NumberInput
            min="1"
            variant="filled"
            value={quantity}
            onChange={(valueString) => setQuantity(valueString)}
            onKeyDown={handleKeyDown}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Box>
    );
  } else if (type === 'sublet') {
    inputSection = (
      /* JSX for the input section when type is "Sublets" */
      <Box w="full">
        <FormControl isRequired>
          <FormLabel>Residence:</FormLabel>
          <Select
            placeholder="Select Residence"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            variant="filled"
          >
            {schools.map((school) => {
              return <option key={school.school_name}>{school.school_name}</option>;
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <Modal
      blockScrollOnMount={false}
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="4">

            {/* <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl> */}

            <FormControl mt="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Price</FormLabel>
              <NumberInput value={price} onChange={(value) => setPrice(value)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="imageInput">Upload Image</FormLabel>
              <Input
                pt="1px"
                pl="1px"
                type="file"
                id="imageInput"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setImage(reader.result);
                    };
                  }
                }}
                style={{ border: 'none' }}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Theme</FormLabel>
              <Input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="right">
          <Button
            variant="ghost"
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            border="2px solid rgb(49, 130, 206)"
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={AddListingSubmit}
          >
            Ajouter listing
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}