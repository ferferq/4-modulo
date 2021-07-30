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
  Spinner
} from "@chakra-ui/react";
import { RiPencilLine, RiUserAddLine } from "react-icons/ri";
import { Header } from '../../components/Header'
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination"
import Link from "next/link";
import { useUsers } from "../../services/hooks/useUsers";

export default function UserList() {
  //posso pegar o refetch também que criar um botam e executar esta funcao para fazer um reflash
  const { data, isLoading, isFetching, error } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

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
                      data.map(user => {
                        return (
                          <Tr key={user.id}>
                            <Td px={["4", "4", "6"]} color="gray.300" width="8">
                              <Checkbox colorScheme="pink" />
                            </Td>
                            <Td>
                              <Box>
                                <Text fontWeight="bold">{user.name}</Text>
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
                  totalCountOfRegisters={200}
                  currentPage={5}
                  onPageChange={() => {}}
                />
              </>
            )
          }
        </Box>
      </Flex>
    </Box>
  )
}