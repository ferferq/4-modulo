import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ProfileProps {
  showProfileData: boolean;
}

export const Profile: React.FC<ProfileProps> = ({
  showProfileData = true
}) => {
  return (
    <Flex align="center" >
      {
        showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>Fernando Alves</Text>
            <Text color="gray.300" fontSize="small">
              fernandoalvesq@gmail.com
            </Text>
          </Box>
        )
      }

      <Avatar fontSize="md" name="Fernando Alves" src="https://lh3.googleusercontent.com/ogw/ADea4I54wDd1LG6jxXhInW9Qz7C6n6KHoz8k27RRemeJzg=s83-c-mo" />
    </Flex>
  );
}