import React, {useMemo, useState} from 'react';
import styled from 'styled-components';
import useShow from '../hooks/useShow';
import { AnimatedGrid } from '../components/animated-mui';
import { useTranslation } from "react-i18next";
import {animated, config, useSpringRef, useSpring, useChain, useTransition } from '@react-spring/web';
import GarageIcon from '@mui/icons-material/Garage';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Search as SearchIcon } from "@mui/icons-material";
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { GarageCategory, IGarageData } from '../shared/interfaces';
import { AnyAaaaRecord } from 'dns';

const Container = styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/bankSystem/bank_bg.png');
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
`

const Left = styled(AnimatedGrid)`

`

const Right = styled(AnimatedGrid)`

`
function GarageSystem() {
    const {t} = useTranslation('common');
    const [show] = useShow(process.env.NODE_ENV === 'development', 'garageSystem', false, false, false, false)
    const transRef = useSpringRef()
    const allVehicle = useSelector((state:RootState)=>state.garageSystem.vehicle);
    const garageName = useSelector((state:RootState)=>state.garageSystem.garageName);
    const [garageCateGory, setGarageCateGory] = useState<GarageCategory>(2);
    const transitions = useTransition(show, {
        ref: transRef,
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
        config: {...config.molasses, duration: 500}
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

    useChain(show ? [transRef, leftSpringRef, rightSpringRef] : [rightSpringRef, leftSpringRef ,transRef ], show ? 
        [0.0, 0.5, 0.5]:
        [0.5, 0.5, 0.0], 
    1000)

    const [searchText, setSearchText] = useState("");

    const handleSearch = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Handle search logic here
        console.log(`Search for: ${searchText}`);
    };

    const getVehicleStatus = (plate: string) => {
        
        for (const plateVehicle in allVehicle) {
            if (
                plate.toLocaleLowerCase() ===
                allVehicle[plateVehicle].plate.toLocaleLowerCase()
            ) {
                return allVehicle[plateVehicle].inGarage;
            }
        }
    }

    const selectedGroupVehicle = useMemo(() => {
        const vehicleInGroup:IGarageData[] = []
        allVehicle.forEach(e=>{
            const vehicleStatus = getVehicleStatus(e.plate);
            
            if(vehicleStatus === !!garageCateGory ){
                vehicleInGroup.push(e)
            }
        })
        return vehicleInGroup
    }, [garageCateGory, allVehicle])
    
    

    return transitions( (style, show) => (show ?
        <Container container style={{...style}} sx={{p: "2% 3% 2% 3%"}}>
            <Left xs={4} style={{...leftSpring}}>
                <AnimatedGrid height={"10%"} sx={{pb: 5}} display={"flex"} alignItems={"center"}>
                    <Grid display={"flex"} width={"50%"}>
                    <GarageIcon color='primary' sx={{ml: "2%"}}/>
                    <Typography variant='body1' color='primary'  sx={{ml: "2%", fontFamily: "Title", fontWeight: "bold"}}>{garageName}</Typography>
                    </Grid>
                    <Grid width={"50%"}>
                    <TextField sx={{float: "right"}}
                        label="Tìm kiếm phương tiện"
                        variant="outlined"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                </AnimatedGrid>
                <AnimatedGrid height={"60%"} sx={{border: "1px solid white"}}></AnimatedGrid>
            </Left>
            <Right xs={8} sx={{pl: "2%"}} style={{...rightSpring}}>
                <AnimatedGrid height={"10%"} sx={{pb: 5}} display={"flex"} alignItems={"center"}>
                    {garageCateGory === 2 ? (
                        <Grid height={"55%"} width={"4%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            backgroundColor: "rgba(255, 11, 48, 1)",
                            cursor: "pointer",
                            borderRadius: "5px",
                            '&:hover': {
                                backgroundColor: "rgba(255, 11, 48, 1)",
                                transform: "scale(1.1)"
                            },
                            transition: "all  0.3s ease"

                        }}>
                        <DirectionsCarIcon sx={{fontSize: 30}}/>
                        </Grid>
                    ):(
                        <Grid height={"55%"} width={"4%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            backgroundColor: "rgba(255, 11, 48, 0.3)",
                            cursor: "pointer",
                            borderRadius: "5px",
                            '&:hover': {
                                backgroundColor: "rgba(255, 11, 48, 1)",
                                transform: "scale(1.1)"
                            },
                            transition: "all  0.3s ease"

                        }} onClick={() => setGarageCateGory(2)}>
                        <DirectionsCarIcon sx={{fontSize: 30}}/>
                        </Grid>
                    )}
                    {garageCateGory === 1 ? (
                        <Grid height={"55%"} width={"4%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            ml:5,
                            cursor: "pointer",
                            backgroundColor: "rgba(255, 11, 48, 1)",
                            borderRadius: "5px",
                            '&:hover': {
                                backgroundColor: "rgba(255, 11, 48, 1)",
                                transform: "scale(1.1)"
                            },
                            transition: "all  0.3s ease"
                        }}>
                        <LocalParkingIcon sx={{fontSize: 30}}/>
                        </Grid>                        
                    ):(
                        <Grid height={"55%"} width={"4%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            ml:5,
                            cursor: "pointer",
                            backgroundColor: "rgba(255, 11, 48, 0.3)",
                            borderRadius: "5px",
                            '&:hover': {
                                backgroundColor: "rgba(255, 11, 48, 1)",
                                transform: "scale(1.1)"
                            },
                            transition: "all  0.3s ease"
                        }} onClick={() => setGarageCateGory(1)}>
                        <LocalParkingIcon sx={{fontSize: 30}}/>
                        </Grid>   
                    )}
                    {garageCateGory === 0 ? (
                        <Grid height={"55%"} width={"4%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            ml:5,
                            cursor: "pointer",
                            backgroundColor: "rgba(255, 11, 48, 1)",
                            borderRadius: "5px",
                            '&:hover': {
                                backgroundColor: "rgba(255, 11, 48, 1)",
                                transform: "scale(1.1)"
                            },
                            transition: "all  0.3s ease"
                        }}>
                        <DoDisturbIcon sx={{fontSize: 30}}/>
                        </Grid>
                    ):(
                        <Grid height={"55%"} width={"4%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            ml:5,
                            cursor: "pointer",
                            backgroundColor: "rgba(255, 11, 48, 0.3)",
                            borderRadius: "5px",
                            '&:hover': {
                                backgroundColor: "rgba(255, 11, 48, 1)",
                                transform: "scale(1.1)"
                            },
                            transition: "all  0.3s ease"
                        }} onClick={() => setGarageCateGory(0)}>
                        <DoDisturbIcon sx={{fontSize: 30}}/>
                        </Grid>
                    )}

                </AnimatedGrid>
                <AnimatedGrid height={"90%"} sx={{border: "1px solid white"}}>
                    {garageCateGory === 2 ? (
                        <AnimatedGrid width={"100%"} height={"100%"}>
                            {allVehicle.map((i) => (
                                <Grid>{i.name}</Grid>
                            ))}
                        </AnimatedGrid>
                    ):(
                        <AnimatedGrid>
                            {selectedGroupVehicle.map((i) => (
                                <Grid>{i.name}</Grid>
                            ))}
                        </AnimatedGrid>
                    )}
                </AnimatedGrid>
            </Right>
        </Container>:null
        )   
    );
}

const GarageSystemPage = {
    element: GarageSystem,
    needLogin: true
};
export default GarageSystemPage;
