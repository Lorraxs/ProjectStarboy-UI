import React, {useMemo, useState} from 'react';
import styled from 'styled-components';
import useShow from '../hooks/useShow';
import { AnimatedGrid } from '../components/animated-mui';
import { useTranslation } from "react-i18next";
import {config, useSpringRef, useSpring, useChain, useTransition } from '@react-spring/web';
import GarageIcon from '@mui/icons-material/Garage';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NoTransferIcon from '@mui/icons-material/NoTransfer';
import CarRentalIcon from '@mui/icons-material/CarRental';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Grid, Typography, Box, Button , LinearProgress} from '@mui/material';
import { GarageCategory, IGarageData } from '../shared/interfaces';
import { cRequest } from '../utils/request';
const request = new cRequest();

const Container = styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/backgrounds/garage_bg.png');
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

const GarageListScrollBar = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        width: 1px;
    }
    ::-webkit-scrollbar-thumb
    {
        background-color: #ffffff;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track
    {
        background-color: transparent;
    }
    gap: 10px;
    align-content: flex-start;
`

const ScrollBarItem = styled(AnimatedGrid)`
    cursor: pointer;
    &:hover{
        background-color: #ff0b30;
    }
    transition: background-color  0.5s ease;
    width: calc(25% - 10px);
    height: calc(25% - 10px);
    border-radius: 10px;
`
function GarageSystem() {
    const {t} = useTranslation('common');
    const [show] = useShow(false, 'garageSystem', false, false, false, false)
    const transRef = useSpringRef()
    const allVehicle = useSelector((state:RootState)=>state.garageSystem.vehicle);
    const garageName = useSelector((state:RootState)=>state.garageSystem.garageName);
    const returnPrice = useSelector((state:RootState)=>state.garageSystem.returnPrice);
    const [garageCateGory, setGarageCateGory] = useState<GarageCategory>(2);
    const [selectedVehicle, setSelectedVehicle] = useState<IGarageData>()
    const totalVehicle = allVehicle.length;
    const { inGarageCount, outGarageCount } = allVehicle.reduce(
        (accumulator, currentValue) => {
            if (currentValue.inGarage) {
                accumulator.inGarageCount++;
            } else {
                accumulator.outGarageCount++;
            }
            return accumulator;
            },
            { inGarageCount: 0, outGarageCount: 0 }
    );

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

    const onSubmitSpawn = () =>{
        request.post('GarageSystem:Spawn', selectedVehicle)
    }

    const onSubmitReturn = () =>{
        request.post('GarageSystem:Return', selectedVehicle)
    }

    const onSubmitPayImpound = () =>{
        request.post('GarageSystem:PayImpound', selectedVehicle)
    }

    useChain(show ? [transRef, leftSpringRef, rightSpringRef] : [rightSpringRef, leftSpringRef ,transRef ], show ? 
        [0.0, 0.5, 0.5]:
        [0.5, 0.5, 0.0], 
    1000)

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
                    <Grid display={"flex"} width={"100%"}>
                    <GarageIcon  sx={{fontSize: 30}} color='primary'/>
                    <Typography variant='h5' color='primary'  sx={{ml: "2%", fontFamily: "Title", fontWeight: "bold"}}>{garageName}</Typography>
                    </Grid>

                </AnimatedGrid>
                <AnimatedGrid height={"60%"} sx={{
                    background: "linear-gradient( 315deg, rgba(255, 11, 48,0.1) 40%, rgba(255, 11, 48, 0.5) 90%)",
                    borderRadius: "20px",
                    p: "5% 4% 5% 4%"
                }}>
                    {selectedVehicle ? (
                        <Grid width={"100%"} height={"100%"} sx={{}}>
                            <Grid width={"100%"} height={"10%"}sx={{mb: 4}}>
                                <Typography variant='h5' sx={{fontWeight: "bold", fontFamily: "Title", mb: 1}}>{selectedVehicle.displayName}</Typography>
                                <Typography variant='body1' sx={{fontFamily: "Gilroy", textTransform: "uppercase"}}>{selectedVehicle.plate}</Typography>
                            </Grid>
                            <Grid width={"100%"} height={"15%"}  display={"flex"} justifyContent={"center"} sx={{pt: 2}}>
                            {selectedVehicle.impound ? (
                                <Grid display={"flex"}>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} disabled>{t('spawn_vehicle')}</Button>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} disabled>{t('return_vehicle')}<br></br>{returnPrice}$</Button>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} onClick ={onSubmitPayImpound}>{t('pay_impound')}</Button>
                                </Grid>
                            ) : selectedVehicle.inGarage ? (
                                <Grid display={"flex"}>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} onClick ={onSubmitSpawn}>{t('spawn_vehicle')}</Button>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} disabled>{t('return_vehicle')}<br></br>{returnPrice}$</Button>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} disabled>{t('pay_impound')}</Button>
                                </Grid>
                            ) : (
                                <Grid display={"flex"}>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} disabled>{t('spawn_vehicle')}</Button>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} onClick ={onSubmitReturn}>{t('return_vehicle')}<br></br>{returnPrice}$</Button>
                                    <Button variant='contained' size="large" sx={{mr: 2, fontWeight: "bold"}} disabled>{t('pay_impound')}</Button>
                                </Grid>
                            )}
                            </Grid>
                            <Grid height={"75%"} sx={{ pt: 5}}>
                                <Typography variant='body1' sx={{fontWeight: "bold", fontFamily: "Gilroy", textTransform: "uppercase"}}>{t('vehicle_info')}</Typography>
                                <Grid sx={{mt: 5}}>
                                    <LinearProgress variant="determinate" value={(selectedVehicle.properties.health)/10} sx={{mb: 2, height:"20px"}}/>
                                    <Grid display={"flex"} justifyContent={"space-between"}>
                                        <Typography>{t('vehicle_health')}</Typography>
                                        <Typography>{((selectedVehicle.properties.health)/10).toFixed(2)} %</Typography>
                                    </Grid>
                                </Grid>
                                <Grid sx={{mt: 5}}>
                                    <LinearProgress variant="determinate" value={(selectedVehicle.properties.fuelLevel)/10} sx={{mb: 2,height:"20px"}}/>
                                    <Grid display={"flex"} justifyContent={"space-between"}>
                                        <Typography>{t('vehicle_fuel')}</Typography>
                                        <Typography>{((selectedVehicle.properties.fuelLevel)/10).toFixed(2)} %</Typography>
                                    </Grid>
                                    
                                </Grid>
                                <Grid sx={{mt: 5}}>
                                    <LinearProgress variant="determinate" value={(selectedVehicle.properties.dirtLevel)/14 * 100} sx={{mb: 2, height:"20px"}}/>
                                    <Grid display={"flex"} justifyContent={"space-between"}>
                                        <Typography>{t('vehicle_dirtlevel')}</Typography>
                                        <Typography>{((selectedVehicle.properties.dirtLevel)/14 * 100).toFixed(2)} %</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    ):(
                        <Grid width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <NoTransferIcon sx={{fontSize: 70, color: "rgba(255, 255, 255, 0.4)"}}></NoTransferIcon>
                            <Typography variant='body1' sx={{fontSize: 30, color: "rgba(255, 255, 255, 0.4)"}}>{t('noinfo_garage')}</Typography>
                        </Grid>
                    )}
                </AnimatedGrid>
                <AnimatedGrid height={"30%"} sx={{pt: "2%"}}>
                    <Grid height={"50%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                        borderRadius: "10px",
                        backgroundColor: "rgba(98, 205, 255, 0.2)"
                    }}>
                        <CarRentalIcon sx={{fontSize: 45}}></CarRentalIcon>
                        <Typography variant='body1' sx={{fontWeight: "bold", fontFamily: "Gilroy", textTransform: "uppercase"}}>{t('total_car')}</Typography>
                        <Grid  width={"10%"} height={"25%"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                            ml: 2, 
                            backgroundColor: "rgba(98, 205, 255, 0.7)",
                            borderRadius: "40px"
                        }}>
                            <Typography variant='body1' sx={{fontWeight: "bold"}}>{totalVehicle}</Typography>
                        </Grid>
                    </Grid>
                    <Grid height={"50%"}  sx={{ pt: "2%", gap: "10px"}} display={"flex"}>
                        <Grid display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            width: "calc(50% - 5px)", 
                            borderRadius: "10px",
                            backgroundColor: "rgba(181, 241, 204, 0.2)"
                        }}>
                            <StarBorderIcon sx={{fontSize: 45}}></StarBorderIcon>
                            <Typography variant='body1' sx={{fontWeight: "bold", fontFamily: "Gilroy", textTransform: "uppercase"}}>{t('total_ingarage')}</Typography>
                            <Grid  width={"20%"} height={"25%"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                                ml: 2, 
                                backgroundColor: "rgba(181, 241, 204, 0.7)",
                                borderRadius: "40px"
                            }}>
                                <Typography variant='body1' sx={{fontWeight: "bold"}}>{inGarageCount}</Typography>
                            </Grid>
                        </Grid>
                        <Grid display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                            width: "calc(50% - 5px)", 
                            borderRadius: "10px",
                            backgroundColor: "rgba(255, 11, 48, 0.2)"
                        }}>
                            <StarBorderIcon sx={{fontSize: 45}}></StarBorderIcon>
                            <Typography variant='body1' sx={{fontWeight: "bold", fontFamily: "Gilroy", textTransform: "uppercase"}}>{t('total_outgarage')}</Typography>
                            <Grid  width={"20%"} height={"25%"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                                ml: 2, 
                                backgroundColor: "rgba(255, 11, 48, 1)",
                                borderRadius: "40px"
                            }}>
                                <Typography variant='body1' sx={{fontWeight: "bold"}}>{outGarageCount}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </AnimatedGrid>
            </Left>
            <Right width={"100%"} xs={8} sx={{pl: "2%"}} style={{...rightSpring}}>
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
                <AnimatedGrid height={"90%"} width={"100%"}>
                    {garageCateGory === 2 ? (
                        <GarageListScrollBar height={"100%"}  sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                            {allVehicle.map((i) => (
                                <ScrollBarItem onClick={() => setSelectedVehicle(i)} sx={{
                                    backgroundColor: selectedVehicle?.plate === i.plate ? "rgba(255, 11, 48, 1)" : "rgba(255, 11, 48, 0.2)"
                                }}>
                                    <Grid height={"70%"} sx={{p: 6}}>
                                        <img width={"100%"} height={"100%"} src={`https://docs.fivem.net/vehicles/${i.name.toLowerCase()}.webp`} alt="" 
                                        style={{
                                            objectFit: "contain",

                                        }}/>
                                    </Grid>
                                    <Grid height={"30%"}>
                                        <Typography variant='h6' sx={{textAlign: "center", fontWeight: "bold", fontFamily: "Gilroy"}}>{i.displayName}</Typography>
                                        <Typography variant='body1' sx={{textAlign: "center", fontFamily: "Gilroy", textTransform: "uppercase"}}>{i.plate}</Typography>
                                    </Grid>
                                </ScrollBarItem>
                            ))}
                        </GarageListScrollBar>
                    ):(
                        <GarageListScrollBar height={"100%"}  sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                            {selectedGroupVehicle.map((i) => (
                                <ScrollBarItem onClick={() => setSelectedVehicle(i)} sx={{
                                    backgroundColor: selectedVehicle?.plate === i.plate ? "rgba(255, 11, 48, 1)" : "rgba(255, 11, 48, 0.2)"
                                }}>
                                    <Grid height={"70%"} sx={{p: 6}}>
                                        <img width={"100%"} height={"100%"} src={`https://docs.fivem.net/vehicles/${i.name.toLowerCase()}.webp`} alt="" 
                                        style={{
                                            objectFit: "contain",

                                        }}/>
                                    </Grid>
                                    <Grid height={"30%"}>
                                        <Typography variant='h6' sx={{textAlign: "center", fontWeight: "bold", fontFamily: "Gilroy"}}>{i.displayName}</Typography>
                                        <Typography variant='body1' sx={{textAlign: "center", fontFamily: "Gilroy", textTransform: "uppercase"}}>{i.plate}</Typography>
                                    </Grid>
                                </ScrollBarItem>
                            ))}
                        </GarageListScrollBar>
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
