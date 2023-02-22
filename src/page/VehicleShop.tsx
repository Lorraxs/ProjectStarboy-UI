import useShow from '../hooks/useShow';
import { config, useSpring, useChain, useSpringRef, useTransition } from '@react-spring/web';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MouseIcon from '@mui/icons-material/Mouse';
import styled from 'styled-components';
import { AnimatedGrid } from '../components/animated-mui';
import { Typography } from '@mui/material';

const Container= styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/backgrounds/bg_vehicleshop_demo.jpg');
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
`
const Top = styled(AnimatedGrid)`
    height: 80%;
    padding: 30px 25px 0px 25px
`

const Bottom = styled(AnimatedGrid)`
    height: 20%;
    padding: 0px 25px 15px 25px
`
const TopInfoMation = styled(AnimatedGrid)`
    height: 7%;
    position: relative;

`


function VehicleShop() {
    const [show] = useShow(process.env.NODE_ENV === 'development', 'VehicleShop', true, true, true, false)
    const transRef = useSpringRef()
    const transitions = useTransition(show, {
        ref: transRef,
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
        config: {...config.molasses, duration: 500}
    })
    useChain(show ? [transRef] : [ transRef ], show ? 
        [0.0]:
        [0.0], 
    1000)
    return transitions ((style, show) => (show ? 
        <Container style={{...style}}>
            <Top>
                <TopInfoMation display={"flex"} wrap="nowrap">
                    <AnimatedGrid height={"100%"} width={"30%"} display={"flex"} wrap="nowrap" alignItems={"center"}>
                        <Typography variant='h5' color={"primary"} sx={{fontFamily: "Title", fontWeight: "bold"}}>ESC</Typography>
                        <Typography variant='body1' sx={{ml: 2,mt:-2, fontFamily: "Gilroy", fontWeight: "bold"}}>để trở lại</Typography>
                    </AnimatedGrid>
                    <AnimatedGrid sx={{position: "absolute", right: 0}} height={"100%"} width={"30%"}>
                        <AnimatedGrid width={"100%"} display={"flex"} wrap="nowrap" justifyContent={"right"}>
                            <Typography variant='body1' sx={{fontFamily: "Gilroy", fontWeight: "bold"}}>Sử dụng mũi tên để thay đổi góc nhìn</Typography>
                            <ArrowDownwardIcon sx={{ml:2,border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowDownwardIcon>
                            <ArrowBackIcon sx={{ml:2, border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowBackIcon>
                            <ArrowUpwardIcon sx={{ml:2, border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowUpwardIcon>
                            <ArrowForwardIcon sx={{ml:2, border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowForwardIcon>
                        </AnimatedGrid>
                        <AnimatedGrid width={"100%"} display={"flex"} wrap="nowrap" justifyContent={"right"} sx={{mt:2}}>
                            <Typography variant='body1' textAlign={"right"} sx={{fontFamily: "Gilroy", fontWeight: "bold"}}>Sử dụng chuột để tương tác với giao diện</Typography>
                            <MouseIcon sx={{ml: 2}}></MouseIcon>
                        </AnimatedGrid>
                    </AnimatedGrid>
                </TopInfoMation>
            </Top>
            <Bottom>
                <Typography>Bottom</Typography>
            </Bottom>
        </Container>:null
        )
    );
}
const VehicleShopPage = {
    element: VehicleShop,
    needLogin: true
}

export default  VehicleShopPage
