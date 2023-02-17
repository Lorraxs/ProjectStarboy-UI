import styled from '@emotion/styled'
import { Avatar, Box, Divider, Grid, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { IItemType } from '../shared/interfaces/item.interface'
import { EInventoryRarity, EPlayerInventorySlot, EPlayerTransSlot, IInventoryItem } from '../shared/interfaces/inventory.interface'
import { getItemDataByName, isClotheSlot, isFastSlot } from '../shared/utils/func'
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


const SlotContainer = styled(Grid)<{disable: boolean, isDraggingOver: boolean}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p)=>p.isDraggingOver? "#80ed99" : (p.disable ? '#0000003e' : '#0000009b')};
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
  width: 20px;
  height: 20px;
  background-color: ${(props)=>(props.rarity !== undefined && props.rarity !== EInventoryRarity.COMMON) ? RarityColor[props.rarity] : 'transparent'};
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


function Slot({width='100px', icon='hat', style={}, title="", placement='top', keyboard, disable=false, type='standard', slot=EPlayerInventorySlot.BP_0}:SlotProps) {
  const inventory = useSelector((state:RootState)=>state.player.inventory)
  const item = inventory[slot];
  const itemData = item && getItemDataByName(item.name)
  console.log(item)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openContext = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if(!item) return
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title={title} placement={placement} arrow>
        <Droppable droppableId={slot}>
          {(provided, snapshot)=>(
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
          )}
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
        <MenuItem onClick={handleClose}>
          <Typography variant='h5'>{itemData?.label}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>Số lượng: {item?.amount}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant='body2'>{itemData?.description}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PanToolAltIcon fontSize="small" />
          </ListItemIcon>
          Sử dụng
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CallSplitIcon fontSize="small" />
          </ListItemIcon>
          Tách
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          Vứt
        </MenuItem>
      </Menu>}
    </>
  )
}

export default Slot