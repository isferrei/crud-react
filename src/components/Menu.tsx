import { Stack, Button, Image } from '@chakra-ui/react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'

export const Menu = () => {
  const router = useRouter()
  return (
    <Stack
      bg="#fff"
      width="300px"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      paddingTop="30px"
    >
      <Image src="/static/rocket.svg" width="50px" height="50px" mb="20px" />
      <Stack alignItems="start" width="100%">
        <Button
          variant="ghost"
          width="100%"
          leftIcon={<AiFillHome />}
          onClick={() => router.push('/')}
        >
          Home
        </Button>
        <Button
          variant="ghost"
          width="100%"
          leftIcon={<FaUserAlt />}
          onClick={() => router.push('/users')}
        >
          Users
        </Button>
      </Stack>
    </Stack>
  )
}
