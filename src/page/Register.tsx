import React from 'react'
import * as yup from 'yup'
import { AnimatedFormControl, AnimatedGrid, AnimatedTypography } from '../components/animated-mui'
import styled from 'styled-components'
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useShow from '../hooks/useShow'
import { animated, config, useChain, useSpring, useSpringRef, useTrail, useTransition } from '@react-spring/web'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { cRequest } from '../utils/request'

const request = new cRequest()

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  rePassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  name: yup.string().required('Vui lòng nhập tên nhân vật'),
  gender: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn giới tính'),
})

const Container = styled(AnimatedGrid)`
  background-image: url('./assets/backgrounds/register.jpg');
  pointer-events: auto;
  width: 100%;
  height: 100%;
`

const Wrapper = styled(AnimatedGrid)`
  width: 25% !important;
  position: absolute;
  right: 5%;
`

const Shape = styled(animated.img)`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  object-fit: contain;
  object-position: right;
`

const ButtonAction = styled(Button)`
  &:hover {
    transform: scale(1.1);
  }
`

const pageInfo = {
  name: 'Register',
  hasFocus: true,
  hasCursor: true,
  keepInput: true,
  canClose: false
}

const defaultValues = {
  email: '',
  password: '',
  rePassword: '',
  name: '',
  gender: 'male'
}

function Register() {
  const [show, setShow] = useShow(false, pageInfo.name, pageInfo.hasFocus, pageInfo.hasCursor, pageInfo.keepInput, pageInfo.canClose)
  const springRef = useSpringRef()
  const springs = useSpring({
    ref: springRef,
    from: { x: 100, opacity: 0 },
    to: { x: show ? 0 : 100, opacity: show ? 1 : 0 },
    config: {...config.molasses, duration: 500}
  })
  const transRef = useSpringRef()
  const transitions = useTransition(show, {
    ref: transRef,
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    config: {...config.molasses, duration: 500}
  })
  const shapeTransRef = useSpringRef()
  const shapeTransistions = useTransition(show, {
    ref: shapeTransRef,
    from: { x: 1000},
    enter: { x: 0},
    leave: { x: 1000},
    config: {...config.molasses, duration: 300}
  })
  const trailsRef = useSpringRef()
  const trails = useTrail(7, {
    ref: trailsRef,
    from: { opacity: 0 },
    to: { opacity: show ? 1 : 0 },
    config: {...config.molasses, duration: 500}
  })
  const {control, watch, reset, handleSubmit, formState: { errors }, setValue} = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  useChain(show ? [transRef, shapeTransRef, trailsRef, springRef] : [springRef, trailsRef, shapeTransRef, transRef], show ? [0,0.3, 0.6, 0.6] : [0, 0.3, 0.3, 0.3], 1000)

  const onSubmit = (data:any)=>{
    console.log(data)
    request.post('Register', data)
  }

  const onLoginClick = ()=>{
    request.post('HidePage', 'Register')
    request.post('ShowPage', 'Login')
  }
  return (
    transitions((style, show)=>(
    show ? <Container container justifyContent={'center'} alignItems={'center'} flexDirection={'column'} style={style}>
      {shapeTransistions((style, show)=>(
        show ? <Shape src={'./assets/shapes/register2.png'} style={style}/> : null
      ))}
        <Wrapper container justifyContent={'center'} style={{...springs}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {trails.map((props, index) => (
              index === 0 ? <AnimatedTypography style={props} variant='h3' sx={{fontFamily: 'Title', mb: 6}}>Đăng Ký</AnimatedTypography> : 
              index === 1 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                <Controller 
                  name='email'
                  control={control}
                  render={({field: {value, onChange}})=>(
                    <TextField label='Email' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.email)} sx={{bgcolor: '#1f1f1f', borderRadius: 1, boxShadow: '0px 3px 1px  #0BFF33'}} fullWidth/>
                  )}          
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </AnimatedFormControl> : 
              index === 2 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                <Controller 
                  name='password'
                  control={control}
                  render={({field: {value, onChange}})=>(
                    <TextField label='Mật khẩu' type='password' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.password)} sx={{bgcolor: '#1f1f1f', borderRadius: 1, boxShadow: '0px 3px 1px  #0BFF33'}}  fullWidth/>
                  )}          
                />
                {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
              </AnimatedFormControl> :
              index === 3 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                <Controller 
                  name='rePassword'
                  control={control}
                  render={({field: {value, onChange}})=>(
                    <TextField label='Xác nhận mật khẩu' type='password' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.rePassword)} sx={{bgcolor: '#1f1f1f', borderRadius: 1, boxShadow: '0px 3px 1px  #0BFF33'}}  fullWidth/>
                  )}          
                />
                {errors.rePassword && <FormHelperText sx={{ color: 'error.main' }}>{errors.rePassword.message}</FormHelperText>}
              </AnimatedFormControl>:
              index === 4 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                <Controller 
                  name='name'
                  control={control}
                  render={({field: {value, onChange}})=>(
                    <TextField label='Tên nhân vật' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.name)} sx={{bgcolor: '#1f1f1f', borderRadius: 1, boxShadow: '0px 3px 2px #0BFF33'}}  fullWidth/>
                  )}          
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </AnimatedFormControl> :
              index === 5 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                <Controller 
                  name='gender'
                  control={control}
                  render={({field: {value, onChange}})=>(
                    <><FormControl>
                      <InputLabel id="gender-label" >Giới tính</InputLabel>
                      <Select 
                        labelId='gender-label'
                        id='c-gender'
                        value = {value}
                        onChange={onChange}
                        label='Giới tính'
                        variant='outlined'
                        sx={{bgcolor: '#1f1f1f', borderRadius: 1, boxShadow: '0px 3px 1px  #0BFF33'}}
                      >
                        <MenuItem value='male'>Nam</MenuItem>
                        <MenuItem value='female'>Nữ</MenuItem>
                      </Select>
                      </FormControl>
                    </>
                  )}          
                />
                {errors.gender && <FormHelperText sx={{ color: 'error.main' }}>{errors.gender.message}</FormHelperText>}
              </AnimatedFormControl> :
              index === 6 ? <AnimatedGrid style={props} container spacing={6}>
                <Grid item xs={6}>
                  <ButtonAction variant='contained' type='submit' color='primary' fullWidth>Đăng Ký</ButtonAction>
                </Grid>
                <Grid item xs={6}>
                  <ButtonAction variant='contained' color='warning' onClick={onLoginClick} fullWidth>Đăng Nhập</ButtonAction>
                </Grid>
              </AnimatedGrid> : null
            ))}
          </form>
        </Wrapper>
      </Container> : null
    ))
  )
}

const RegisterPage = {
  element: Register,
  needLogin: false
}

export default RegisterPage