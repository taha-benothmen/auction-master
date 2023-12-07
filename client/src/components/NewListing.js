import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState('item');
  const [quantity, setQuantity] = useState();
  const [unitType, setUnitType] = useState();
  const [residence, setResidence] = useState();
  const [housingInfo, setHousingInfo] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [availableSchools, setAvailableSchools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category
  const [dateTime, setDateTime] = useState('');

  const [file, setFile] = useState();
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
    getSchoolsList();

  }, []);
  async function getSchoolsList() {
    try {
      await axios.get('http://localhost:1234/schools').then((res) => {
        const modifiedData = res.data.map((school) => ({
          ...school,
          id: uuidv4(),
        }));
        console.log(modifiedData);
        // Update the state with the modified data
        setAvailableSchools(modifiedData);
      });
      console.log(availableSchools);
    } catch (e) {
      console.log(e);
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
    formData.append('category', selectedCategory); // Include the selected category in form data
    formData.append('dateTime', dateTime); // Include the selected category in form data
    console.log("🚀 ~ file: NewListing.js:116 ~ submit ~ dateTime:", dateTime)

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
        <FormControl isRequired hidden>
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
        <InputGroup>
          <Select
            placeholder="Choisir un thème"
            variant="filled"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Capture selected category
          >
            {availableSchools.map((school) => (
              <option key={school.id} value={school.school_name}>
                {school.school_name}
              </option>
            ))}
          </Select>
        </InputGroup>
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
        <ModalHeader>Créer une enchère</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <VStack spacing="5">
              <FormControl isRequired hidden>
                <FormLabel>Select Listing Type</FormLabel>
                <Select
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  variant="filled"
                >
                  <option value="sublet">Sublet</option>
                  <option value="item">Item</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Nom d'enchére</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={name}
                  placeholder="Nom d'enchére"
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Prix de depart</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="TND"
                  />
                  <Input
                    type="number"
                    min="0"
                    variant="filled"
                    value={price}
                    placeholder="Enter le prix"
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Details enchére</FormLabel>
                <Textarea
                  type="text"
                  variant="filled"
                  placeholder="Rédigez une description détaillée de votre annonce..."
                  size="md"
                  resize="vertical"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>date de finiton</FormLabel>
                <Input
                  type="datetime-local"
                  variant="filled"
                  placeholder="end date"
                  size="md"
                  resize="vertical"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </FormControl>

              {inputSection}

              <FormControl isRequired>
                <FormLabel htmlFor="imageInput">Télécharger une image</FormLabel>
                <Input
                  pt="1px"
                  pl="1px"
                  type="file"
                  id="imageInput"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ border: 'none' }}
                />
              </FormControl>
            </VStack>
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
            Annuler
          </Button>
          <Button
            colorScheme="blue"
            onClick={(e) => {
              submit(e);
              toast({
                title: props.listing ? 'Listing Updated!' : 'Listing Added!',
                description: props.listing
                  ? `${name} has been updated!`
                  : `${name} has been added!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            {props.listing ? 'Mise a jour enchére' : 'Ajouter enchére'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}