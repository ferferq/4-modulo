import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table, Thead, Tr, Th, Td, Checkbox, Tbody,
  Text,
  useBreakpointValue,
  IconButton,
  Spinner,
  Link as ChakraLink
} from "@chakra-ui/react";
import { RiPencilLine, RiUserAddLine } from "react-icons/ri";
import { Header } from '../../components/Header'
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination"
import Link from "next/link";
import { useUsers, getUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/react-query/queryClient";
import { api } from "../../services/axios/api";
//import { GetServerSideProps } from "next";

type User = {
  id: string,
  name: string,
  email: string,
  createdAt: string,  
}

interface userListProps {
  users: User[];
}

export default function UserList() {
  const [page, setPage] = useState(1);
  //posso pegar o refetch também que criar um botam e executar esta funcao para fazer um reflash
  /*const { data, isLoading, isFetching, error } = useUsers(page, {
      initialData: users, do props
  });*/
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`)
      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 //10 minutos
    })
  }
  
  const userNumbers = data && data.users.map(u => {return (Number(u.id))})

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["3", "6"]}>
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["3", "6"]}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários 
              {(!isLoading && isFetching) && <Spinner size="sm" color='gray.500' ml='4'/>}
              </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiUserAddLine} />}
                fontSize="18"
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {
            isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && (<Th textAlign="center">Data de cadastro</Th>)}
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      data.users.map(user => {
                        return (
                          <Tr key={user.id}>
                            <Td px={["4", "4", "6"]} color="gray.300" width="8">
                              <Checkbox colorScheme="pink" />
                            </Td>
                            <Td>
                              <Box>
                                <ChakraLink color='purple.400' onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                                  <Text fontWeight="bold">{user.name}</Text>
                                </ChakraLink>
                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                              </Box>
                            </Td>
                            {isWideVersion && (<Td textAlign="center">{user.createdAt}</Td>)}
                            <Td>
                              {
                                isWideVersion ?
                                  (
                                    <Button
                                      as="a"
                                      size="sm"
                                      fontSize="16"
                                      colorScheme="purple"
                                      leftIcon={<Icon as={RiPencilLine} />}
                                    >
                                      Editar
                                    </Button>
                                  )
                                  :
                                  (
                                    <IconButton
                                      aria-label="Edit User"
                                      as="a"
                                      size="sm"
                                      fontSize="16"
                                      colorScheme="purple"
                                      icon={<Icon as={RiPencilLine} />}
                                    />
                                  )
                              }
                            </Td>
                          </Tr>
                        )
                      })
                    }
                  </Tbody>
                </Table>

                <Pagination 
                  totalCountOfRegisters={data.totalCount}
                  usersId={userNumbers}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )
          }
        </Box>
      </Flex>
    </Box>
  )
}

/*
export const getServerSideProps: GetServerSideProps = async () => {
  //const { users, totalCount} = await getUsers(1);
  const users = {}
  return { 
    props: {
      users,
    }
  }
}*/

