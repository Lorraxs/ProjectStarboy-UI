import styled from '@emotion/styled'
import { Avatar, Box, Button, Divider, Grid, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { IItemType } from '../shared/interfaces/item.interface'
import { EInventoryRarity, EPlayerInventorySlot, EPlayerTransSlot, IInventoryItem } from '../shared/interfaces/inventory.interface'
import { getItemDataByName, isBackpackSlot, isClotheSlot, isFastSlot, isNullOrUndefined, isSlotAcceptItem } from '../shared/utils/func'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { RarityColor } from '../shared/interfaces'
import { Draggable, Droppable } from 'react-beautiful-dnd'


const SlotContainer = styled(Grid)<{disable: boolean, isDraggingOver: boolean, notAccept?:boolean}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p)=>p.isDraggingOver? "#80ed99" : (p.disable ? '#0000003e' : '#0000009b')};
  ${(p)=>p.notAccept && 'background-color: #FF0B2F;'}
  border-radius: 3px;
`
const SlotIcon = styled.i`
  font-size: 50px;
  line-height: 0;
  position: absolute;
  color: #ffffff5c;
`
const SlotKeyboard = styled.div`
  position: absolute;
  color: black;
  background-color: #FDB528;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Title';
  font-weight: bold;
  font-size: 12px;
  font-height: 0;
  bottom: 0;
  transform: translateY(50%);
`
const SlotBlackground = styled.img`
  position: absolute;
  width: 80%;
  height: 80%;
`
const SlotItemAmount = styled(Box)`
  position: absolute;
  color: black;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Title';
  font-weight: bold;
  font-size: 12px;
  font-height: 0;
  bottom: 0;
  left: 0;
`
const SlotRarity = styled(Box)<{rarity?: EInventoryRarity}>`
  position: absolute;
  width: 1.2vw;
  height: .3vw;
  background-color: ${(props)=>(props.rarity !== undefined && props.rarity !== EInventoryRarity.COMMON) ? RarityColor[props.rarity] : 'transparent'};
  border-bottom-left-radius: .2vw;
  border-bottom-right-radius: .2vw;
  top: 0;
`

interface SlotProps{
  width?:string;
  icon?:string;
  style?: object;
  title?: string;
  placement?: "top" | "right" | "bottom" | "left" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
  keyboard? : string;
  disable? :boolean;
  type? :IItemType;
  slot? : EPlayerInventorySlot | EPlayerTransSlot;
  item? : IInventoryItem;
}



function Slot({width='5vw', icon='hat', style={}, title="", placement='top', keyboard, disable=false, type='standard', slot=EPlayerInventorySlot.BP_0}:SlotProps) {
  const inventory = useSelector((state:RootState)=>state.player.inventory)
  const item = inventory[slot];
  const itemData = item && getItemDataByName(item.name)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openContext = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if(!item) return
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNotAccept = (dragSlot?:string | null, dropSlot?: string)=>{
    if (!dragSlot) return false;
    if (!dropSlot) return false;
    const item = inventory[dragSlot];
    if (!item) return true;
    const itemData = getItemDataByName(item.name);
    if (!itemData) return true;
    const _isBackpackSlot = isBackpackSlot(dropSlot);
    if(_isBackpackSlot){
      const hasBackpack = !isNullOrUndefined(inventory[EPlayerInventorySlot.BAG])
      if(!hasBackpack){
        return true
      }
    }
    const isAccept = isSlotAcceptItem(dropSlot, itemData);
    return !isAccept
  }
  return (
    <>
      <Tooltip title={title} placement={placement} arrow>
        <Droppable droppableId={slot}>
          {(provided, snapshot)=>{
            return(
              <SlotContainer 
                sx={{
                  width: width,
                  height: width,
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={style}
                disable={disable}
                onContextMenu={handleClick}
                isDraggingOver={snapshot.isDraggingOver}
                notAccept={isNotAccept(snapshot.draggingOverWith, provided.droppableProps['data-rbd-droppable-id'])}
              >
                {!item && <SlotIcon className={`icon-${icon}`}/>}
                {keyboard && <SlotKeyboard>{keyboard}</SlotKeyboard>}
                {
                  item ? <Draggable draggableId={slot} index={0}>
                    {(provided, snapshot) => (
                      <SlotBlackground 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps} 
                        src={`https://lorraxs.com/lr_core_pro/items/${item.name}.png`}
                      /> 
                    )}
                  </Draggable> : null
                }
                {item && !isClotheSlot(slot) && <SlotItemAmount>{item.amount}</SlotItemAmount>}
                {itemData && <SlotRarity rarity={itemData.rarity}/>}
                {provided.placeholder}
              </SlotContainer>
            )
          }}
        </Droppable>
      </Tooltip>
      {item !== undefined && <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openContext}
        onClose={handleClose}
        onClick={handleClose}
        onContextMenu={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            background: "#000000b3",
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            minWidth: '15vw',
            p:2,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              background: "#000000b3",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem >
          {itemData !== undefined && <Typography variant='h5' sx={{color: RarityColor[itemData?.rarity]}}>{itemData?.label}</Typography>}
        </MenuItem>
        <MenuItem >
          <Typography>Số lượng: {item?.amount}</Typography>
        </MenuItem>
        <MenuItem >
          <Typography variant='body2'>{itemData?.description}</Typography>
        </MenuItem>
        <Divider />
        <Box >
          <Grid container  flexWrap={'nowrap'} alignItems={'center'}>
            <Grid item xs={4}>
              <Button variant='text' color='secondary' startIcon={<PanToolAltIcon/>} fullWidth>Sử dụng</Button>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item xs={4}>
              <Button variant='text' color='secondary' startIcon={<CallSplitIcon/>} fullWidth>Tách</Button>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4}>
              <Button variant='text' color='secondary' startIcon={<DeleteForeverIcon/>} fullWidth>Vứt</Button>
            </Grid>
          </Grid>
        </Box>
      </Menu>}
    </>
  )
}

export default Slot