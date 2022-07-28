import { Button, Stack, Text, Box } from '@chakra-ui/react'
import { Menu } from 'components'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Stack
      bg="#2C3333"
      display="flex"
      flexDirection="row"
      gap="40px"
      maxH="100vh"
      paddingRight="40px"
    >
      <Menu />
      <Box
        margin="auto !important"
        alignItems="center"
        textAlign="center"
        display="flex"
        gap="20px"
      >
        <Text
          fontWeight={500}
          fontSize={32}
          alignSelf="center"
          color="#ff99cc"
          textTransform="uppercase"
        >
          Users dashboard
        </Text>
        <Button onClick={() => router.push('/users')}>Get started</Button>
      </Box>
    </Stack>
  )
}

export default Home
