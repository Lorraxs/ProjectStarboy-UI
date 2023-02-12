import React, { useEffect } from 'react'
import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginPlayer } from '../shared/interfaces';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography/Typography';
import FormControl from '@mui/material/FormControl/FormControl';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import TextField from '@mui/material/TextField';
import {Avatar, Button, FormHelperText, Grid} from '@mui/material'
import styled from 'styled-components';
import { useSpring, animated, config, useTransition, useSpringRef  } from '@react-spring/web'

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
})

const defaultValues: ILoginPlayer = {
  email: '',
  password: ''
}

const AnimatedGrid = animated(Grid)

const Container = styled(AnimatedGrid)`
  background-image: url('./assets/backgrounds/login.jpg');
`

const Wrapper = styled(Grid)`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(10.7px);
  -webkit-backdrop-filter: blur(10.7px); */
  border: 1px solid rgba(255, 255, 255,  0.14);
`

const Login = () => {
  const springs = useSpring({
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: config.molasses
  })
  const transRef = useSpringRef()
  const [transitions, api] = useTransition(1, () => ({
    ref: transRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  }))
  const {control, watch, reset, handleSubmit, formState: { errors }, setValue} = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    transRef.start()
  }, [])

  return (
      <Container container justifyContent={'center'} alignItems={'center'} flexDirection={'column'} sx={{width: '100%', height: '100%'}} >

        <AnimatedGrid item container sx={{width: '50%', borderRadius: 2, pr: '15%'}} alignItems={'center'} style={{...springs}}>
          {transitions((style, item)=>(
            <animated.div style={style}>{item}</animated.div>
          ))}
          <Wrapper item xs={9} sx={{p: 10}} container spacing={6} justifyContent={'center'}>
            <Typography variant='h3' sx={{fontFamily: 'Title', mb: 6}}>Đăng Nhập</Typography>
            <FormControl sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
              <Controller 
                name='email'
                control={control}
                render={({field: {value, onChange}})=>(
                  <TextField label='Email' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.email)} sx={{bgcolor: '#020101d8', borderRadius: 1, boxShadow: '0px 3px 1px  #ff0b30'}} fullWidth/>
                )}          
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <FormControl sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
              <Controller 
                name='password'
                control={control}
                render={({field: {value, onChange}})=>(
                  <TextField label='Password' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.password)} sx={{bgcolor: '#020101d8', borderRadius: 1, boxShadow: '0px 3px 1px  #ff0b30'}}  fullWidth/>
                )}          
              />
              {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
            </FormControl>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Button variant='contained' color='primary' fullWidth>Đăng nhập</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant='contained' color='warning' fullWidth>Đăng ký</Button>
              </Grid>
            </Grid>
          </Wrapper>
          
        </AnimatedGrid>
      </Container>
  )
}

const LoginPage = {
  element: Login,
  needLogin: false
}

export default  LoginPage