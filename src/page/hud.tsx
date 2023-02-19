import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useShow from "../hooks/useShow";
import styled from "styled-components";
import { AnimatedGrid } from "../components/animated-mui";
import { Box, Grid, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';

const Container = styled(AnimatedGrid)`
  width: 100%;
  height: 100%;
  padding: 2%;
  pointer-events: all;
`
const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const HUD = () => {
  const [show] = useShow(true, 'HUD', false, false, false, false)
  return (show ? 
    <Container>
      <RightTop />
    </Container>
    :
    null
  );
}

const RightTop = ()=>{
  const money = useSelector((state:RootState)=>state.player.money)
  const bank = useSelector((state:RootState)=>state.player.bank)
  const id = useSelector((state:RootState)=>state.player.id)
  return(
    <Box
      sx={{
        position: 'absolute',
        right: '2%',
        width: '15vw'
      }}
    >
      <Box
        sx = {{
          width: '100%',
          height: '5vh'
        }}
      >
        <Logo src="./assets/logo/logo.png"/>
      </Box>
      <Grid
        container
        justifyContent={'flex-end'}
        sx = {{
          width: '100%',
          height: '3vh',
          mt:5
        }}
      >
        <Grid 
          item 
          xs={4}
          
        >
          <Grid 
            container
            alignItems={'center'}
            justifyContent={'flex-start'}
            sx={{
              width: '100%',
              height: '100%'
            }}
          >
            <Grid item>
              <NumbersIcon sx={{fontSize: '1.5vw'}}/>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{lineHeight: 0}}>ID</Typography>
              <Typography variant="body1" >{id}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid 
          item 
          alignItems={'center'}
          justifyContent={'flex-end'}
          sx={{ml: 5}}
          xs={4}
        >
          <Grid 
            container
            alignItems={'center'}
            justifyContent={'flex-end'}
            flexWrap={'nowrap'}
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '.5vw',
                height: '100%',
                right: '-2vw',
                background: 'radial-gradient(circle, rgba(250,218,156,1) 50%, rgba(253,181,40,1) 100%)',
                boxShadow: '0px 0px 15px #FDB528',
              }
            }}
          >
            <Grid item>
              <Typography sx={{lineHeight: 0, color: '#FDB528', fontWeight: 500, fontFamily: 'Phudu', fontSize: '1.3vw', mr: 2}}>{bank}</Typography>
            </Grid>
            <Grid item>
              <AccountBalanceIcon sx={{fontSize: '1.5vw', color: '#FDB528'}}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={'flex-end'}
        sx = {{
          width: '100%',
          height: '3vh',
          mt:2
        }}
      >
        <Grid 
          item 
          xs={4}
        >
          <Grid 
            container
            alignItems={'center'}
            justifyContent={'flex-start'}
            sx={{
              width: '100%',
              height: '100%'
            }}
          >
            <Grid item>
              <PersonIcon sx={{fontSize: '1.5vw'}}/>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{lineHeight: 0}}>online</Typography>
              <Typography variant="body1" >123</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid 
          item 
          xs={4}
          alignItems={'center'}
          justifyContent={'flex-end'}
          sx={{ml: 5}}
        >
          <Grid 
            container
            alignItems={'center'}
            justifyContent={'flex-end'}
            flexWrap={'nowrap'}
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '.5vw',
                height: '100%',
                right: '-2vw',
                backgroundColor: 'white',
                boxShadow: '0px 0px 15px white',
              }
            }}
          >
            <Grid item>
              <Typography sx={{lineHeight: 0, color: 'white', fontWeight: 500, fontFamily: 'Phudu', fontSize: '1.0vw', mr: 2}}>{money}</Typography>
            </Grid>
            <Grid item>
              <AccountBalanceWalletIcon sx={{fontSize: '1.5vw'}}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={'flex-end'}
        sx={{
          mt:2
        }}
      >
        <i className="icon-star" style={{fontSize: '1.5vw', color: '#ffffff52'}}/>
        <i className="icon-star" style={{fontSize: '1.5vw', color: '#ffffff52'}}/>
        <i className="icon-star" style={{fontSize: '1.5vw', color: '#ffffff52'}}/>
        <i className="icon-star" style={{fontSize: '1.5vw'}}/>
        <i className="icon-star" style={{fontSize: '1.5vw'}}/>
      </Grid>
    </Box>
  )
}

const HudPage = {
  element: HUD,
  needLogin: true
};

export default HudPage
