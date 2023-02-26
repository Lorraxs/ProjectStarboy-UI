import useShow from "../hooks/useShow";
import {config, useSpringRef, useChain, useTransition } from '@react-spring/web';
import styled from "styled-components";
import { AnimatedGrid } from "../components/animated-mui";

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

function BankSystem() {
    const [show] = useShow(process.env.NODE_ENV === 'development', 'HUD', false, false, false, false)
    
    const transRef = useSpringRef()
    const transitions = useTransition(show, {
        ref: transRef,
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
        config: {...config.molasses, duration: 500}
    })

    useChain(show ? [transRef] : [transRef ], show ? 
        [0.0]:
        [0.5], 
    1000)

    return transitions((style, show) => (show ? 
        <Container style={{...style}}>
            
        </Container>:null
        )
    );
}

const BankSystemPage = {
    element: BankSystem,
    needLogin: true
};
export default BankSystemPage

