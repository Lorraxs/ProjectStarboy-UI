import { useState, useEffect, useRef} from 'react';
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
import styled from 'styled-components';
import { DefaultVehicleColor, VehicleListOnCategory, EVehicleShopCategorySubTittle, VehicleShopCategory, DefaultVehicleShopInfomation, TopSpeedServer} from '../shared/interfaces';
import { AnimatedGrid } from '../components/animated-mui';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { cRequest } from '../utils/request';
const request = new cRequest();


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
const CategoryIcon = styled(animated.img)`
    width: 100%;
    height: 100%;
    object-fit: fill;
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

function VehicleShop() {
    const [show] = useShow(false, 'VehicleShop', true, true, true, false)
    const [color1, setcolor1] = useState(-1);
    const [color2, setcolor2] = useState(0);
    const [menuList, setMenuList] = useState("Sedans");
    const selectedList = VehicleListOnCategory[menuList as keyof typeof VehicleListOnCategory];
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState( selectedList[0]);
    const priceVehicle = DefaultVehicleShopInfomation[selectedVehicle].price
    const typeVehicle = DefaultVehicleShopInfomation[selectedVehicle].type

    const handleClickCategory = (i: string) => {
        setMenuList(i);
        setSelectedCategory(i);
    };

    const testDrive = () => {
        request.post('VehicleShop:TestDrive')
    };

    const callBackServerData = {
        modelname: selectedVehicle,
        color1: color1,
        color2: color2,
        price : priceVehicle,
    }
    
    const onSubmit = () => {
        request.post('VehicleShop:Buy', callBackServerData)
    }

    useEffect(() => {
        request.post('VehicleShop:ChangePrimaryColor', color1)
    }, [color1]);

    useEffect(() => {
        request.post('VehicleShop:ChangeSecondaryColor', color2)
    }, [color2]);

    useEffect(() => {
        request.post('VehicleShop:ViewCar', selectedVehicle, typeVehicle)
    }, [selectedVehicle, typeVehicle]);

    useEffect(() => {
        setSelectedVehicle(selectedList[0])
    }, [selectedList]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') {
                request.post('VehicleShop:ChangeCamView', event.key)
            }
            if (event.key === 'ArrowUp') {
                request.post('VehicleShop:ChangeCamView', event.key)
            }
            if (event.key === 'ArrowLeft') {
                request.post('VehicleShop:ChangeCamView', event.key)
            }
            if (event.key === 'ArrowRight') {
                request.post('VehicleShop:ChangeCamView', event.key)
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
        [0.5, 0.5, 0.5, 0.0], 
    1000)
    
    return transitions ((style, show) => (show ? 
        <Container style={{...style}}>
            <Top>
                <TopInfoMation display={"flex"} wrap="nowrap">
                    <AnimatedGrid height={"100%"} width={"30%"} display={"flex"} wrap="nowrap" alignItems={"center"}>
                        <Typography variant='h6' color={"primary"} sx={{fontFamily: "Title", fontWeight: "bold"}}>ESC</Typography>
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
                <AnimatedGrid width={"100%"} height={"92%"} display={"flex"} wrap="nowrap">
                    <AnimatedGrid height={"100%"} width={"20%"} style={{...leftSpring}}>
                        <NameShopWrapper width={"100%"} height={"10%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <NameShop height={"95%"} width={"99%"} display={"flex"} wrap="nowrap" alignItems={"center"}>
                                <Typography variant='h4' sx={{fontFamily:"Title", fontWeight: "bold", ml:"2%"}}>CHILL</Typography>
                                <Typography variant='h4' sx={{mt: -2,fontFamily:"Gilroy"}}>DILLER</Typography>
                                <Grid display={"flex"} flexDirection={"column"} sx={{ml: "5%", mt: "-2%"}} justifyContent={"center"}>
                                    <Typography textAlign={"center"}>Dịch vụ</Typography>
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
                                <Typography sx={{pl:"2%"}}>Mua & Chạy thử</Typography>
                                <hr style={{width: "55%"}}/>
                            </Grid>
                            <Grid height={"10%"} width={"100%"} sx={{mt: "2%", mb: "2%"}}>
                                <Typography variant='h6' color={"#28ad8d"} sx={{fontFamily: "Title", fontWeight: "bold"}}>{DefaultVehicleShopInfomation[selectedVehicle].price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                            </Grid>
                            <Grid height={"20%"} width={"100%"} display={"flex"} wrap="nowrap">
                                <Grid height={"100%"} width={"10%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                    <BrandLogo src={`./assets/vehicleShop/brand_logo/${DefaultVehicleShopInfomation[selectedVehicle].brand}.png`}></BrandLogo>
                                </Grid>
                                <Grid width={"90%"} display={"flex"} alignItems={"center"} sx={{ml: "2%"}}>
                                    <Typography variant='body1' color={"primary"} sx={{wordBreak: "break-all", fontWeight: "bold", fontFamily:"Gilroy", fontSize: "30px"}}>{DefaultVehicleShopInfomation[selectedVehicle].title}</Typography>
                                </Grid>
                            </Grid>
                            <Grid height={"25%"} width={"100%"} sx={{m: "2%"}}>
                                <Typography variant='body1' sx={{fontSize: "14px", fontFamily:"Gilroy"}}>{DefaultVehicleShopInfomation[selectedVehicle].description}</Typography>
                            </Grid>
                            <Grid height={"20%"} width={"100%"} sx={{mt: "2%"}}>
                                <ButtonBuy onClick={onSubmit}>
                                    <Typography variant='body1' sx={{fontFamily:"Gilroy", fontWeight: "bold"}}>Mua chiếc này</Typography>
                                </ButtonBuy>
                                <ButtonTestVehicle display={"flex"} wrap='nowrap' onClick={testDrive}>
                                    <Typography  variant='body1' sx={{fontFamily:"Gilroy", fontWeight: "bold"}} >Lái thử</Typography>
                                    <Typography  variant='body1' sx={{ml: "2%",fontFamily:"Gilroy", fontWeight: "bold", color:"#28ad8d"}}>2000$</Typography>
                                </ButtonTestVehicle>
                            </Grid>
                        </Grid>
                        <Grid height={"25%"} width={"100%"}>
                            <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"}>
                                <FormatPaintIcon></FormatPaintIcon>
                                <Typography sx={{pl:"2%"}}>Màu sắc</Typography>
                                <hr style={{width: "70%"}}/>
                            </Grid>
                            <Grid width={"100%"} height={"65%"}>
                                    <Typography sx={{mt: "2%"}}>Màu chính</Typography>
                                    <ColorDialog height={"50%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                        {DefaultVehicleColor.map((i) => (
                                            <ColorDialogItem sx={{backgroundColor: i.Hex}} onClick = {() => setcolor1(parseInt(i.ID))}>
                                            </ColorDialogItem>
                                        ))}
                                    </ColorDialog>
                                    <Typography sx={{mt: "2%"}}>Màu phụ</Typography>
                                    <ColorDialog height={"50%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                        {DefaultVehicleColor.map((i) => (
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
                            <Typography sx={{pl:"2%"}}>Loại xe</Typography>
                            <hr style={{width: "70%"}}/>
                        </Grid>
                        <Grid width={"100%"} height={"45%"}>
                            <CategoryVehicleScrollBar height={"100%"} width={"100%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                {VehicleShopCategory.map((i) => (
                                    <CategoryVehicleItem display={"flex"} alignItems={"center"} onClick={() => handleClickCategory(i)}
                                    sx ={{backgroundColor: selectedCategory === i || menuList === i ?  "#ff0b30" :  "rgba(128, 128, 128,0.5)"}} >
                                        <Grid width={"15%"} height={"100%"} sx={{ml: "2%", mr: "2%"}}>
                                            <CategoryIcon src={`./assets/vehicleShop/icon_${i}.png`}/>
                                        </Grid>
                                        <Typography variant='body1'  sx={{fontWeight: "bold", fontFamily: "Gilroy", textTransform: "uppercase"}}>{EVehicleShopCategorySubTittle[i as keyof typeof EVehicleShopCategorySubTittle]}</Typography>
                                    </CategoryVehicleItem>
                                ))}
                            </CategoryVehicleScrollBar>
                        </Grid>
                        <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"}>
                            <PercentIcon></PercentIcon>
                            <Typography sx={{pl:"2%"}}>Thông số</Typography>
                            <hr style={{width: "65%"}}/>
                        </Grid>
                        <Grid display={"flex"} height={"30%"} width={"100%"} sx={{gap: "2%", flexWrap: "wrap", mt: "-4%", ml: "-3%"}}>
                            <Grid width={"49%"} height={"50%"} justifyContent={"center"} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", strokeLinecap:"round"}}  variant='determinate' value={(DefaultVehicleShopInfomation[selectedVehicle].speed)/TopSpeedServer * 100} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30"}}>Tốc độ</Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", top: 30, fontWeight: "bold", ml: "-2%"}}>{DefaultVehicleShopInfomation[selectedVehicle].speed}</Typography>
                            </Grid>
                            <Grid width={"49%"} height={"50%"} justifyContent={"center"} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", strokeLinecap:"round", color: "#FFB84C"}}  variant='determinate' value={DefaultVehicleShopInfomation[selectedVehicle].brake} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30"}}>Phanh</Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", top: 30, fontWeight: "bold", ml: "-2%"}}>{DefaultVehicleShopInfomation[selectedVehicle].brake}</Typography>
                            </Grid>
                            <Grid width={"49%"} height={"50%"} justifyContent={"center"} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", strokeLinecap:"round", color: "#1F8A70"}}  variant='determinate' value={DefaultVehicleShopInfomation[selectedVehicle].control} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30"}}>Điều khiển</Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", top: 30, fontWeight: "bold", ml: "-2%"}}>{DefaultVehicleShopInfomation[selectedVehicle].control}</Typography>
                            </Grid>
                            <Grid width={"49%"} height={"50%"} justifyContent={"center"} sx={{position: "relative", pt: "2%"}}>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", position:"absolute", color: "gray"}}  variant='determinate' value={100} size={70} thickness={7}/>
                                <CircularProgress  sx={{height: "100%", width: "100%", ml: "30%", strokeLinecap:"round", color: "#5B8FB9"}}  variant='determinate' value={(DefaultVehicleShopInfomation[selectedVehicle].shift)* 10} size={70} thickness={7}/>
                                <Typography variant='body1' width={"100%"} textAlign={"center"} sx={{color: "#ff0b30",fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30"}}>Hộp số</Typography>
                                <Typography width={"100%"} textAlign={"center"} sx={{position: "absolute", top: 30, fontWeight: "bold", ml: "-2%"}}>{DefaultVehicleShopInfomation[selectedVehicle].shift}</Typography>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                </AnimatedGrid>
            </Top>
            <Bottom style={{...bottomSpring}}>
                <Grid display={"flex"} height={"10%"} width={"100%"} wrap="nowrap" alignItems={"center"} sx={{mt: "-10px", mb: "10px"}}>
                    <ReorderIcon></ReorderIcon>
                    <Typography sx={{pl:"5px"}}>Danh sách xe</Typography>
                    <hr style={{width: "91%"}}/>
                </Grid>
                <AnimatedGrid width={"100%"} height={"90%"} display={"flex"} wrap="nowrap" sx={{gap: "5px", mt:"5px"}}>
                    <ButtonBottom width={"3%"} height={"100%"} sx={{backgroundColor: "rgba(82, 82, 82, 0.6)"}} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={handleScrollLeft}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </ButtonBottom>
                    <BottomScrollBar sx={{width: "calc(94% - 10px)", height: "100%", overflowX: 'scroll', overflowY: 'hidden'}} ref={scrollbarRef}>
                        {selectedList.map((i) => (
                            <BottomScrollBarItem  onClick={()=>setSelectedVehicle(i)} sx={{backgroundColor: selectedVehicle === i ? "#ff0b30" : "rgba(35, 35, 35, 0.5)"}}>
                                <Grid width={"98%"} height={"20%"} sx={{ml: "2%"}}>
                                    <Typography variant='h6' sx={{wordBreak: "break-all", textTransform: "uppercase", fontFamily: "Gilroy", color: selectedVehicle === i ? "#ffffff" : "#ff0b30"}}>{DefaultVehicleShopInfomation[selectedVehicle].title}</Typography>
                                </Grid>
                                <Grid width={"100%"} height={"70%"} sx={{ml: "2%"}} display={"flex"} justifyContent={"center"}>
                                    <BottomImg src={`./assets/vehicleShop/${i}.png`}></BottomImg>
                                </Grid>
                                <Grid width={"100%"} height={"10%"} sx={{ml: "2%", mt: "-4%"}}>
                                    <Typography color={"secondary"} variant='body1' sx={{wordBreak: "break-all", textTransform: "uppercase", fontFamily: "Gilroy", fontWeight: "bold"}}>{DefaultVehicleShopInfomation[selectedVehicle].price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                                </Grid>
                            </BottomScrollBarItem>
                        ))}
                    </BottomScrollBar>
                    <ButtonBottom width={"3%"} height={"100%"} sx={{backgroundColor: "rgba(82, 82, 82, 0.6)"}} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={handleScrollRight}>
                        <ArrowForwardIcon></ArrowForwardIcon>
                    </ButtonBottom>
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
