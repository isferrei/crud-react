import { Stack } from '@chakra-ui/react'
import { Menu, UserCrud } from 'components'

const Users = () => {
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
      <UserCrud />
    </Stack>
  )
}

export default Users
