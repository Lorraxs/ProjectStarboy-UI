import useShow from "../hooks/useShow";
import { config, useChain, useSpringRef, useTransition } from "@react-spring/web";
import { AnimatedGrid } from "../components/animated-mui";
import styled from "styled-components";

const Container= styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/backgrounds/deathscreen.png');
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
`

function DeathScreen() {
    const [show] = useShow(false, 'GroceryStore', true, true, true, false)
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
        [0.0], 
    1000)
    return transitions((style, show) => (show ? 
        <Container style={{...style}}>

        </Container>: null
    ));
}

const DeathScreenPage = {
    element: DeathScreen,
    needLogin: true
}

export default  DeathScreenPage