import { Box, FormControl, Grid, Typography } from '@mui/material'
import { useSpring, animated, config, useTransition, useSpringRef, useChain, useTrail  } from '@react-spring/web'
import styled from 'styled-components'

export const AnimatedGrid = animated(Grid)
export const AnimatedTypography = animated(Typography)
export const AnimatedFormControl = animated(FormControl)
export const AnimatedBox = animated(Box)
export const ScrollingBox = styled(Box)`
  ::-webkit-scrollbar
  {
    width: 2px;
    background-color: transparent;

  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-color: #FF0B30;
  }
  ::-webkit-scrollbar-track
  {
    border-radius: 10px;
    background-color: transparent;
  }
`