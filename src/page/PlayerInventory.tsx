import React from 'react'
import useShow from '../hooks/useShow'
import styled from 'styled-components'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Slot from '../components/Slot'
import { ScrollingBox } from '../components/animated-mui'
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';

const Container = styled(Grid)`
  width: 100%;
  height: 100%;
  background-color: radial-gradient(circle, rgba(49, 49, 49, 0.788) 51%, #250000 100%);
  padding: 2%;
  pointer-events: all;
`
const HumanPng = styled.img`
  height: 80%;
  position: absolute;
`


function PlayerInventory() {
  const [show] = useShow(false, 'PlayerInventory', true, true, true, true)
  const gender = useSelector((state: RootState)=>state.player.gender)
  console.log(gender)
  return (show ?
    <Container container columns={21}>
      <Grid 
        item 
        xs={6}
        sx={{
        }}
      >
        <Box sx={{height: '10%'}}>
          <Typography variant='h4' sx={{fontFamily: 'Title', fontWeight: 'bold', color: '#ff0b30'}}>KHO ĐỒ</Typography>
        </Box>
        <Grid 
          container 
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            position: 'relative',
            height: '80%', 
            width: '90%',
            marginLeft: '10%',
            borderWidth: '.3vw',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(135deg, #ffffff81, transparent 15%, transparent 85%, #ffffff81)1'
          }}
        > 
          <Typography variant='h5' sx={{
            fontFamily: 'Title', 
            color: '#ff0b30',
            position: 'absolute',
            top: 0,
            transform: 'translateY(-50%) ',
            right: 0
          }}>ĐANG MẶC</Typography>
          <HumanPng src={`./assets/images/${gender}.png`}/>
          <Grid 
            container
            columns={12}
            sx={{
              position: 'absolute',
              width: '60%',
              height: '80%',
            }}
          >
            <Grid 
              item 
              xs={3}
              container
              alignItems={'flex-start'}
              flexDirection={'column'}
              sx={{
                /* bgcolor: '#1f1f1f52' */
                
              }}
            >
        
              
              <Slot placement="left" title='Kính' icon='glasses' width={'3.4vw'} style={{marginTop: '30px'}}/>
              <Slot placement="left" title='Phụ kiện' icon='accessory' width={'3.4vw'} style={{marginTop: '20px'}}/>
              <Slot placement="left" title='Đồng hồ' icon='watch' width={'3.4vw'} style={{marginTop: '80px'}}/>
              <Slot placement="left" title='' icon='basic' width={'3.4vw'} style={{marginTop: '20px'}}/>
            </Grid>
            <Grid 
              item 
              container
              justifyContent={'center'}
              alignItems={'flex-start'}
              xs={6}
              sx={{
                height: '100%'
              }}
            >
              <Slot title='Mũ' icon='hat'/>
              <Slot title='Áo trong' icon='tshirt'/>
              <Slot title='Áo ngoài' icon='jacket'/>
              <Slot title='Ba lô' icon='backpack'/>
              <Slot placement='right' title='Quần' icon='pants'/>
              <Slot placement='right' title='Giày' icon='shoes'/>
            </Grid>
            <Grid 
              item 
              xs={3}
              container
              alignItems={'flex-start'}
              flexDirection={'column'}
              sx={{
                /* bgcolor: '#1f1f1f52' */
              }}
            >
              <Slot placement='right' title='Mặt nạ' icon='mask' width={'3.4vw'} style={{marginTop: '30px'}}/>
              <Slot placement='right' title='Hoa tai' icon='earing' width={'3.4vw'} style={{marginTop: '20px'}}/>
              <Slot placement='right' title='Áo chống đạn' icon='bulletproof' width={'3.4vw'} style={{marginTop: '80px'}}/>
              <Slot placement='right' title='Bao tay' icon='glove' width={'3.4vw'} style={{marginTop: '20px'}}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid 
          container 
          justifyContent={'flex-start'}
          flexWrap={'nowrap'}
          flexDirection={'column'}
          sx={{
            position: 'relative',
            height: '77%', 
            width: '95%',
            marginLeft: '5%',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(135deg, #ffffff81, transparent 35%, transparent 85%, #ffffff81)1',
            padding: 5,
            paddingTop: 10
          }}
        >
          <Typography variant='h5' sx={{
            fontFamily: 'Title', 
            color: '#ff0b30',
            position: 'absolute',
            top: 0,
            transform: 'translateY(-50%) ',
            right: 0,
          }}>VẬT PHẨM</Typography>  
          <Grid 
            container 
            item
            justifyContent={'center'}
            sx={{
              pr: '2px'
            }}
          >
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
          </Grid>
          <Grid 
            container 
            item
            justifyContent={'center'}
            sx={{
              pr: '2px'
            }}
          >
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            <Slot icon='' width={'5vw'} style={{margin: 5}}/>
          </Grid>
          <ScrollingBox sx={{
            maxHeight: '70%',
            overflowY: 'auto'
          }}>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot disable icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
          </ScrollingBox>
        </Grid>
        <Grid 
          container 
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            position: 'relative',
            height: '17%', 
            width: '85%',
            marginTop: '5%',
            marginLeft: '12.5%',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(135deg, #ffffff81, transparent 15%, transparent 85%, #ffffff81)1'
          }}
        >
          <Typography variant='body1' sx={{
            fontFamily: 'Title', 
            color: '#ff0b30',
            position: 'absolute',
            bottom: 0,
            transform: 'translateY(50%) ',
          }}>PHÍM NHANH</Typography>  
          <Slot icon='' keyboard={'1'} width={'4vw'} style={{margin: 5}}/>
          <Slot icon='' keyboard={'2'} width={'4vw'} style={{margin: 5}}/>
          <Slot icon='' keyboard={'3'} width={'4vw'} style={{margin: 5}}/>
          <Slot icon='' keyboard={'4'} width={'4vw'} style={{margin: 5}}/>
          <Slot icon='' keyboard={'5'} width={'4vw'} style={{margin: 5}}/>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Grid 
          container 
          /* justifyContent={'center'}
          alignItems={'center'} */
          sx={{
            position: 'relative',
            height: '65%', 
            width: '90%',
            marginTop: '30%',
            marginLeft : '5%',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(135deg, #ffffff81, transparent 35%, transparent 85%, #ffffff81)1',
            p: 10
          }}
        > 
          <Typography variant='h5' sx={{
            fontFamily: 'Title', 
            color: '#ff0b30',
            position: 'absolute',
            top: 0,
            transform: 'translateY(-50%) ',
            right: 0,
          }}>GIAO DỊCH</Typography> 
          <Box>
            <Typography variant='button' fontWeight={'bold'} sx={{m: '5px'}}>Bạn</Typography>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid container alignItems={'center'} sx={{mt: 5}}>
              <Typography variant='button' fontWeight={'bold'} sx={{m: '5px'}}>THOMAS EDISON</Typography>
              <Box sx={{ml: 5, bgcolor: '#0000009b', p: 1, color: '#0BFF33'}}>Đã khóa</Box>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
            >
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid container sx={{mt: 5, height: '10%'}} flexWrap='nowrap'>
              <Button variant='contained' color='warning' fullWidth sx={{mr: 5}}>Khóa</Button>
              <Button variant='contained' fullWidth>Hủy</Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid 
        container 
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        sx={{
          position: 'absolute',
          width: '25vw',
          height: '25vw',
          left: '50vw',
          top: '50vh',
          transform: 'translateX(-55%) translateY(-50%)',
        }}
      >
        <Grid item>
          <LockIcon sx={{fontSize: '4vw'}}/>
        </Grid>
        <Grid item>
          <Typography variant='h4' fontWeight={'bold'}>KHÓA</Typography>
        </Grid>
        <Grid item sx={{mt: 5}}>
          <Typography variant='body1' >Bạn không có ba lô. Vui lòng mua ba lô tại  </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1' >Cửa hàng <b>24/7</b></Typography>
        </Grid>
      </Grid>
      <Grid 
        container 
        alignItems={'center'}
        justifyContent={'flex-end'}
        sx={{
          position: 'absolute',
          width: '15vw',
          height: '10vh',
          right: '2%',
          top: '2%',
        }}
      >
        <Typography variant='body1' sx={{fontSize: '.8vw'}}>Đóng cửa sổ</Typography>
        <Box sx={{bgcolor: '#ff0b30', p: 1, borderRadius: 1, px: 3, ml: 2}}>ESC</Box>
      </Grid>
      <Grid 
        container 
        alignItems={'center'}
        justifyContent={'flex-end'}
        sx={{
          position: 'absolute',
          width: '15vw',
          height: '10vh',
          right: '2%',
          bottom: '2%',
        }}
      >
        <Typography variant='body1' sx={{fontSize: '.8vw'}}>Kéo vào đây để vứt</Typography>
        <DeleteIcon sx={{fontSize: '2.5vw'}}/>
      </Grid>
    </Container>
    :
    null
  )
}

const PlayerInventoryPage = {
  element: PlayerInventory,
  needLogin: false
}

export default  PlayerInventoryPage