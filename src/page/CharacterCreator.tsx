import React from 'react'
import useShow from '../hooks/useShow'
import styled from 'styled-components'
import { animated } from '@react-spring/web'
import { AnimatedGrid } from '../components/animated-mui'

const Container = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: #1f1f1f;
`

function CharacterCreator() {
  const [show, setShow] = useShow(process.env.NODE_ENV === 'development', 'CharacterCreator', true, true, true, false)
  return (show ?
    <Container>
      <AnimatedGrid container>
        
      </AnimatedGrid>
    </Container> : null
  )
}

const CharacterCreatorPage = {
  element: CharacterCreator,
  needLogin: false
}

export default  CharacterCreatorPage