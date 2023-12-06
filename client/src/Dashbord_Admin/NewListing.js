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
  const [type, setType] = useState('sublet');
  const [quantity, setQuantity] = useState();
  const [unitType, setUnitType] = useState();
  const [residence, setResidence] = useState();
  const [housingInfo, setHousingInfo] = useState([]);
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
  }, []);

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

  

  return (
    <Modal
      blockScrollOnMount={false}
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un nouveau responsable RH</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <VStack spacing="5">
             

              <FormControl isRequired>
                <FormLabel>Nom</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  />
                  <Input
                    type="text"
                    min="0"
                    variant="filled"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  variant="filled"
                  size="md"
                  resize="vertical"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>


              <FormControl isRequired>
                <FormLabel htmlFor="imageInput">Télécharger une photo de profile</FormLabel>
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
            color="red"
            mr={3}
            onClick={onClose}
            border="#F2B0AE"
          >
            Annuler
          </Button>
          <Button
            color="#F2B0AE"
            onClick={(e) => {
              submit(e);
              toast({
                title: props.listing ? 'Ajouter!' : 'Ajouter!',
                description: props.listing
                  ? `${name} has been updated!`
                  : `${name} has been added!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            {props.listing ? 'Update Listing' : 'Ajouter'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
