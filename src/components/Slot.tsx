import styled from '@emotion/styled'
import { Grid, Tooltip } from '@mui/material'
import React from 'react'


const SlotContainer = styled(Grid)<{disable: boolean}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p)=>p.disable ? '#0000003e' : '#0000009b'};
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
  transform: translateY(50%);
`

interface SlotProps{
  width?:string;
  icon?:string;
  style?: object;
  title?: string;
  placement?: "top" | "right" | "bottom" | "left" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
  keyboard? : string;
  disable? :boolean
}

function Slot({width='100px', icon='hat', style={}, title="", placement='top', keyboard, disable=false}:SlotProps) {
  return (
    <Tooltip title={title} placement={placement} arrow>
      <SlotContainer 
        sx={{
          width: width,
          height: width,
        }}
        style={style}
        disable={disable}
      >
        <SlotIcon className={`icon-${icon}`}/>
        {keyboard && <SlotKeyboard>{keyboard}</SlotKeyboard>}
      </SlotContainer>
    </Tooltip>
  )
}

export default Slot