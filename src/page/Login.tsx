import React, { useEffect, useRef } from 'react'
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
import { useSpring, animated, config, useTransition, useSpringRef, useChain, useTrail  } from '@react-spring/web'
import useShow from '../hooks/useShow';
import { cRequest } from '../utils/request';
//import HCaptcha from "@hcaptcha/react-hcaptcha";
import HCaptcha from 'starboy-hcaptcha'

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
})

const defaultValues: ILoginPlayer = {
  email: 'tringuyenk19@gmail.com',
  password: '123123',
}

const AnimatedGrid = animated(Grid)
const AnimatedTypography = animated(Typography)
const AnimatedFormControl = animated(FormControl)

const Container = styled(AnimatedGrid)`
  background-image: url('./assets/backgrounds/login.jpg');
  pointer-events: auto;
`

const Wrapper = styled(AnimatedGrid)`
  width: 25% !important;
  position: absolute;
  left: 5%;
`

const Shape = styled(animated.img)`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  object-fit: contain;
  object-position: left;
`

const request = new cRequest()

const Login = () => {
  const [show, setShow] = useShow(false, 'Login', true, true, true, false)
  const springRef = useSpringRef()
  const springs = useSpring({
    ref: springRef,
    from: { x: -100, opacity: 0 },
    to: { x: show ? 0 : -100, opacity: show ? 1 : 0 },
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
    from: { x: -1000},
    enter: { x: 0},
    leave: { x: -1000},
    config: {...config.molasses, duration: 300}
  })
  const trailsRef = useSpringRef()
  const trails = useTrail(5, {
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
  const captchaRef = useRef<HCaptcha>(null);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef?.current?.execute();
  };

  console.log('rerender Login')
  useChain(show ? [transRef, shapeTransRef, trailsRef, springRef] : [springRef, trailsRef, shapeTransRef, transRef], show ? [0,0.3, 0.6, 0.6] : [0, 0.3, 0.3, 0.3], 1000)

  const onSubmit = (data:any)=>{
    console.log(data)
    request.post('Login', data)
  }

  const onRegisterClick = ()=>{
    setShow(false)
    request.post('HidePage', 'Login')
    request.post('ShowPage', 'Register')
  }

  /* if(!show)
    return null */
  return (
      transitions((style, show)=>(
        show ? <Container container justifyContent={'center'} alignItems={'center'} flexDirection={'column'} sx={{width: '100%', height: '100%'}} style={style}>
          {shapeTransistions((style, show)=>(
            show ? <Shape src={'./assets/shapes/login2.png'} style={style}/> : null
          ))}
          <Wrapper item xs={9} sx={{p: 10}} container spacing={6} justifyContent={'center'} style={{...springs}}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {trails.map((props, index) => (
                index === 0 ? <AnimatedTypography style={props} variant='h3' sx={{fontFamily: 'Title', mb: 6}}>Đăng Nhập</AnimatedTypography> : 
                index === 1 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                  <Controller 
                    name='email'
                    control={control}
                    render={({field: {value, onChange}})=>(
                      <TextField label='Email' variant='outlined' value={value} onChange={onChange} error={Boolean(errors.email)} sx={{bgcolor: '#1f1f1f', borderRadius: 1, boxShadow: '0px 3px 1px  #ff0b30'}} fullWidth/>
                    )}          
                  />
                  {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                </AnimatedFormControl> : 
                index === 2 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                  <Controller 
                    name='password'
                    control={control}
                    render={({field: {value, onChange}})=>(
                      <TextField label='Password' variant='outlined' type='password' value={value} onChange={onChange} error={Boolean(errors.password)} sx={{bgcolor: '#1f1f1f', borderRadius: 1, boxShadow: '0px 3px 1px  #ff0b30'}}  fullWidth/>
                    )}          
                  />
                  {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
                </AnimatedFormControl> :
                /* index === 3 ? <AnimatedFormControl style={props} sx={{m: 'auto', mb: 6}} variant='standard' fullWidth>
                  <Controller 
                    name='token'
                    control={control}
                    render={({field: {value, onChange}})=>(
                      <HCaptcha
                        sitekey="bbba7fec-268d-46be-974b-f55c3a1965ca"
                        onLoad={onLoad}
                        onVerify={onChange}
                        ref={captchaRef}
                        
                      />
                    )}          
                  />
                  {errors.token && <FormHelperText sx={{ color: 'error.main' }}>{errors.token.message}</FormHelperText>}
                </AnimatedFormControl> :  */
                index === 4 ? <AnimatedGrid style={props} container spacing={6}>
                  <Grid item xs={6}>
                    <Button variant='contained' type='submit' color='primary' fullWidth>Đăng nhập</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant='contained' color='warning' onClick={onRegisterClick} fullWidth>Đăng ký</Button>
                  </Grid>
                </AnimatedGrid> : null
              ))}
            </form>
          </Wrapper>
        </Container>:null
      ))
  )
}

const LoginPage = {
  element: Login,
  needLogin: false
}

export default  LoginPage