import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table, Thead, Tr, Th, Td, Checkbox, Tbody,
  Text,
  useBreakpointValue,
  IconButton
} from "@chakra-ui/react";
import { RiPencilLine, RiUserAddLine } from "react-icons/ri";
import { Header } from '../../components/Header'
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination"
import Link from "next/link";

export default function UserList() {
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
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
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

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && (<Th>Data de cadastro</Th>)}
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Fernando Alves</Text>
                    <Text fontSize="sm" color="gray.300">Fernandoalvesq@gmail.com</Text>
                  </Box>
                </Td>
                {isWideVersion && (<Td>04 de Abril de 2021</Td>)}
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
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}