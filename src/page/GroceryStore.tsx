import React, { useState, useEffect  } from 'react';
import useShow from '../hooks/useShow';
import { Grid, InputLabel, Typography, Button, MenuItem, Select, SelectChangeEvent, LinearProgress } from '@mui/material';
import styled from 'styled-components';
import { cRequest } from '../utils/request'
import { AnimatedGrid } from '../components/animated-mui'
import FormControl from '@mui/material/FormControl/FormControl';
import { animated, config, useChain, useSpring, useSpringRef, useTransition } from '@react-spring/web'

const Container = styled(AnimatedGrid)`
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: rgba(49, 49, 49, 0.788);
    pointer-events: all;
    
`

function GroceryStore() {
    const [show] = useShow(process.env.NODE_ENV === 'development', 'GroceryStore', true, true, true, false)

    const transRef = useSpringRef()
    const transitions = useTransition(show, {
        ref: transRef,
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
        config: {...config.molasses, duration: 500}
    })

    useChain(show ? [transRef] : [transRef], show ? 
        [0.0]:
        [0.5], 
        1000)
    return transitions( (style, show) => (show ?

        <Container style={{...style}}>
            
        </Container>:null
        )
    );
}

const GroceryStorePage = {
    element : GroceryStore,
    needLogin: true
}

export default GroceryStorePage;