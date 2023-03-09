import React from 'react'
import useShow from '../hooks/useShow';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styled from 'styled-components';
import { AnimatedBox, AnimatedButton, AnimatedGrid } from '../components/animated-mui';
import { Box, Button, Typography } from '@mui/material';
import { config, useTrail, useTransition } from '@react-spring/web';
import { cRequest } from '../utils/request';

const request = new cRequest()

const Container = styled(AnimatedGrid)`
  margin: 0 auto;
  background-position: center;
  background-size: cover;
  width: 100%;
  min-width: 100vh;
  height: 100%;
  pointer-events: all;
  background-image: radial-gradient(circle at 50% 10%, rgba(49, 49, 49, 0) 11%, #222222 100%);

`
const MenuWrapper = styled(AnimatedGrid)`
  position: absolute;
  right: 2vw;
  bottom: 2vh;
  &::before{
    content: "";
    height: 100%;
    width: 10px;
    position: absolute;
    border-radius: 10px;
    background-color: #ffffff;
    right: -5px;
    box-shadow:  0px 0px 105px 45px rgba(255,11,48,0.5), inset 0px 0px 9px 4px rgba(255,11,48,1);
  }
`

const ConversationWrapper = styled(AnimatedBox)`
  position: absolute;
  bottom: 2vh;
  width: 50vw;
  height: 20vh;
  border-radius: 10px;
  text-shadow: 0 0 10px rgba(255, 255, 255, .7),0 0 40px rgba(255, 255, 255, .7),0 0 100px rgba(255, 255, 255, .7);
`

function Menu() {
  const [show] = useShow(process.env.NODE_ENV==='test', 'Menu', true, true, true, true)
  const elements = useSelector((state:RootState)=>state.menu.elements)
  const conversation = useSelector((state:RootState)=>state.menu.conversation)
  const transitions = useTransition(show, {
    delay: show ? 0: 300,
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    config: {...config.molasses, duration: 500}
  })
  const trail = useTrail(elements.length, {
    delay: show ? 500 : 0,
    config: { mass: 5, tension: 2000, friction: 200, duration: 200 },
    opacity: show ? 1 : 0,
    x: show ? 0 : 20,
    from: { opacity: 0, x: 20 },
  })

  return transitions((style, show)=>(show
    ?
    <Container 
      container
      justifyContent={'center'}
      alignItems={'center'}
      style={style}
    >
      <MenuWrapper 
        container 
        item
        flexDirection={'column'}
        sx={{
          maxWidth: '15vw'
        }}
      >
        {/* {menu.map((m, i)=>{
          return <Button 
            key={i} 
            variant="contained"
            color='warning'
            sx={{
              m:1,
              p:3,
              minHeight: '5vh',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              position: 'relative',
              color: '#1f1f1f',
              '&::after': {
                content: "''",
                height: '3vh',
                width: '5px',
                position: 'absolute',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                backgroundColor: '#FF0B2F',
                right: 0
              }
            }}
          >{m.label}</Button>
        })} */}
        {trail.map((style, index)=>(
          <AnimatedButton 
            key={index} 
            variant="contained"
            color='warning'
            sx={{
              m:1,
              p:3,
              minHeight: '5vh',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              position: 'relative',
              color: 'white',
              backgroundColor: '#1f1f1f',
              //background: 'linear-gradient(145deg, #efaa25, #c98f20)',
              //boxShadow: '-5px 0px 105px 45px rgba(11,255,52,0.33), inset 0px 0px 30px 20px rgba(11,255,52,0.33)',
              textShadow:'0 0 10px rgba(255, 255, 255, .7),0 0 40px rgba(255, 255, 255, .7),0 0 100px rgba(255, 255, 255, .7)',
              '&::after': {
                content: "''",
                height: '3vh',
                width: '5px',
                position: 'absolute',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                backgroundColor: '#FF0B2F',
                right: 0,
                boxShadow:  '0px 0px 10px 5px rgba(255,11,48,0.9), inset 0px 0px 1px 1px rgba(255,11,48,1)'
              }
            }}
            style={style}
            onClick={()=>request.post('menu:onClick', index)}
          >{elements[index].label}</AnimatedButton>
        ))}
      </MenuWrapper>
      <ConversationWrapper>
        <Typography variant='h5' fontFamily={'Title'}>{conversation.name}</Typography>
        <Typography variant="body1">{conversation.message}</Typography>
      </ConversationWrapper>
    </Container>
    :
    null
  ))
}

const Menupage = {
  element: Menu,
  needLogin: true
};

export default Menupage