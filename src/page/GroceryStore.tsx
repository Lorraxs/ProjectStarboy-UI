import React, { useState, useEffect  } from 'react';
import useShow from '../hooks/useShow';
import { Grid, InputLabel, Typography, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import styled from 'styled-components';
import { cRequest } from '../utils/request'
import { AnimatedGrid } from '../components/animated-mui'
import FormControl from '@mui/material/FormControl/FormControl';
import { GroceryStoreListItem, DefaultGroceryStoreItemInfomation, EGroceryStoreUsesLevel, GroceryStoreType, EGroceryStoreTypeSubTittle } from '../shared/interfaces';
import { animated, config, useChain, useSpring, useSpringRef, useTransition } from '@react-spring/web'
import ScaleTwoToneIcon from '@mui/icons-material/ScaleTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';

const Container = styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/groceryShop/design_bg.png');
    background-position: center;
    background-size: cover;
    width: 100%;
    min-width: 100vh;
    height: 100%;
    pointer-events: all;
`


const Top = styled(AnimatedGrid)`
    height: 75%;

`

const ParrentGrid = styled(AnimatedGrid)`
    height: 100%
`
const Bottom = styled(AnimatedGrid)`
    height: 25%;

`
const BottomMenuItem = styled(AnimatedGrid)`
    cursor: pointer;
    &:hover{
        background-color: #ff0b30;
    }
    margin-right: 10px;
    border: 1px solid  #ff0b30;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    transition: background-color 0.5s ease;

`
const GradientButton = styled(Button)({
    background: 'linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)',
});

const ItemCenterImg = styled(animated.img)<{selected: boolean}>`
    position: relative;
    width: 70%;
    height: 70%;
    object-fit:contain;
    transition: all 0.5s ease; 
    &:hover {
        transform: scale(1.1);
    }
`

const LeftCenterImg = styled(animated.img)`
    position: relative;
    min-width: 20%;
    height: 100%;
    object-fit:scale-down;
`


function GroceryStore() {
    const [show] = useShow(process.env.NODE_ENV === 'development', 'GroceryStore', true, true, true, false)
    const [menuList, setMenuList] = useState("Food");
    const [selectedCategory, setSelectedCategory] = useState('');
    const selectedList = GroceryStoreListItem[menuList as keyof typeof GroceryStoreListItem];
    const [selectedItem, setselectedItem] = useState( selectedList[0]);

    const handleClickCategory = (i: string) => {
        setMenuList(i);
        setSelectedCategory(i);
    };

    useEffect(() => {
        setselectedItem(selectedList[0])
    }, [selectedList]);

    const leftSpringRef = useSpringRef();
    const leftSpring = useSpring({
        ref: leftSpringRef,
        from: { x: -100, opacity: 0 },
        to: { x: show ? 0 : -100, opacity: show ? 1 : 0 },
    })
    
    const topSpringRef = useSpringRef();
    const topSpring = useSpring({
        ref: topSpringRef,
        from: { y: -100, opacity: 0 },
        to: { y: show ? 0 : -100, opacity: show ? 1 : 0 },
    })

    const bottomSpringRef = useSpringRef();
    const bottomSpring = useSpring({
        ref: bottomSpringRef,
        from: { y: 100, opacity: 0 },
        to: { y: show ? 0 : 100, opacity: show ? 1 : 0 },
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


    useChain(show ? [transRef, topSpringRef, leftSpringRef, rightSpringRef, bottomSpringRef] : [bottomSpringRef, rightSpringRef,leftSpringRef, bottomSpringRef, transRef ], show ? 
        [0.0, 0.5,0.5,0.5, 0.5]:
        [0.5, 0.5,0.5,0.5, 0.0], 
        1000)
    return transitions( (style, show) => (show ?

        <Container style={{...style}}>
            <Top sx={{p:15}} container flexDirection={"row"} display={"flex"}>
                <ParrentGrid  style={{...leftSpring}} xs={2}>
                    <AnimatedGrid xs={12} height={"10%"}  sx={{mt: 1, mb:4}} display={"flex"} flexDirection={"column"}>
                        <Grid height={"50%"}>
                            <Typography variant='h5' color={"primary"} sx={{fontFamily: "Title", fontWeight:"bold"}}>Thông tin</Typography>
                        </Grid>
                        <Grid height={"50%"}>
                            <Typography variant='h5' color={"white"} sx={{fontFamily: "Title", fontWeight:"bold"}}>sản phẩm</Typography>
                        </Grid>
                    </AnimatedGrid>
                    <AnimatedGrid xs={12} height={"10%"}  sx={{mt: 1}} display={"flex"} flexDirection={"row"}>
                        <LeftCenterImg src={`./assets/groceryShop/${selectedItem}.png`}></LeftCenterImg>
                        <Grid sx={{ml:4}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Typography color={"primary"} variant='body1'sx={{fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30"}} >{DefaultGroceryStoreItemInfomation[selectedItem].tittle}</Typography>
                        </Grid>
                    </AnimatedGrid>
                    <AnimatedGrid xs={12} height={"7%"}  sx={{mt: 1}} display={"flex"} flexDirection={"row"}>
                        <Grid width={"100%"}>
                            <Typography variant='body1' sx={{wordBreak: 'break-all', fontFamily: "Gilroy"}}>{DefaultGroceryStoreItemInfomation[selectedItem].description}</Typography>
                        </Grid>
                    </AnimatedGrid>
                    <AnimatedGrid xs={12} height={"60%"}  sx={{mt: 1}} display={"flex"} flexDirection={"column"}>
                        <Grid sx={{mb:4 ,p:2, backgroundColor: "rgba(163, 162, 162, 0.1)", borderRadius:"10px"}} width={"100%"} display={"flex"} wrap={"nowrap"} height={"20%"} alignItems={"center"}>
                            <Grid height={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"}  width={"20%"} sx={{border: "1px solid #ff0b30", borderRadius: "10px", backgroundColor: "rgba(255, 11, 48, 0.2)"}}>
                                <ScaleTwoToneIcon sx={{color: "#ffffff"}}></ScaleTwoToneIcon>
                            </Grid>
                            <Grid height={"80%"} display={"flex"}justifyContent={"center"}  width={"80%"} flexDirection={"column"} sx={{pl: 3}}>
                                <Typography variant='body1' sx={{fontFamily: "Title", fontSize:"11px", color: "rgba(204, 204, 204, 0.8)"}}>Trọng lượng</Typography>
                                <Typography variant='body1' sx={{fontFamily: "Gilroy"}}>{DefaultGroceryStoreItemInfomation[selectedItem].weight} gram</Typography>
                            </Grid>
                        </Grid>
                        <Grid sx={{mb:4 ,p:2, backgroundColor: "rgba(163, 162, 162, 0.1)", borderRadius:"10px"}} width={"100%"} display={"flex"} wrap={"nowrap"} height={"20%"} alignItems={"center"}>
                            <Grid height={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"}  width={"20%"} sx={{border: "1px solid #ff0b30", borderRadius: "10px", backgroundColor: "rgba(255, 11, 48, 0.2)"}}>
                                <GroupAddTwoToneIcon sx={{color: "#ffffff"}}></GroupAddTwoToneIcon>
                            </Grid>
                            <Grid height={"80%"} display={"flex"}justifyContent={"center"}  width={"80%"} flexDirection={"column"} sx={{pl: 3}}>
                                <Typography variant='body1' sx={{fontFamily: "Title", fontSize:"11px", color: "rgba(204, 204, 204, 0.8)"}}>Công dụng</Typography>
                                <Typography variant='body1' sx={{fontFamily: "Gilroy"}}>{DefaultGroceryStoreItemInfomation[selectedItem].uses}</Typography>
                            </Grid>
                        </Grid>
                        <Grid sx={{mb:4 ,p:2, backgroundColor: "rgba(163, 162, 162, 0.1)", borderRadius:"10px"}} width={"100%"} display={"flex"} wrap={"nowrap"} height={"20%"} alignItems={"center"}>
                            <Grid height={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"}  width={"20%"} sx={{border: "1px solid #ff0b30", borderRadius: "10px", backgroundColor: "rgba(255, 11, 48, 0.2)"}}>
                                <LoyaltyTwoToneIcon sx={{color: "#ffffff"}}></LoyaltyTwoToneIcon>
                            </Grid>
                            <Grid height={"80%"} display={"flex"}justifyContent={"center"}  width={"80%"} flexDirection={"column"} sx={{pl: 3}}>
                                <Typography variant='body1' sx={{fontFamily: "Title", fontSize:"11px", color: "rgba(204, 204, 204, 0.8)"}}>Tần suất sử dụng</Typography>
                                <Typography variant='body1' sx={{fontFamily: "Gilroy"}}>{EGroceryStoreUsesLevel[DefaultGroceryStoreItemInfomation[selectedItem].level as keyof typeof EGroceryStoreUsesLevel]}</Typography>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                </ParrentGrid>
                <ParrentGrid  xs={8}  style={{...topSpring}}  display={"flex"} flexDirection={"column"}>
                    <AnimatedGrid height={"12%"} display={"flex"} justifyContent={"center"} sx={{pt:1}}>
                        <AnimatedGrid xs={8} justifyContent={"center"} >
                            <Grid>
                                <Typography variant='h5' textAlign={"center"} color='primary' sx={{fontFamily: "Title",fontWeight: "bold", textShadow: "0 0 15px #ff0b30"}}>{DefaultGroceryStoreItemInfomation[selectedItem].tittle}</Typography>
                            </Grid>
                            <Grid>
                                <Typography variant='body1' textAlign={"center"} sx={{fontFamily: "Gilroy",wordBreak: 'break-all', color:"#6B728E"}}>{DefaultGroceryStoreItemInfomation[selectedItem].description}</Typography>
                            </Grid>
                        </AnimatedGrid>
                    </AnimatedGrid>
                    <AnimatedGrid height={"78%"} width={"100%"}  display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} >
                        <AnimatedGrid width={"50%"}  height={"100%"}  display={"flex"} flexDirection={"column"} alignItems={"center"} >
                            <ItemCenterImg  selected={true} src={`./assets/groceryShop/${selectedItem}.png`}/>
                            <Grid width={"100%"} >
                                <Typography variant='h5'sx={{fontFamily: "Gilroy", fontWeight: "bold", color:"#30e3b7", mt:"-5px"}} textAlign={"center"}>{(DefaultGroceryStoreItemInfomation[selectedItem].price).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                            </Grid> 
                        </AnimatedGrid>
                    </AnimatedGrid>
                    <AnimatedGrid height={"10%"} justifyContent={"center"} display={"flex"} alignItems={"center"}>
                        <GradientButton variant='contained'size="large">Thêm vào giỏ hàng</GradientButton>
                    </AnimatedGrid>
                </ParrentGrid>
                <ParrentGrid xs={2} style={{...rightSpring}} >
                    <Grid xs={12} display={"flex"} flexDirection={"column"} height={"10%"} sx={{mt: 1}}>
                        <Typography variant='h5' color={"primary"} sx={{fontFamily: "Title", fontWeight:"bold", float:"right", textAlign:"right"}}>giỏ</Typography>
                        <Typography variant='h5' color={"white"} sx={{fontFamily: "Title", fontWeight:"bold", float:"right", textAlign:"right"}}>hàng</Typography>
                    </Grid>
                </ParrentGrid>
            </Top>
            <Bottom  container justifyContent={"center"} flexDirection={"column"}  sx={{pl:8, pr:8}}>
                <ParrentGrid style={{...bottomSpring}} container width={"100%"} height={"100%"} justifyContent={"center"} >
                    <Grid width={"90%"}  container justifyContent={"center"} alignItems={"center"} display={"flex"}flexDirection={"column"}>
                        <Grid height={"15%"} display={"flex"} width={"60%"} wrap={"nowrap"} justifyContent={"center"}>
                            {GroceryStoreType.map((i) => (
                                <BottomMenuItem width={"15%"} key={i}   onClick={() => handleClickCategory(i)} sx={{
                                    backgroundColor: selectedCategory === i ? "#ff0b30" : "rgba(255, 11, 48, 0.1)"}}>
                                    <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                        {EGroceryStoreTypeSubTittle[i as keyof typeof EGroceryStoreTypeSubTittle]}
                                    </Typography>
                                </BottomMenuItem>
                            ))}
                        </Grid>
                        <Grid height={"80%"}>9</Grid>
                    </Grid>
                </ParrentGrid>
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