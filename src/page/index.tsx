import { useSelector } from "react-redux";
import Login from "./Login";
import hud from "./hud";
import React from 'react'
import { RootState } from "../store";
import styled from 'styled-components'

const pages = [hud, Login];

const Container = styled.div`
  width: 100%;
  height: 100%;
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

