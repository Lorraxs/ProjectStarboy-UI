import { useSelector } from "react-redux";
import LoginPage from "./Login";
import HudPage from "./hud";
import React from 'react'
import { RootState } from "../store";
import styled from 'styled-components'
import RegisterPage from "./Register";
import CharacterCreatorPage from "./CharacterCreator";
import GroceryStorePage from "./GroceryStore";
import WeaponShopPage from "./WeaponShop";
import PlayerInventoryPage from "./PlayerInventory";

const pages = [LoginPage, RegisterPage, CharacterCreatorPage, HudPage, PlayerInventoryPage, GroceryStorePage, WeaponShopPage];

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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
`

function Page() {
  const playerState = useSelector((state: RootState)=>state.player)
  console.log(playerState)
  return (
    <Container>
      {pages.map((page, i)=>{
        const Page = page.element
        if(process.env.NODE_ENV === 'development'){
          return(
            <Wrapper>
              <Page key={i}/> 
            </Wrapper>
          )
        }else{
          if(page.needLogin){
            return playerState._id !== '' ? <Wrapper>
              <Page key={i}/> 
            </Wrapper>: null
          }else{
            return playerState._id === '' ? <Wrapper>
              <Page key={i}/> 
            </Wrapper>: null
          }
        }
      })}
    </Container>
  )
}

export default Page