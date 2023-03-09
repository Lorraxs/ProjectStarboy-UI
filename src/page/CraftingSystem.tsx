import useShow from '../hooks/useShow';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AnimatedGrid } from '../components/animated-mui';
import { config, useSpring, useChain, useSpringRef, useTransition } from '@react-spring/web';
import styled from 'styled-components';
import { cRequest } from '../utils/request';
import {useTranslation} from "react-i18next";
import { ICraftingDefaultData } from '../shared/interfaces';
const request = new cRequest();

const Container= styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/backgrounds/craftingSystem_bg.png');
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
    padding: 3%;
`

const Header = styled(AnimatedGrid)`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;

`

function CraftingSystem() {
    const [show] = useShow(false, 'cratingSystem', false, false, false, false)
    // const CRAFT_DATA: ICraftingDefaultData = require("../shared/json/craftingSystem/craftingData.json")
    const playerInventory = useSelector((state:RootState)=>state.player.inventory)
    
    const topSpringRef = useSpringRef();
    const topSpring = useSpring({
        ref: topSpringRef,
        from: { y: -100, opacity: 0 },
        to: { y: show ? 0 : -100, opacity: show ? 1 : 0 },
    })
    const leftSpringRef = useSpringRef();
    const leftSpring = useSpring({
        ref: leftSpringRef,
        from: { x: -100, opacity: 0 },
        to: { x: show ? 0 : -100, opacity: show ? 1 : 0 },
    })

    const rightSpringRef = useSpringRef();
    const rightSpring = useSpring({
        ref: rightSpringRef,
        from: { x: 100, opacity: 0 },
        to: { x: show ? 0 : 100, opacity: show ? 1 : 0 },
    })
    

    const transRef = useSpringRef()
    const transitions = useTransition(show, {
        ref: transRef,
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
        config: {...config.molasses, duration: 500}
    })

    useChain(show ? [transRef, topSpringRef, leftSpringRef, rightSpringRef] : [rightSpringRef, leftSpringRef ,topSpringRef, transRef ], show ? 
        [0.0, 0.5, 0.5, 0.5]:
        [0.5, 0.5, 0.0, 0.5], 
    1000)
    
    return transitions( (style, show) => (show ? 
        <Container style={{...style}}>
            <Header  style={{...topSpring}}>
                <AnimatedGrid container width={"95%"}>
                    <AnimatedGrid xs={6} item>1</AnimatedGrid>
                    <AnimatedGrid xs={6} item>2</AnimatedGrid>
                </AnimatedGrid>
                
            </Header>
        </Container>:null
        ));
}


const CraftingSystemPage = {
    element: CraftingSystem,
    needLogin: true
};
export default CraftingSystemPage