import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { Profile } from './Profile'
import { NotificationNav } from './NotificationNav'
import { SearchBox } from './SearchBox'
import { Logo } from './Logo'
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { RiMenuLine } from "react-icons/ri";

export function Header () {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })


  return(
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {
        !isWideVersion && (
          <IconButton
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine} />}
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
            mr="2"
          />
        )
      }

      <Logo />

      {isWideVersion && <SearchBox />}
      
      <Flex
        algin="center"
        ml="auto"
      >
      <NotificationNav />
        
      <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}