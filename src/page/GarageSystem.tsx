import React from 'react';
import styled from 'styled-components';
import useShow from '../hooks/useShow';
import { AnimatedGrid } from '../components/animated-mui';

const Container = styled(AnimatedGrid)`
    margin: 0 auto;
    // background-image: url('/assets/bankSystem/bank_bg.png');
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
`
function GarageSystem() {
    const [show] = useShow(process.env.NODE_ENV === 'development', 'bankSystem', false, false, false, false)
    
    return (
        <Container>
            
        </Container>
    );
}

const GarageSystemPage = {
    element: GarageSystem,
    needLogin: true
};
export default GarageSystemPage;
