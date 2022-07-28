import {
  Box,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from '@chakra-ui/react'
import { FaUserAstronaut } from 'react-icons/fa'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface IProps {
  setUser: (user: User) => void
  updateList?: User
}

export const UserList = ({ setUser, updateList }: IProps) => {
  const baseUrl = 'http://localhost:3001/users'
  const [list, setList] = useState<Array<User>>()
  const toast = useToast()

  useEffect(() => {
    axios(baseUrl).then((resp) => {
      setList(resp.data)
    })
  }, [updateList])

  const remove = (id: string) => {
    try {
      axios.delete(`${baseUrl}/${id}`)

      toast({
        position: 'top-right',
        title: 'User removed',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch {
      toast({
        position: 'top-right',
        title: 'Error to remove this user',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Box alignSelf="center" width="100%" mb="20px" overflowY="scroll">
      <Table
        color="#fff"
        bg="#100F0F"
        borderRadius="15px"
        variant="unstyled"
        width="100%"
      >
        <Thead borderBottom="1px #A5C9CA solid">
          <Tr>
            <Th></Th>
            <Th color="#A5C9CA">Id</Th>
            <Th color="#A5C9CA">Name</Th>
            <Th color="#A5C9CA">Email</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((user) => (
            <Tr key={user.id}>
              <Td>
                <FaUserAstronaut />
              </Td>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Button
                  variant="unstyled"
                  title="Edit"
                  onClick={() => {
                    setUser(user)
                  }}
                >
                  <FaEdit color="#A5C9CA" />
                </Button>
              </Td>
              <Td>
                <Button
                  variant="unstyled"
                  title="Delete"
                  onClick={() => {
                    remove(user.id)
                  }}
                >
                  <FaTrash color="#ff99cc" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
