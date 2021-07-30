import { Stack, Box, Text } from "@chakra-ui/react";
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  usersId: number[];
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

const generatePagesArray = (from: number, to:number) => {
  return [...new Array(to - from)]
  .map((_,index) => {
    return from + index + 1;
  })
  .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters, registerPerPage=10, currentPage=1, onPageChange, usersId
} : PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage); //arredonda para cima

  const previousPages = currentPage > 1 
  ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
  : []

  const nextPages = currentPage < lastPage
  ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
  : []

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{usersId[0]}</strong> - <strong>{usersId[usersId.length -1]}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">

        { 
          currentPage > (1 + siblingsCount) && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1}/>
              { currentPage > (2 + siblingsCount) && 
                  ( <Text color="gray.300" width="8" textAlign="center">...</Text> )
              }
            </>
          )
        }

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem key={page} onPageChange={onPageChange} number={page}/>
        })}

        <PaginationItem  onPageChange={onPageChange} number={currentPage}  isCurrent/>

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem key={page} onPageChange={onPageChange} number={page}/>
        })}

        { 
          (currentPage + 1 + siblingsCount) < lastPage && 
          ( <Text color="gray.300" width="8" textAlign="center">...</Text> )
        }

        { (currentPage + siblingsCount) < lastPage && (<PaginationItem onPageChange={onPageChange} number={lastPage}/>) }

      </Stack>
    </Stack>
  )
}