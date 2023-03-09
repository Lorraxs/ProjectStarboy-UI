import { useState, useEffect, useRef, useMemo} from 'react';
import { useSelector } from 'react-redux';
import useShow from '../hooks/useShow';
import { animated, config, useSpring, useChain, useSpringRef, useTransition } from '@react-spring/web';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import MouseIcon from '@mui/icons-material/Mouse';
import PaidIcon from '@mui/icons-material/Paid';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PercentIcon from '@mui/icons-material/Percent';
import ReorderIcon from '@mui/icons-material/Reorder';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import styled from 'styled-components';
import {IVehicleData, IColorVehicle, LIST_VEHICLE_GROUP, IVehicleShop, IBuyDataVehicle, IPerformanceVehicle} from '../shared/interfaces';
import { AnimatedGrid } from '../components/animated-mui';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { cRequest } from '../utils/request';
import { RootState } from '../store'
import { getVehicleGroupByName } from '../shared/utils/func';
import {useTranslation} from "react-i18next";

const request = new cRequest();


const Container= styled(AnimatedGrid)`
    margin: 0 auto;
    ${process.env.NODE_ENV === 'test' ? `background-image: url('/assets/backgrounds/bg_vehicleshop_demo.jpg');` : `background-image: radial-gradient(circle at 50% 50%, rgba(49, 49, 49, 0) 11%, #222222 100%);`}
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
`
const Top = styled(AnimatedGrid)`
    height: 80%;
    padding: 30px 25px 0px 25px;
`

const Bottom = styled(AnimatedGrid)`
    height: 20%;
    padding: 0px 25px 15px 25px;
`
const TopInfoMation = styled(AnimatedGrid)`
    height: 7%;
    position: relative;
`
const NameShopWrapper = styled(Grid)`
    background: linear-gradient( 90deg, transparent 40%, #ffffff);
`

const NameShop = styled(Grid)`
    background-image: linear-gradient( to right, #2b2b2b, rgba(255, 255, 255, 0.0)),url('/assets/vehicleShop/stripes.webp');
    background-position: center;
    background-size: cover;
`

const BrandLogo = styled(animated.img)`
    width: 100%;
    object-fit: fill;
`
const BottomImg = styled(animated.img)`
    width: 70%;
    height: 90%;
    object-fit: fill;
`
const ButtonBuy = styled(AnimatedGrid)`
    width: 100%;
    padding: 3%;
    display: flex;
    justify-content: center;
    background-color: rgba(255, 11, 48, 0.5);
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        transform: scale(1.1);
        background-color: rgba(255, 11, 48, 1);
    };
    transition: all  0.5s ease;
`

const ButtonTestVehicle = styled(AnimatedGrid)`
    width: 100%;
    padding: 1%;
    display: flex;
    justify-content: center;
    background-color: rgba(117, 117, 117, 0.5);
    margin-top: 3%;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        transform: scale(1.1);
        background-color: rgba(117, 117, 117, 1);
    };
    transition: all  0.5s ease;
`

const ColorDialog = styled(AnimatedGrid)`
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    margin-top: 2%;
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
    gap: 2%;
`

const CategoryVehicleScrollBar = styled(AnimatedGrid)`
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    margin-top: 2%;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        width: 2px;
    }
    ::-webkit-scrollbar-thumb
    {
        background-color: #ff0b30;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track
    {
        background-color: transparent;
    }
    gap: 2%;
`

const CategoryVehicleItem = styled(AnimatedGrid)`
    width: 99%;
    height: 18%;
    border-radius: 10px;
    transition: background-color  0.5s ease;
`

const ColorDialogItem = styled(AnimatedGrid)`
    width: 8%;
    height: 45%;
    margin-bottom: 1%;
    &:hover {
        transform: scale(1.1);
    };
    transition: all  0.3s ease;
`
const CategoryIcon = styled(animated.i)`
    width: 100%;
    height: 100%;
    line-height: 0;
    font-size: 3vw;
`
const ButtonBottom = styled(Grid)`
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    };
    transition: all  0.3s ease;
`
const BottomScrollBar = styled(AnimatedGrid)`
    cursor: pointer;
    display: flex;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        height: 0px;
    }
    ::-webkit-scrollbar-thumb
    {
        background-color: #ff0b30;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track
    {
        background-color: transparent;
    }
    gap: 1%;
`

const BottomScrollBarItem = styled(AnimatedGrid)`
    min-width: 19%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all  0.5s ease;
    display: flex;
    flex-wrap: wrap;
`


const VEHICLE_COLOR: IColorVehicle = require("../shared/json/vehicleShop/colorVehicle.json");
const VEHICLE_DATA: IVehicleData = require("../shared/json/vehicleShop/vehicleData.json");

function VehicleShop() {
    const {t} = useTranslation('common');
    const [show] = useShow(false, 'VehicleShop', true, true, true, true)
    const [color1, setcolor1] = useState(-1);
    const [color2, setcolor2] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedItemBottom, setSelectedItemBottom] = useState('')
    const [selectedGroup, setSelectedGroup] = useState( LIST_VEHICLE_GROUP[0]);
    const [selectedVehicle, setSelectedItem] = useState<IVehicleShop>()
    const vehicles = useSelector((state:RootState)=>state.vehicleShop.vehicles)
    const shopIdx = useSelector((state:RootState)=>state.vehicleShop.shopIdx)
    const testPrice = useSelector((state:RootState)=> state.vehicleShop.testPrice)
    const primaryColor = useSelector((state:RootState)=> state.vehicleShop.primaryColor)
    const secondaryColor = useSelector((state:RootState)=> state.vehicleShop.secondaryColor)
    const [performanceVehicle, setPerformanceVehicle] = useState<IPerformanceVehicle>({power: 0, acceleration: 0, handling: 0, topspeed: 0})
    const [data, setData] = useState<IBuyDataVehicle>({ spawncode: '', price: 0, color1: -1, color2: 0, shopIndex: shopIdx});

    const selectedGroupItems = useMemo(() => {
        const itemInGroup:IVehicleShop[] = []
        vehicles.forEach(e=>{
            const itemGroup = getVehicleGroupByName(e.spawncode);
            if(itemGroup?.toLocaleLowerCase() === selectedGroup?.toLocaleLowerCase() ){
                itemInGroup.push(e)
            }
        })
        return itemInGroup
    }, [selectedGroup, vehicles])


    const testDrive = () => {
        request.post('VehicleShop:TestDrive', {shopIndex: shopIdx})
    };

    const handleCategoryBg = (i: string) => {
        setSelectedGroup(i);
        setSelectedCategory(i);
    };

    const handleScrollbarBg = (e: IVehicleShop) => {
        setSelectedItem(e);
        setSelectedItemBottom(e.spawncode);
    };

    useEffect(() => {
        setSelectedItem(undefined)
        setSelectedItemBottom('')
        setcolor1(-1)
        setcolor2(0)
    }, [selectedGroup])

    useEffect(() => {
        setcolor1(-1)
        setcolor2(0)
        setPerformanceVehicle({
            power: vehicleData?.performance.topspeed ?? 0,
            acceleration: vehicleData?.performance.acceleration ?? 0,
            handling: vehicleData?.performance.handling ?? 0,
            topspeed: vehicleData?.performance.topspeed ?? 0,
        })
    }, [selectedVehicle])

    useEffect(() => {
        request.post('VehicleShop:ChangePrimaryColor', color1)
    }, [color1]);

    useEffect(() => {
        request.post('VehicleShop:ChangeSecondaryColor', color2)
    }, [color2]);

    useEffect(() => {
        if(selectedVehicle){
            setData({
                spawncode: selectedVehicle.spawncode,
                price: selectedVehicle.price,
                color1: color1,
                color2: color2,
                shopIndex: shopIdx
            })
            request.post('VehicleShop:UpdateVehicleData', {
                spawncode: selectedVehicle.spawncode,
                price: selectedVehicle.price,
                color1: color1,
                color2: color2,
                shopIndex: shopIdx
            })
        }
    }, [selectedVehicle, color1, color2, shopIdx]);

    useEffect(() => {
        if(show === true){
            const handleKeyCam = (event: KeyboardEvent) => {
                console.log(event.key)
                if (event.key === 'ArrowDown') {
                    request.post('VehicleShop:ChangeCamView', {key: event.key, shopIndex: shopIdx})
                }
                if (event.key === 'ArrowUp') {
                    request.post('VehicleShop:ChangeCamView', {key: event.key, shopIndex: shopIdx})
                }
                if (event.key === 'ArrowLeft') {
                    request.post('VehicleShop:ChangeCamView', {key: event.key, shopIndex: shopIdx})
                }
                if (event.key === 'ArrowRight') {
                    request.post('VehicleShop:ChangeCamView', {key: event.key, shopIndex: shopIdx})
                }
            };
    
            document.addEventListener('keydown', handleKeyCam);
    
            return () => {
                document.removeEventListener('keydown', handleKeyCam);
            };
        }
    }, [show]);

    const vehicleData = useMemo(() => {
        if(selectedVehicle!==undefined){
            return VEHICLE_DATA.find(e=>e.spawncode.toLowerCase() === selectedVehicle.spawncode.toLowerCase())
        }
    }, [selectedVehicle])

    const onSubmit = () =>{
        request.post('VehicleShop:Buy', data)
    }

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
    
    const bottomSpringRef = useSpringRef();
    const bottomSpring = useSpring({
        ref: bottomSpringRef,
        from: { y: 100, opacity: 0 },
        to: { y: show ? 0 : 100, opacity: show ? 1 : 0 },
    })

    const transRef = useSpringRef()
    const transitions = useTransition(show, {
        ref: transRef,
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
        config: {...config.molasses, duration: 500}
    })

    const scrollbarRef = useRef<HTMLDivElement>(null);
    const handleScrollLeft = () => {
        if (scrollbarRef.current) {
            scrollbarRef.current?.scrollBy({ left: -1000, behavior: 'smooth' });
        }
    };
    
    const handleScrollRight = () => {
        if (scrollbarRef.current) {
            scrollbarRef.current?.scrollBy({ left: 1000, behavior: 'smooth' });
        }
    };

    
    useChain(show ? [transRef, leftSpringRef, rightSpringRef, bottomSpringRef] : [ bottomSpringRef, rightSpringRef, leftSpringRef, transRef ], show ? 
        [0.0, 0.5, 0.5, 0.5]:
        [0.0, 0.0, 0.0, 0.5], 
    1000)
    
    return transitions ((style, show) => (show ? 
        <Container style={{...style}}>
            <Top>
                <TopInfoMation display={"flex"} wrap="nowrap">
                    <AnimatedGrid height={"100%"} width={"30%"} display={"flex"} wrap="nowrap" alignItems={"center"}>
                        <Typography variant='h6' color={"primary"} sx={{fontFamily: "Title", fontWeight: "bold"}}>ESC</Typography>
                        <Typography variant='body1' sx={{ml: 2,mt:-2, fontFamily: "Gilroy", fontWeight: "bold"}}>{t('CLOSE')}</Typography>
                    </AnimatedGrid>
                    <AnimatedGrid sx={{position: "absolute", right: 0}} height={"100%"} width={"30%"}>
                        <AnimatedGrid width={"100%"} display={"flex"} wrap="nowrap" justifyContent={"right"}>
                            <Typography variant='body1' sx={{fontFamily: "Gilroy", fontWeight: "bold"}}>{t('USE_ARROW_TO_ROTATE')}</Typography>
                            <ArrowDownwardIcon sx={{ml:2,border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowDownwardIcon>
                            <ArrowBackIcon sx={{ml:2, border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowBackIcon>
                            <ArrowUpwardIcon sx={{ml:2, border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowUpwardIcon>
                            <ArrowForwardIcon sx={{ml:2, border:"1px solid #ff0b30", borderRadius: "5px"}}></ArrowForwardIcon>
                        </AnimatedGrid>
                        <AnimatedGrid width={"100%"} display={"flex"} wrap="nowrap" justifyContent={"right"} sx={{mt:2}}>
                            <Typography variant='body1' textAlign={"right"} sx={{fontFamily: "Gilroy", fontWeight: "bold"}}>{t('USE_MOUSE_TO_INTERACTION')}</Typography>
                            <MouseIcon sx={{ml: 2}}></MouseIcon>
                        </AnimatedGrid>
                    </AnimatedGrid>
                </TopInfoMation>
                <AnimatedGrid width={"100%"} height={"92%"} display={"flex"} wrap="nowrap">
                    <AnimatedGrid height={"100%"} width={"20%"} style={{...leftSpring}}>
                        <NameShopWrapper width={"100%"} height={"10%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <NameShop height={"95%"} width={"99%"} display={"flex"} wrap="nowrap" alignItems={"center"}>
                                <Typography variant='h4' sx={{fontFamily:"Title", fontWeight: "bold", ml:"2%"}}>CHILL</Typography>
                                <Typography variant='h4' sx={{mt: -2,fontFamily:"Gilroy"}}>DILLER</Typography>
                                <Grid display={"flex"} flexDirection={"column"} sx={{ml: "5%", mt: "-2%"}} justifyContent={"center"}>
                                    <Typography textAlign={"center"}>{t('SERVICE')}</Typography>
                                    <Grid display={"flex"} wrap="nowrap" justifyContent={"center"}>
                                        <StarIcon sx={{color: "yellow"}}></StarIcon>
                                        <StarIcon sx={{color: "yellow"}}></StarIcon>
                                        <StarIcon sx={{color: "yellow"}}></StarIcon>
                                    </Grid>
                                </Grid>
                            </NameShop>
                        </NameShopWrapper>
                        <Grid height={"15%"} width={"100%"}  sx={{}}>
                            <Typography variant='body1' sx={{mt:"4%", fontFamily:"Gilroy"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero dolorum commodi quod expedita odit sequi aut.</Typography>
                        </Grid>
                        <Grid height={"35%"} width={"100%"}sx={{ mb: "10%"}}>
                            <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"}>
                                <PaidIcon></PaidIcon>
                                <Typography sx={{pl:"2%"}}>{t('BUY_AND_DRIVE_TEST')}</Typography>
                                <hr style={{width: "55%"}}/>
                            </Grid>
                            {selectedVehicle === undefined || selectedVehicle === null ? (
                            <Grid width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <RemoveShoppingCartIcon sx={{fontSize: "100px", color: "rgba(173, 173, 173, 0.5)"}}/>
                            </Grid>
                        ):(
                            <Grid width={"100%"} height={"100%"}>
                                <Grid height={"10%"} width={"100%"} sx={{mt: "2%", mb: "2%"}}>
                                <Typography variant='h6' color={"#28ad8d"} sx={{fontFamily: "Title", fontWeight: "bold"}}>{selectedVehicle.price} $</Typography>
                                </Grid>
                                <Grid height={"20%"} width={"100%"} display={"flex"} wrap="nowrap">
                                    <Grid height={"100%"} width={"10%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                        <BrandLogo src={`${vehicleData?.brandLogo}`}></BrandLogo>
                                    </Grid>
                                    <Grid width={"90%"} display={"flex"} alignItems={"center"} sx={{ml: "2%"}}>
                                        <Typography variant='body1' color={"primary"} sx={{wordBreak: "break-all", fontWeight: "bold", fontFamily:"Gilroy", fontSize: "35px"}}>{vehicleData?.name}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid height={"25%"} width={"100%"} sx={{m: "2%"}}>
                                    <Typography variant='body1' sx={{fontSize: "14px", fontFamily:"Gilroy"}}>{vehicleData?.description}</Typography>
                                </Grid>
                                <Grid height={"20%"} width={"100%"} sx={{mt: "2%"}}>
                                <ButtonBuy onClick={onSubmit}>
                                    <Typography variant='body1' sx={{fontFamily:"Gilroy", fontWeight: "bold"}} >{t('BUY')}</Typography>
                                </ButtonBuy>
                                <ButtonTestVehicle display={"flex"} wrap='nowrap' onClick={testDrive}>
                                    <Typography  variant='body1' sx={{fontFamily:"Gilroy", fontWeight: "bold"}} >{t('TEST_DRIVE')}</Typography>
                                    <Typography  variant='body1' sx={{ml: "2%",fontFamily:"Gilroy", fontWeight: "bold", color:"#28ad8d"}}>{testPrice}$</Typography>
                                </ButtonTestVehicle>
                            </Grid>
                            </Grid>
                        )}
                        </Grid>
                        <Grid height={"25%"} width={"100%"}>
                            <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"}>
                                <FormatPaintIcon></FormatPaintIcon>
                                <Typography sx={{pl:"2%"}}>{t('COLOR')}</Typography>
                                <hr style={{width: "70%"}}/>
                            </Grid>
                            <Grid width={"100%"} height={"65%"}>
                                    <Typography sx={{mt: "2%"}}>{t('PRIMARY_COLOR')}</Typography>
                                    <ColorDialog height={"50%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                        {VEHICLE_COLOR.map((i) => (
                                            <ColorDialogItem sx={{backgroundColor: i.Hex}} onClick = {() => setcolor1(parseInt(i.ID))}>
                                            </ColorDialogItem>
                                        ))}
                                    </ColorDialog>
                                    <Typography sx={{mt: "2%"}}>{t('SECONDARY_COLOR')}</Typography>
                                    <ColorDialog height={"50%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                        {VEHICLE_COLOR.map((i) => (
                                            <ColorDialogItem sx={{backgroundColor: i.Hex}} onClick = {() => setcolor2(parseInt(i.ID) + 1)}>
                                            </ColorDialogItem>
                                        ))}
                                    </ColorDialog>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                    <AnimatedGrid height={"100%"} width={"60%"}></AnimatedGrid>
                    <AnimatedGrid height={"100%"} width={"20%"} style={{...rightSpring}}>
                        <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"}>
                            <DirectionsCarIcon></DirectionsCarIcon>
                            <Typography sx={{pl:"2%"}}>{t('CATEGORY')}</Typography>
                            <hr style={{width: "70%"}}/>
                        </Grid>
                        <Grid width={"100%"} height={"45%"}>
                            <CategoryVehicleScrollBar height={"100%"} width={"100%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                {LIST_VEHICLE_GROUP.map((i) => (
                                    <CategoryVehicleItem display={"flex"} alignItems={"center"} onClick={ ()=> handleCategoryBg(i)}
                                    sx ={{backgroundColor: selectedCategory === i ? "#FF0B30":"rgba(128, 128, 128,0.5)"}} >
                                        <Grid width={"15%"} height={"100%"} sx={{ml: "2%", mr: "2%"}}>
                                            <CategoryIcon className={`icon-${i.toLowerCase()}`}/>
                                        </Grid>
                                        <Typography variant='body1'  sx={{fontWeight: "bold", fontFamily: "Gilroy", textTransform: "uppercase"}}>{t(i)}</Typography>
                                    </CategoryVehicleItem>
                                ))}
                            </CategoryVehicleScrollBar>
                        </Grid>
                        <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"}>
                            <PercentIcon></PercentIcon>
                            <Typography sx={{pl:"2%"}}>{t('SPEC')}</Typography>
                            <hr style={{width: "65%"}}/>
                        </Grid>
                        <Grid display={"flex"} height={"30%"} width={"100%"} sx={{gap: "2%", flexWrap: "wrap", mt: "-4%", ml: "-3%"}}>
                            <Grid container width={"49%"} height={"50%"} justifyContent={"center"} alignItems={'center'} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", strokeLinecap:"round", color: "#FF0B30"}}  variant='determinate' value={performanceVehicle.power} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30", bottom: 0, position: 'absolute'}}>
                                    {t('POWER')}
                                </Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", fontWeight: "bold"}}>{performanceVehicle.power}</Typography>
                            </Grid>
                            <Grid container width={"49%"} height={"50%"} justifyContent={"center"} alignItems={'center'} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", strokeLinecap:"round", color: "#FF0B30"}}  variant='determinate' value={performanceVehicle.acceleration} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30", bottom: 0, position: 'absolute'}}>
                                    {t('ACCELERATION')}
                                </Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", fontWeight: "bold"}}>{performanceVehicle.acceleration}</Typography>
                            </Grid>
                            <Grid container width={"49%"} height={"50%"} justifyContent={"center"} alignItems={'center'} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", strokeLinecap:"round", color: "#FF0B30"}}  variant='determinate' value={performanceVehicle.handling} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30", bottom: 0, position: 'absolute'}}>
                                    {t('HANDLING')}
                                </Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", fontWeight: "bold"}}>{performanceVehicle.handling}</Typography>
                            </Grid>
                            <Grid container width={"49%"} height={"50%"} justifyContent={"center"} alignItems={'center'} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", position:"absolute", strokeLinecap:"round", color: "#FF0B30"}}  variant='determinate' value={performanceVehicle.acceleration} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30", bottom: 0, position: 'absolute'}}>
                                    {t('TOPSPEED')}
                                </Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", fontWeight: "bold"}}>{performanceVehicle.acceleration}</Typography>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                </AnimatedGrid>
            </Top>
            <Bottom style={{...bottomSpring}}>
                <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"} sx={{mt: "-10px", mb: "10px"}}>
                    <ReorderIcon></ReorderIcon>
                    <Typography sx={{pl:"5px"}}>{t('VEHICLE_LIST')}</Typography>
                    <hr style={{width: "91%"}}/>
                </Grid>
                
                <AnimatedGrid width={"100%"} height={"90%"} display={"flex"} wrap="nowrap" sx={{gap: "5px", mt:"5px"}}>
                    {selectedGroupItems.length === 0 ? (
                        <Grid width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <RemoveShoppingCartIcon sx={{fontSize: "100px", color: "rgba(173, 173, 173, 0.5)"}}/>
                        </Grid>
                    ):(
                        <Grid width={"100%"} height={"100%"}  display={"flex"} wrap="nowrap" sx={{gap: "5px", mt:"5px"}}>
                            <ButtonBottom width={"3%"} height={"100%"} sx={{backgroundColor: "rgba(82, 82, 82, 0.6)"}} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={handleScrollLeft}>
                                <ArrowBackIcon></ArrowBackIcon>
                            </ButtonBottom>
                            <BottomScrollBar sx={{width: "calc(94% - 10px)", height: "100%", overflowX: 'scroll', overflowY: 'hidden'}} ref={scrollbarRef}>
                                {selectedGroupItems.map((e, i) => (
                                    <BottomScrollBarItem   sx={{backgroundColor: selectedItemBottom === e.spawncode ? "#FF0B30" : "rgba(35, 35, 35, 0.5)"}} onClick={()=>handleScrollbarBg(e)}>
                                        <Grid width={"98%"} height={"20%"} sx={{ml: "2%"}}>
                                            <Typography variant='h6' sx={{wordBreak: "break-all", textTransform: "uppercase", fontFamily: "Gilroy", color: selectedItemBottom === e.spawncode ? "#ffffff":"#ff0b30"}}>{VEHICLE_DATA.find(vehicle => vehicle.spawncode === e.spawncode)?.name}</Typography>
                                        </Grid>
                                        <Grid width={"100%"} height={"70%"} sx={{ml: "2%"}} display={"flex"} justifyContent={"center"}>
                                            <BottomImg src={`https://docs.fivem.net/vehicles/${e.spawncode.toLowerCase()}.webp`}></BottomImg>
                                        </Grid>
                                        <Grid width={"100%"} height={"10%"} sx={{ml: "2%", mt: "-4%"}}>
                                            <Typography color={"secondary"} variant='body1' sx={{wordBreak: "break-all", textTransform: "uppercase", fontFamily: "Gilroy", fontWeight: "bold"}}>{e.price} $</Typography>
                                        </Grid>
                                    </BottomScrollBarItem>
                                ))}
                            </BottomScrollBar>
                            <ButtonBottom width={"3%"} height={"100%"} sx={{backgroundColor: "rgba(82, 82, 82, 0.6)"}} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={handleScrollRight}>
                                <ArrowForwardIcon></ArrowForwardIcon>
                            </ButtonBottom>
                        </Grid>
                    )}
                </AnimatedGrid>
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