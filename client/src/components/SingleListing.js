import axios from 'axios';
import { useEffect, useState } from 'react';
import NewMessage from './NewMessage';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { ImHammer2 } from "react-icons/im";
import React from 'react';
import CountdownTimer from './CountdownTimer';
import NewListing from './NewListing';
import { MdOutlineCategory } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";

import {
  Box,
  Image,
  Flex,
  Button,
  Heading,
  Text,
  Avatar,
  Spacer,
  Input,
  InputRightElement,
  InputGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useNumberInput,
  HStack,
  Center,
  useToast,
  Icon,
  Container,
  SimpleGrid
} from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  FormLabel,
  Portal,
  FormControl,
  InputLeftElement,
} from '@chakra-ui/react';
import { DeleteIcon, ChatIcon, EmailIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { TfiList } from "react-icons/tfi";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
export default function SingleListing() {
  const toast = useToast();

  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const history = useNavigate();
  const [listing, setListing] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const deleteModal = useDisclosure();
  const lid = window.location.pathname.split('/')[2];

  const [bidPrice, setBidPrice] = useState(0);


  const [countdownExpired, setCountdownExpired] = useState(false);

  useEffect(() => {
    const difference = new Date(listing.end_date) - new Date();


    if (difference <= 0) {
      setCountdownExpired(true);
    } else {
      setCountdownExpired(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing.end_date]);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.01,
      defaultValue: listing.price,
      min: 1,
      max: 6,
      precision: 2,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  useEffect(() => {
    getListing();
    getListingComments();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const getListing = () => {
    axios
      .get(`http://localhost:1234/listings/${lid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setListing({ ...res.data });
        console.log("🚀 ~ file: SingleListing.js:89 ~ .then ~ ...res.data :", res.data)
      })
      .catch((e) => console.log(e));
  };

  const getListingComments = () => {
    axios
      .get(`http://localhost:1234/comments/${lid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => console.log(e));
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteListing = () => {
    axios
      .delete(`http://localhost:1234/listings/${lid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: 'Enchère supprimée avec succès !',
          description: "",
          status: 'succes',
          duration: 9000,
          isClosable: true,
        })
        history('/listings');
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const submitComment = (e) => {
    e.preventDefault();
    setIsComment(false);
    if (!newComment) return;
    axios
      .post(
        `http://localhost:1234/comments/${lid}`,
        { content: newComment },
        axiosConfig
      )
      .then((res) => {
        console.log('line 55');
        console.log(res);
        toast({
          title: 'Commentaire ajouté !',
          description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        axios.post(
          'http://localhost:1234/notifications',
          {
            title: 'Vous avez un nouveau commentaire !',
            username: listing.username,
            content: `Votre annonce ${listing.name} a un nouveau commentaire !`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        getListingComments();
      })
      .catch((e) => console.log(e));
    setNewComment('');
  };


  const submitBidPrice = (e) => {
    e.preventDefault();

    if (listing.price >= bidPrice) {
      toast({
        title: "Le montant ajouté ne doit pas être inférieur au montant précédent.",
        description: '',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return;
    };


    const dataObject = {
      listingId: listing.lid,
      newPrice: bidPrice,
      winer: username,
    }
    axios
      .post(
        `http://localhost:1234/updateListingPrice/`, dataObject)
      .then((res) => {
        toast({
          title: 'Enchère ajoutée !',
          description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        axios.post(
          'http://localhost:1234/notifications',
          {
            title: 'Offre mise à jour !',
            username: listing.username, // Seller's username
            content: `Le prix de l'enchère pour votre annonce ${listing.name} a été mis à jour à ${bidPrice}TND par ${username}.`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        history('/listings');
      })

      .catch((e) => console.log(e));
  };


  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:1234/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getListingComments();
    } catch (error) {
      console.log(error);
    }
  };

  const isoString = listing.end_date;
  const date = new Date(isoString);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const [updatescomment, setupdatescomment] = useState('');

  const submitupdateComment = (id) => {
    const dataObject = {
      oldComentID: id,
      newComment: updatescomment,
    };

    axios
      .post(`http://localhost:1234/updateCommonts`, dataObject)
      .then((res) => {
        toast({
          title: 'Commentaire mis à jour avec succès !',
          description: ".",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        getListingComments();
      })
      .catch((e) => console.log(e));
  };


  return (
    <Box
      width="75%"
      margin="auto"
      marginTop="5vh"
      marginBottom="5vh"
      height="80vh"
    >
      <Flex height="100%">
        {/* Left side - Background image with blur effect */}
        <Box flex="1" position="relative" zIndex="1" overflow="hidden">
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex="-1"
            filter="blur(25px)"
            webkitFilter="blur(25px)"
            backgroundImage={`url(http://localhost:1234/images/listings/${listing.image})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
            boxShadow='base'

          />

          {/* Content inside the Box */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            boxShadow='base'

          >
            <Image
              src={`http://localhost:1234/images/listings/${listing.image}`}
              alt="Listing image"
            />
          </Box>

        </Box>

        {/* Right side - Sidebar with listing information */}
        <Box
          flex="0.6"
          bg="white"
          p={3}
          boxShadow='base'
        >
          <Flex flexDirection="column" height="100%">
            <Box flex="1" overflowY={'auto'}>
              <Flex >
                <Heading size="xl">{listing.name}
                </Heading >
                {listing.username == username && (
                  <Flex marginLeft={190}>
                    {/* Edit Button */}
                    <Button variant="ghost" onClick={handleOpenEditModal}>
                      <EditIcon />
                    </Button>

                    {/* Delete Button */}
                    <Button variant="ghost" onClick={deleteModal.onOpen}>
                      <DeleteIcon />
                    </Button>
                  </Flex>
                )}
              </Flex>
              <Flex margin={2}>
                <MdOutlineCategory size="25px" name={listing.theme} mr="2"
                />
                <Text marginLeft={2}>{listing.theme}</Text>
              </Flex>


              <Text fontWeight="bold" mb="2" margin={2}>
                <Avatar size="sm" name={listing.username} mr="2" />
                {listing.username}

                <EmailIcon
                  ml={'2'}
                  boxSize="6"
                  color="gray.400"
                  cursor="pointer"
                  transition="color 0.2s ease"
                  _hover={{ color: '#F2B0AE' }}
                  onClick={handleOpenModal}
                />

              </Text>
              {/* <Heading size="sm">{formattedDate}</Heading> */}
              <center>
                <Heading size="xS">

                  {countdownExpired ? (
                    <Box
                    backgroundColor={'#fdcac6'}
                    w='80%' p={3}
                    borderRadius={5}>
                    <p><Heading color={'red'} size={'1x'} marginBlockEnd={4} backgroundColor={'#fdcac6'}
                      borderRadius={5}>L'enchère est fermée !</Heading></p>
                  </Box>
                   
                  ) : (
                    <Box
                      backgroundColor={'#fdcac6'}
                      w='100%' p={4}
                      borderRadius={5}>
                      <CountdownTimer position='center' targetDate={listing.end_date} />
                    </Box>
                  )}
                </Heading>
              </center>

              <Flex margin={2}>
                <FaArrowTrendDown
                  size="25px"
                  color='red'
                  marginRight={4} />
                <Heading size="x1" mb="2" marginLeft={2}>


                  Montant de lancement {' '}
                  <Text as="span" color="red.500" fontStyle={'bold'}>
                    {listing.price_deb} TND
                  </Text>{' '}
                </Heading>
              </Flex>


              <Heading size="x1" mb="2" marginBlockEnd={3}>
                Discription
              </Heading>
              {listing.type === 'sublet' ? (
                <Text as="span" display="block" mb={2}>
                  <Text as="span" fontWeight="bold">
                    Residence:
                  </Text>{' '}
                  {listing.res_name}
                  <br />
                  <Text as="span" fontWeight="bold">
                    Unit Type:
                  </Text>{' '}
                  {listing.unit}
                </Text>
              ) : null}

              <Text mb={2}>{listing.description}</Text>


            </Box>
            {countdownExpired ? (<Center>
              <Flex margin={4}>
                    <SimpleGrid>
                      <Box>
                        <Flex>
                          <FaCircleArrowUp
                            size="25px"
                            color='green'
                          />
                          <Heading size="x1" mb="2" marginLeft={2}>
                            Montant établi{' '}
                            <Text as="span" color="green.500" fontStyle={'bold'}>
                              {listing.price} TND
                            </Text>{' '}

                          </Heading>
                        </Flex>
                      </Box>
                      <Box>
                        <Flex>
                          <GiTrophyCup
                            size="25px"
                            color='gold' />
                          <Heading size="x1" mb="2" marginLeft={2}>

                            <Text as="span" color="pink.300">
                              {listing.winer}
                            </Text>
                          </Heading>
                        </Flex>
                      </Box>
                      </SimpleGrid>
                      </Flex>
              <Heading color={'red'} size={'Mx'} marginBlockEnd={4}></Heading></Center>) : (
              <>
                <Flex mt="auto" >
                  <Flex margin={4}>
                    <SimpleGrid>
                      <Box>
                        <Flex>
                          <FaCircleArrowUp
                            size="25px"
                            color='green'
                          />
                          <Heading size="x1" mb="2" marginLeft={2}>
                            Montant établi à {' '}
                            <Text as="span" color="green.500" fontStyle={'bold'}>
                              {listing.price} TND
                            </Text>{' '}

                          </Heading>
                        </Flex>
                      </Box>
                      <Box>
                        <Flex>
                          <GiTrophyCup
                            size="25px"
                            color='gold' />
                          <Heading size="x1" mb="2" marginLeft={2}>

                            <Text as="span" color="pink.300">
                              {listing.winer}
                            </Text>
                          </Heading>
                        </Flex>
                      </Box>
                      <Box marginLeft={30} marginBlockStart={1}>
                       <Flex justify="center">

                      <InputGroup  >

                        <HStack >
                          <Button {...inc} onClick={() => setBidPrice(({ prev }) => prev + 1)}>
                            +
                          </Button>
                          <Input
                            {...input}
                            defaultValue={listing.price}
                            value={bidPrice}
                            onChange={(e) => setBidPrice(e.target.value)}
                          />
                        </HStack>
                        <InputRightElement width="4rem" marginRight={-2}>
                          <ImHammer2
                            color="gray.400"
                            cursor="pointer"
                            transition="color 0.2s ease"
                            _hover={{ color: '#F2B0AE' }}
                            onClick={submitBidPrice}

                          />
                        </InputRightElement>

                      </InputGroup>
                      </Flex>
                      </Box>
                    </SimpleGrid>

                  </Flex>
                </Flex>

              </>
            )}
          </Flex>
        </Box>
      </Flex >
      <Flex flexDirection="column" height="100%">
        {/* ... (existing content) ... */}

        {/* Horizontal Box */}
        <Flex
          bg="white"
          p={4}
          borderRadius="md"
          mt={4}
          justifyContent="space-between" // Adjust this according to your layout needs
        >
          {/* Content inside the horizontal box */}
          {/* Add your content here */}

          {/* For example: */}
          <Box  >
            <Heading size="md" marginBlockEnd={2}>Commentaire </Heading>
            {comments.map((comment) => {
              return (
                <Flex key={comment.id}
                  p="15px" bg={'gray.200'} my="15px" borderRadius="12px"
                  justify="space-between" w="153%">
                  {/* Username and Avatar */}
                  <Avatar size="sm" name={comment.username} mr={2} />
                  <Box flex="1">
                    <Box fontWeight="bold">{comment.username}</Box>
                    <Box>{comment.content}</Box>
                  </Box>
                  {comment.username === cookies.get('USERNAME') && (

                    <>
                      <Spacer />
                      <DeleteIcon
                        onClick={(e) => deleteComment(comment.cid)}
                        size="sm"
                        variant="solid"
                        cursor="pointer"
                        color="gray.400"
                        transition="color 0.2s ease"
                        _hover={{ color: 'red.500' }}
                        marginLeft={6}
                        position={'bottom'}
                        marginTop={4}
                      >
                        Supprimer
                      </DeleteIcon>
                      <Popover>
                        <PopoverTrigger>
                          <EditIcon mr={2}
                            size="sm"
                            variant="solid"
                            cursor="pointer"
                            color="gray.400"
                            transition="color 0.2s ease"
                            _hover={{ color: 'red.500' }}
                            marginLeft={6}
                            marginTop={4}
                          />
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Modifier votre commontaire</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                              <FormControl isRequired>
                                <InputGroup>
                                  <InputLeftElement
                                    color="gray.300"
                                    fontSize="1.2em"

                                  />
                                  <Input
                                    type="text"

                                    placeholder={comment.content}
                                    value={updatescomment}
                                    onChange={(e) => setupdatescomment(e.target.value)}
                                  />
                                </InputGroup>
                              </FormControl>
                              <center>
                                <Button
                                  margin={3}
                                  flex={1}
                                  fontSize={'sm'}
                                  rounded={'full'}
                                  bg={'#d2f1eb'}
                                  color={'white'}
                                  boxShadow={'#d2f1eb'}
                                  _hover={{
                                    bg: '#fdcac6',
                                  }}
                                  _focus={{
                                    bg: '#d2f1eb',
                                  }}
                                  onClick={() => { submitupdateComment(comment.cid) }}>Modifier</Button></center>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>

                    </>
                  )}
                </Flex>
              );
            })}
          </Box>
          <Box  p="15px"  my="20px" w={'40%'}>
            <InputGroup margin={1}
             >

              <Input
                placeholder="Lancer votre commontaire"
                type="text"
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                borderColor='#F2B0AE'
                focusBorderColor='#F2B0AE'
                pr="4rem"
                


              />

              <InputRightElement width="4rem">
                <ChatIcon
                  color="gray.400"
                  cursor="pointer"
                  transition="color 0.2s ease"
                  _hover={{ color: 'blue.500' }}
                  onClick={submitComment}
                />
              </InputRightElement>

            </InputGroup>
          </Box>
        </Flex>
      </Flex>

      <NewMessage
        props={{
          listing,
          token,
        }}
        isOpen={isModalOpen}
        onOpen={handleOpenModal}
        onClose={handleCloseModal}
      />
      <NewListing
        props={{
          listing,
          username,
          token,
        }}
        isOpen={isEditModalOpen}
        onOpen={handleOpenEditModal}
        onClose={handleCloseEditModal}
      />

      <Modal
        borderRadius="2rem"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Êtes-vous sûr de vouloir supprimer votre enchére ?          </ModalHeader>
          <ModalBody>
            {/* Add any additional content here, if needed */}
          </ModalBody>
          <ModalFooter justifyContent="center">
            {' '}
            {/* Use "justifyContent" to center the buttons */}
            <Button
              variant="ghost"
              colorScheme="gray"
              mr={3}
              onClick={deleteModal.onClose}
            >
              Annuler
            </Button>
            <Button colorScheme="red" onClick={deleteListing}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box >
  );
}
