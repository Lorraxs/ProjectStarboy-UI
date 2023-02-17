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
import { EPlayerInventorySlot, EPlayerTransSlot } from '../shared/interfaces/inventory.interface'
import { cRequest } from '../utils/request'
import { DragDropContext, ResponderProvided } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd'

const request = new cRequest()

const Container = styled(Grid)`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(49, 49, 49, 0.788) 51%, #250000 100%);
  padding: 2%;
  pointer-events: all;
`
const HumanPng = styled.img`
  height: 80%;
  position: absolute;
`


function PlayerInventory() {
  const [show] = useShow(process.env.NODE_ENV === 'development', 'PlayerInventory', true, true, true, true)
  const gender = useSelector((state: RootState)=>state.player.gender)
  console.log(show)

  const onDragEnd = (result: DropResult, provider: ResponderProvided)=>{
    console.log(result)
    const {destination, draggableId, mode, reason, source, type} = result
    request.post('PlayerInventory:OnDragEnd', result)
  }

  const onLockTrans = () => {
    request.post('PlayerInventory:Trans:Lock')
  }

  const onCancelTrans = () => {
    request.post('PlayerInventory:Trans:Cancel')
  }

  return (show ?
    <DragDropContext onDragEnd={onDragEnd}>
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
              borderWidth: '.1vw',
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
          
                
                <Slot slot={EPlayerInventorySlot.GLASS} placement="left" title='Kính' icon='glasses' width={'3.4vw'} style={{marginTop: '30px'}}/>
                <Slot slot={EPlayerInventorySlot.ACCESSORY} placement="left" title='Phụ kiện' icon='accessory' width={'3.4vw'} style={{marginTop: '20px'}}/>
                <Slot slot={EPlayerInventorySlot.WATCH} placement="left" title='Đồng hồ' icon='watch' width={'3.4vw'} style={{marginTop: '80px'}}/>
                <Slot slot={EPlayerInventorySlot.EXTEND} placement="left" title='' icon='basic' width={'3.4vw'} style={{marginTop: '20px'}}/>
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
                <Slot slot={EPlayerInventorySlot.HAT} title='Mũ' icon='hat'/>
                <Slot slot={EPlayerInventorySlot.UNDERSHIRT} title='Áo trong' icon='tshirt'/>
                <Slot slot={EPlayerInventorySlot.TOP} title='Áo ngoài' icon='jacket'/>
                <Slot slot={EPlayerInventorySlot.BAG} title='Ba lô' icon='backpack'/>
                <Slot slot={EPlayerInventorySlot.LEG} placement='right' title='Quần' icon='pants'/>
                <Slot slot={EPlayerInventorySlot.SHOES} placement='right' title='Giày' icon='shoes'/>
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
                <Slot slot={EPlayerInventorySlot.MASK} placement='right' title='Mặt nạ' icon='mask' width={'3.4vw'} style={{marginTop: '30px'}}/>
                <Slot slot={EPlayerInventorySlot.EAR} placement='right' title='Hoa tai' icon='earing' width={'3.4vw'} style={{marginTop: '20px'}}/>
                <Slot slot={EPlayerInventorySlot.KEVLAR} placement='right' title='Áo chống đạn' icon='bulletproof' width={'3.4vw'} style={{marginTop: '80px'}}/>
                <Slot slot={EPlayerInventorySlot.TORSOR} placement='right' title='Bao tay' icon='glove' width={'3.4vw'} style={{marginTop: '20px'}}/>
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
              borderWidth: '.1vw',
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
              <Slot slot={EPlayerInventorySlot.BP_0} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_1} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_2} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_3} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_4} icon='' width={'5vw'} style={{margin: 5}}/>
            </Grid>
            <Grid 
              container 
              item
              justifyContent={'center'}
              sx={{
                pr: '2px'
              }}
            >
              <Slot slot={EPlayerInventorySlot.BP_5} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_6} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_7} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_8} icon='' width={'5vw'} style={{margin: 5}}/>
              <Slot slot={EPlayerInventorySlot.BP_9} icon='' width={'5vw'} style={{margin: 5}}/>
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
                <Slot slot={EPlayerInventorySlot.BP_10} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_11} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_12} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_13} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_14} disable icon='' width={'5vw'} style={{margin: 5}}/>
              </Grid>
              <Grid 
                container 
                item
                justifyContent={'center'}
              >
                <Slot slot={EPlayerInventorySlot.BP_15} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_16} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_17} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_18} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_19} disable icon='' width={'5vw'} style={{margin: 5}}/>
              </Grid>
              <Grid 
                container 
                item
                justifyContent={'center'}
              >
                <Slot slot={EPlayerInventorySlot.BP_20} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_21} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_22} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_23} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_24} disable icon='' width={'5vw'} style={{margin: 5}}/>
              </Grid>
              <Grid 
                container 
                item
                justifyContent={'center'}
              >
                <Slot slot={EPlayerInventorySlot.BP_25} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_26} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_27} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_28} disable icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerInventorySlot.BP_29} disable icon='' width={'5vw'} style={{margin: 5}}/>
              </Grid>
              {/* <Grid 
                container 
                item
                justifyContent={'center'}
              >
                <Slot slot={EPlayerInventorySlot.BP_30} disable icon='' width={'5vw'} style={{margin: 5}}/>
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
              </Grid> */}
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
              borderWidth: '.1vw',
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
            <Slot slot={EPlayerInventorySlot.FS_0} icon='' keyboard={'1'} width={'4vw'} style={{margin: 5}}/>
            <Slot slot={EPlayerInventorySlot.FS_1} icon='' keyboard={'2'} width={'4vw'} style={{margin: 5}}/>
            <Slot slot={EPlayerInventorySlot.FS_2} icon='' keyboard={'3'} width={'4vw'} style={{margin: 5}}/>
            <Slot slot={EPlayerInventorySlot.FS_3} icon='' keyboard={'4'} width={'4vw'} style={{margin: 5}}/>
            <Slot slot={EPlayerInventorySlot.FS_4} icon='' keyboard={'5'} width={'4vw'} style={{margin: 5}}/>
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
              borderWidth: '.1vw',
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
                <Slot slot={EPlayerTransSlot.P_0} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.P_1} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.P_2} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.P_3} icon='' width={'5vw'} style={{margin: 5}}/>
              </Grid>
              <Grid 
                container 
                item
                justifyContent={'center'}
              >
                <Slot slot={EPlayerTransSlot.P_4} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.P_5} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.P_6} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.P_7} icon='' width={'5vw'} style={{margin: 5}}/>
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
                <Slot slot={EPlayerTransSlot.T_0} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.T_1} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.T_2} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.T_3} icon='' width={'5vw'} style={{margin: 5}}/>
              </Grid>
              <Grid 
                container 
                item
                justifyContent={'center'}
              >
                <Slot slot={EPlayerTransSlot.T_4} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.T_5} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.T_6} icon='' width={'5vw'} style={{margin: 5}}/>
                <Slot slot={EPlayerTransSlot.T_7} icon='' width={'5vw'} style={{margin: 5}}/>
              </Grid>
              <Grid container sx={{mt: 5, height: '10%'}} flexWrap='nowrap'>
                <Button 
                  variant='contained' 
                  color='warning' 
                  fullWidth 
                  sx={{mr: 5}}
                  onClick={onLockTrans}
                >Khóa</Button>
                <Button variant='contained' fullWidth onClick={onCancelTrans}>Hủy</Button>
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
    </DragDropContext>
    :
    null
  )
}

const PlayerInventoryPage = {
  element: PlayerInventory,
  needLogin: true
}

export default  PlayerInventoryPage