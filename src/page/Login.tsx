import React from 'react'
import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginPlayer } from '../shared/interfaces';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography/Typography';
import FormControl from '@mui/material/FormControl/FormControl';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import TextField from '@mui/material/TextField';
import {FormHelperText} from '@mui/material'

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
})

const defaultValues: ILoginPlayer = {
  email: '',
  password: ''
}

const Login = () => {

  const {control, watch, reset, handleSubmit, formState: { errors }, setValue} = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  return (
      <Box sx={{width: '30%'}}>
        <FormLabel component={'legend'}>Login</FormLabel>
        <FormControl sx={{m: 'auto'}} variant='standard' fullWidth>
          <Controller 
            name='email'
            control={control}
            render={({field: {value, onChange}})=>(
              <TextField label='Email' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.email)} fullWidth/>
            )}          
          />
          {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
        </FormControl>
      </Box>
  )
}

const LoginPage = {
  element: Login,
  needLogin: false
}

export default  LoginPage