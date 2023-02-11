import { useSelector } from "react-redux";
import LoginPage from "./Login";
import HudPage from "./hud";
import React from 'react'
import { RootState } from "../store";
import styled from 'styled-components'

const pages = [LoginPage, HudPage];

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  ${
    process.env.NODE_ENV === 'development' && 
    `background-image: url('/assets/backgrounds/example.jpg');
    background-position: center;
    background-size: cover;`
  }
`

function Page() {
  const playerState = useSelector((state: RootState)=>state.player)
  console.log(playerState)
  return (
    <Container>
      {pages.map((page, i)=>{
        const Page = page.element
        if(page.needLogin){
          return playerState._id !== '' ? <Page/> : null
        }else{
          return playerState._id === '' ? <Page/> : null
        }
      })}
    </Container>
  )
}

export default Page

