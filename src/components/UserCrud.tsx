import { Box, Button, Input, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { WarningIcon } from '@chakra-ui/icons'
import { UserList } from 'components/UserList'

const baseUrl = 'http://localhost:3001/users'

const initialState = {
  user: { name: '', email: '', id: '' },
  list: [],
}

type FormData = {
  name: string
  email: string
  id?: number
}

export const UserCrud = () => {
  const [user, setUser] = useState<User>(initialState.user)
  const toast = useToast()

  const schemaValidation = yup.object({
    name: yup.string().required('This field is required'),
    email: yup.string().required('This field is required'),
  })

  console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      id: Number(user.id),
      name: user.name,
      email: user.email,
    },
  })

  const onSubmit = handleSubmit(async (formData) => {
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    const method = user.id ? 'put' : 'post'

    try {
      axios[method](url, formData).then((resp) => {
        setUser(initialState.user)
        reset()

        toast({
          position: 'top-right',
          title: 'User registered successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
    } catch {
      toast({
        position: 'top-right',
        title: 'Error on user registration',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  })

  const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...user }
    data[event.target.name as keyof User] = event.target.value
    setUser(data)
  }

  return (
    <Box
      padding="20px"
      height="100vh"
      width="80%"
      margin="0 auto !important"
      display="flex"
      flexDirection="column"
      alignSelf="center"
      gap="40px"
    >
      <Text
        fontSize={18}
        fontWeight="700"
        color="#ff99cc"
        textTransform="uppercase"
      >
        Create user
      </Text>
      <Box
        as="form"
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        gap="10px"
      >
        {errors.name?.message && (
          <Text color="red" fontWeight="medium" fontSize="14px">
            <WarningIcon mr="2" />
            {errors.name?.message}
          </Text>
        )}
        <Input
          bg="fff"
          {...register('name')}
          placeholder="Your name"
          width={'100%'}
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => updateField(e)}
        />
        {errors.email?.message && (
          <Text color="red" fontWeight="medium" fontSize="14px">
            <WarningIcon mr="2" />
            {errors.email?.message}
          </Text>
        )}
        <Input
          bg="fff"
          mb="40px"
          {...register('email')}
          placeholder="Ex: joaosilva@email.com"
          width={'100%'}
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => updateField(e)}
        />
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="baseline"
          gap="10px"
        >
          <Button type="submit" width="250px" bg="#A5C9CA">
            Save
          </Button>
          <Button type="reset" width="250px" bg="#E7F6F2">
            Cancel
          </Button>
        </Stack>
      </Box>
      <UserList setUser={setUser} updateList={user} />
    </Box>
  )
}
