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
    min-width: 100vh;
    height: 100%;
    pointer-events: all;
`


const Top = styled(AnimatedGrid)`
    height: 75%;

`
const Bottom = styled(AnimatedGrid)`
    height: 25%;
    background-color: blue;

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
            <Top sx={{p:8}} container flexDirection={"row"} display={"flex"}>
                <Grid xs={2} item sx={{backgroundColor:"pink"}}>
                    <Grid xs={12} height={"10%"}  sx={{mt: 1}}>
                        <Typography variant='h5' color={"primary"} sx={{fontFamily: "Title", fontWeight:"bold"}}>Thông tin</Typography>
                        <Typography variant='h5' color={"white"} sx={{fontFamily: "Title", fontWeight:"bold"}}>sản phẩm</Typography>
                    </Grid>
                </Grid>
                <Grid xs={8} item sx={{backgroundColor:"purple"}}>8</Grid>
                <Grid xs={2} item sx={{backgroundColor:"pink"}}>
                    <Grid xs={12} display={"flex"} flexDirection={"column"} height={"10%"} sx={{mt: 1}}>
                        <Typography variant='h5' color={"primary"} sx={{fontFamily: "Title", fontWeight:"bold", float:"right", textAlign:"right"}}>giỏ</Typography>
                        <Typography variant='h5' color={"white"} sx={{fontFamily: "Title", fontWeight:"bold", float:"right", textAlign:"right"}}>hàng</Typography>
                    </Grid>
                </Grid>
            </Top>
            <Bottom container justifyContent={"center"}  sx={{pl:8, pr:8}}>
                <Grid width={"90%"} container justifyContent={"center"} alignItems={"center"} display={"flex"} flexDirection={"column"}>
                    <Grid xs={3}>3</Grid>
                    <Grid xs={9}>9</Grid>
                </Grid>
            </Bottom>
        </Container>:null
        )
    );
}

const GroceryStorePage = {
    element : GroceryStore,
    needLogin: true
}

export default GroceryStorePage;