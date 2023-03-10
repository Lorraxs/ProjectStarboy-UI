import React, { useState, useEffect, useMemo  } from 'react';
import useShow from '../hooks/useShow';
import { Grid, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { cRequest } from '../utils/request'
import { AnimatedGrid } from '../components/animated-mui'
import { animated, config, useChain, useSpring, useSpringRef, useTransition } from '@react-spring/web'
import ScaleTwoToneIcon from '@mui/icons-material/ScaleTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import { RootState } from '../store';
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { IGroceryStoreBuyData, IGroceryStoreCart, IGroceryStoreItem, eGroceryStoreType } from '../shared/interfaces';
import { getItemDataByName, isNullOrUndefined } from '../shared/utils/func';
import { addGroceryStoreCart, decreaseCartQuantity, increaseCartQuantity } from '../store/groceryStore';
import {useTranslation} from "react-i18next";
import _ from 'lodash';

const request = new cRequest()

const Container = styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('./assets/groceryShop/design_bg.png');
    background-position: center;
    background-size: cover;
    width: 100%;
    min-width: 100vh;
    height: 100%;
    pointer-events: all;
    user-select: none;
`


const Top = styled(AnimatedGrid)`
    height: 75%;

`

const ParrentGrid = styled(AnimatedGrid)`
    height: 100%;
`
const Bottom = styled(AnimatedGrid)`
    height: 25%;

`
const BottomMenuItem = styled(AnimatedGrid)`
    cursor: pointer;
    &:hover{
        background: linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%);
    }
    margin-right: 10px;
    border: 1px solid  #ff0b30;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    transition: background  0.5s ease;

`

const RightCenterMenuItem = styled(AnimatedGrid)`
    min-height: 15%;
    border: 1px dashed #FF0B30;
    background-color: rgba(255, 11, 48, 0.1);
    margin-bottom: 15px;
    border-radius: 10px;
`
const RightCenterScrollbarItem = styled(AnimatedGrid)`
    cursor: pointer;
    
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        width: 2px;
    }
    ::-webkit-scrollbar-thumb
    {
        background-color: #ffffff;
        border-radius: 5px;
        magrin-top: 3px;
    }
    ::-webkit-scrollbar-track
    {
        background-color: transparent;
    }
    
`
const GradientButton = styled(Button)({
    background: 'linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)',
});

const ItemCenterImg = styled(animated.img)`
    
    width: 30%;
    height: 50%;
    object-fit: fill;
    transition: all 0.5s ease; 
    &:hover {
        transform: scale(1.1);
    }
`

const LeftCenterImg = styled(animated.img)`
    width: 30%;
    height: 100%;
    object-fit: fill;
    object-postion: center;
    transition: all 0.5s ease; 
    &:hover {
        transform: scale(1.1);
    }
`

const BottoScrollbarImg = styled(animated.img)`
    width: 35%;
    height: 55%;
    object-fit: fill;
    object-postion: center;
    transition: all 0.5s ease; 
    &:hover {
        transform: scale(1.1);
    }
    margin-left: 32%;
    margin-top: 3%;
`

const RightScrollbarImg = styled(animated.img)`
    margin-top: 2%;
    position: relative;
    height: 50px;
    width: 80%;
    object-fit: fill ;
`

const BottomScrollbar = styled(AnimatedGrid)`
    display: flex;
    justify-content: center;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        height: 5px;
    }
    ::-webkit-scrollbar-thumb
    {
        background-color: #FF0B30;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track
    {
        background-color: transparent;
    }
    gap: 19px;
`

const BottomScrollbarItem = styled(AnimatedGrid)`
    min-width: calc(20% - 15px);
    height: 100%;
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 0.5s ease; 

`


function GroceryStore() {
    const {t, i18n} = useTranslation('common');
    const [show] = useShow(process.env.NODE_ENV === 'test', 'GroceryStore', true, true, true, true)
    const [selectedCategory, setSelectedCategory] = useState<eGroceryStoreType>(eGroceryStoreType.all);
    const products = useSelector((state:RootState)=>state.groceryStore.products);
    const [selectedItem, setSelectedItem] = useState<IGroceryStoreItem | undefined>(products.length > 0 ? products[0] : undefined);
    const cart = useSelector((state:RootState)=>state.groceryStore.cart);
    const storeIdx = useSelector((state:RootState)=>state.groceryStore.storeIdx)
    
    const handleClickCategory = (category: eGroceryStoreType) => {
        setSelectedCategory(category)
        console.log(category)
    };

    const dispatch = useDispatch();


    const totalPrice = cart.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
    }, 0);

    const handleAddProduct = (product: IGroceryStoreCart) => {
        dispatch(addGroceryStoreCart(product));
    }

    const handleIncreaseCartQuantity = (productName: string) => {
        dispatch(increaseCartQuantity(productName))
    }

    const handleDecreaseCartQuantity = (productName: string) => {
        dispatch(decreaseCartQuantity(productName))
    }

    const onSubmit = () =>{
        const data: IGroceryStoreBuyData = {
            cart,
            storeIdx 
        }
        request.post('GroceryShop:Buy', data)
    }

    const productList = useMemo(() => {
        if(selectedCategory === eGroceryStoreType.all){
            return products
        }else{
            return _.filter(products, o=> o.category === selectedCategory)
        }
    }, 
    [products, selectedCategory])

    const itemData = useMemo(() => {
        if(selectedItem !== undefined){
            return getItemDataByName(selectedItem.name)
        }
        return undefined
    }, [selectedItem])
    

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


    useChain(show ? [transRef, topSpringRef, leftSpringRef, rightSpringRef, bottomSpringRef] : [bottomSpringRef, rightSpringRef,leftSpringRef, topSpringRef, transRef ], show ? 
        [0.0, 0.5,0.5,0.5, 0.5]:
        [0.0, 0.0,0.0,0.0, 0.5], 
        1000)
    return transitions( (style, show) => (show ?

        <Container style={{...style}}>
            <Top sx={{p:15}} container flexDirection={"row"} display={"flex"}>
                <ParrentGrid  style={{...leftSpring}} xs={2}>
                    <AnimatedGrid xs={12} height={"10%"}  sx={{mt: 1, mb:4}} display={"flex"} flexDirection={"column"}>
                        <Grid height={"50%"}>
                            <Typography variant='h5' color={"primary"} sx={{fontFamily: "Title", fontWeight:"bold"}}>{t('INFOMATION')}</Typography>
                        </Grid>
                        <Grid height={"50%"}>
                            <Typography variant='h5' color={"white"} sx={{fontFamily: "Title", fontWeight:"bold"}}>{t('PRODUCT')}</Typography>
                        </Grid>
                    </AnimatedGrid>
                    {(selectedItem !== undefined) && <AnimatedGrid xs={12} height={"10%"}  sx={{mt: 1}} display={"flex"} flexDirection={"row"}>
                        <LeftCenterImg src={`./assets/groceryShop/${selectedItem.name}.png`}></LeftCenterImg>
                        <Grid sx={{ml:4}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Typography color={"primary"} variant='body1'sx={{fontFamily:"Title", fontWeight: "bold", textShadow: "0 0 10px #ff0b30"}} >{itemData?.label}</Typography>
                        </Grid>
                    </AnimatedGrid>}
                    {(selectedItem !== undefined) && <AnimatedGrid xs={12} height={"7%"}  sx={{mt: 1}} display={"flex"} flexDirection={"row"}>
                        <Grid width={"100%"}>
                            <Typography variant='body1' sx={{wordBreak: 'break-all', fontFamily: "Gilroy"}}>{itemData?.description}</Typography>
                        </Grid>
                    </AnimatedGrid>}
                    <AnimatedGrid xs={12} height={"60%"}  sx={{mt: 1}} display={"flex"} flexDirection={"column"}>
                        <Grid sx={{mb:4 ,p:2, backgroundColor: "rgba(163, 162, 162, 0.1)", borderRadius:"10px"}} width={"100%"} display={"flex"} wrap={"nowrap"} height={"20%"} alignItems={"center"}>
                            <Grid height={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"}  width={"20%"} sx={{border: "1px solid #ff0b30", borderRadius: "10px", backgroundColor: "rgba(255, 11, 48, 0.2)"}}>
                                <ScaleTwoToneIcon sx={{color: "#ffffff"}}></ScaleTwoToneIcon>
                            </Grid>
                            <Grid height={"80%"} display={"flex"}justifyContent={"center"}  width={"80%"} flexDirection={"column"} sx={{pl: 3}}>
                                <Typography variant='body1' sx={{fontFamily: "Title", fontSize:"11px", color: "rgba(204, 204, 204, 0.8)"}}>{t('WEIGHT')}</Typography>
                                {(selectedItem !== undefined) && <Typography variant='body1' sx={{fontFamily: "Gilroy"}}>
                                    {itemData?.weight} gram
                                </Typography>}
                            </Grid>
                        </Grid>
                        <Grid sx={{mb:4 ,p:2, backgroundColor: "rgba(163, 162, 162, 0.1)", borderRadius:"10px"}} width={"100%"} display={"flex"} wrap={"nowrap"} height={"20%"} alignItems={"center"}>
                            <Grid height={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"}  width={"20%"} sx={{border: "1px solid #ff0b30", borderRadius: "10px", backgroundColor: "rgba(255, 11, 48, 0.2)"}}>
                                <GroupAddTwoToneIcon sx={{color: "#ffffff"}}></GroupAddTwoToneIcon>
                            </Grid>
                            <Grid height={"80%"} display={"flex"}justifyContent={"center"}  width={"80%"} flexDirection={"column"} sx={{pl: 3}}>
                                <Typography variant='body1' sx={{fontFamily: "Title", fontSize:"11px", color: "rgba(204, 204, 204, 0.8)"}}>{t('DESCRIPTION')}</Typography>
                                {(selectedItem !== undefined) && <Typography variant='body1' sx={{fontFamily: "Gilroy"}}>
                                    {itemData?.description}
                                </Typography>}
                            </Grid>
                        </Grid>
                        <Grid sx={{mb:4 ,p:2, backgroundColor: "rgba(163, 162, 162, 0.1)", borderRadius:"10px"}} width={"100%"} display={"flex"} wrap={"nowrap"} height={"20%"} alignItems={"center"}>
                            <Grid height={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"}  width={"20%"} sx={{border: "1px solid #ff0b30", borderRadius: "10px", backgroundColor: "rgba(255, 11, 48, 0.2)"}}>
                                <LoyaltyTwoToneIcon sx={{color: "#ffffff"}}></LoyaltyTwoToneIcon>
                            </Grid>
                            <Grid height={"80%"} display={"flex"}justifyContent={"center"}  width={"80%"} flexDirection={"column"} sx={{pl: 3}}>
                                <Typography variant='body1' sx={{fontFamily: "Title", fontSize:"11px", color: "rgba(204, 204, 204, 0.8)"}}>{t('RARITY')}</Typography>
                                {(selectedItem !== undefined) && <Typography variant='body1' sx={{fontFamily: "Gilroy"}}>
                                    {itemData?.rarity}
                                </Typography>}
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                </ParrentGrid>
                <ParrentGrid  xs={8}  style={{...topSpring}}  display={"flex"} flexDirection={"column"}>
                    <AnimatedGrid height={"12%"} display={"flex"} justifyContent={"center"} sx={{pt:1}}>
                        <AnimatedGrid xs={8} justifyContent={"center"} >
                            <Grid>
                                {(selectedItem !== undefined) && <Typography variant='h5' textAlign={"center"} color='primary' sx={{fontFamily: "Title",fontWeight: "bold", textShadow: "0 0 15px #ff0b30"}}>
                                    {itemData?.label}
                                </Typography>}
                            </Grid>
                            <Grid>
                                {(selectedItem !== undefined) &&  <Typography variant='body1' textAlign={"center"} sx={{fontFamily: "Gilroy",wordBreak: 'break-all', color:"#6B728E"}}>
                                    {itemData?.description}
                                </Typography>}
                            </Grid>
                        </AnimatedGrid>
                    </AnimatedGrid>
                    <AnimatedGrid height={"78%"} width={"100%"} display={"flex"} flexDirection={"column"}   alignItems={"center"} justifyContent={"center"} >
                        <ItemCenterImg  src={`./assets/groceryShop/${selectedItem?.name}.png`}/>
                        <Grid width={"100%"} sx={{mt: "2%", mb:"4%"}}>
                            {(selectedItem !== undefined) &&  <Typography variant='h5'sx={{fontFamily: "Gilroy", fontWeight: "bold", color:"#30e3b7", mt:"-5px"}} textAlign={"center"}>
                                {selectedItem.price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $
                            </Typography>}
                        </Grid> 
                    </AnimatedGrid>
                    <AnimatedGrid height={"10%"} justifyContent={"center"} display={"flex"} alignItems={"center"}>
                        {(selectedItem !== undefined) && <GradientButton variant='contained'size="large" sx={{fontWeight: "bold"}} onClick={() => handleAddProduct({
                            name: selectedItem.name,
                            price: selectedItem.price,
                            quantity: 1
                        })}>
                            {t('ADD_TO_CART')}
                        </GradientButton>}
                    </AnimatedGrid>
                </ParrentGrid>
                <ParrentGrid xs={2} style={{...rightSpring}} >
                    <Grid xs={12} display={"flex"} flexDirection={"column"} height={"10%"} sx={{mt: 1}}>
                        <Typography variant='h5' color={"primary"} sx={{fontFamily: "Title", fontWeight:"bold", float:"right", textAlign:"right"}}>{t('SHOP')}</Typography>
                        <Typography variant='h5' color={"white"} sx={{fontFamily: "Title", fontWeight:"bold", float:"right", textAlign:"right"}}>{t('CART')}</Typography>
                    </Grid>
                    <Grid xs={12} display={"flex"} height={"65%"} justifyContent={"center"} 
                    sx={{ 
                        mt:5, 
                        pt: 4, 
                        pb: 4,
                        borderRadius: "10px",
                        backgroundColor: "rgba(163, 162, 162, 0.1)"
                    }}>
                        {cart.length === 0 ? (
                            <AnimatedGrid width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <RemoveShoppingCartIcon sx={{ fontSize: 60 }}></RemoveShoppingCartIcon>
                            </AnimatedGrid>
                        ):(
                            <RightCenterScrollbarItem width={"90%"} flexDirection={"column"} height={"100%"} sx={{pr:2, overflowX: 'hidden', overflowY: 'auto'}}>
                                {cart.map((i) => (
                                    <RightCenterMenuItem display={"flex"} wrap={"nowrap"} alignItems={"center"} sx={{pl:2}}>
                                        <AnimatedGrid width={"10%"} height={"100%"}>
                                            <Grid height={"100%"} onClick={() => handleIncreaseCartQuantity(i.name)}>
                                                <Typography variant='body1' display={"flex"} justifyContent={"center"} sx={{fontWeight: "bold", backgroundColor:"red", borderRadius: "20%"}}>
                                                    +
                                                </Typography>
                                            </Grid>
                                        </AnimatedGrid>
                                        <AnimatedGrid width={"13%"} height={"100%"}>
                                            <Typography variant='body1' display={"flex"} justifyContent={"center"} sx={{fontSize: "11px",fontWeight: "bold", fontFamily: "Title"}}>
                                                {i.quantity}
                                            </Typography>
                                        </AnimatedGrid>
                                        <AnimatedGrid width={"10%"} height={"100%"}>
                                            <Grid height={"100%"} onClick={() => handleDecreaseCartQuantity(i.name)}>
                                                <Typography variant='body1' display={"flex"} justifyContent={"center"} sx={{fontWeight: "bold", backgroundColor:"green", borderRadius: "20%"}}>
                                                    -
                                                </Typography>
                                            </Grid>
                                        </AnimatedGrid>
                                        <AnimatedGrid width={"33%"} height={"100%"} sx={{ml: 2}}>
                                            {selectedItem !== undefined && <Typography variant='body1' display={"flex"} sx={{fontWeight: "bold", fontFamily:"Gilroy", fontSize: "14px"}}>
                                                {itemData?.label}
                                            </Typography>}
                                        </AnimatedGrid>
                                        <AnimatedGrid width={"32%"} container height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            <Grid width={"100%"} height={"100%"} sx={{}}>
                                                <RightScrollbarImg src={`./assets/groceryShop/${i.name}.png`}></RightScrollbarImg>
                                            </Grid>
                                        </AnimatedGrid>
                                    </RightCenterMenuItem>
                                ))}
                            </RightCenterScrollbarItem>
                        )}

                        
                    </Grid>
                    <Grid xs={12}  display={"flex"} height={"15%"} sx={{mt: "10%"}} wrap={"nowrap"} >
                        {cart.length === 0 ? (
                            <Grid xs={4}>
                                <Button variant='contained' sx={{fontSize: "10px", fontWeight: "bold", fontFamily:"Title"}} disabled>{t('PAY')}</Button>
                            </Grid>
                        ):(
                            <Grid xs={4}>
                                <Button variant='contained' sx={{fontSize: "10px", fontWeight: "bold", fontFamily:"Title"}} onClick={onSubmit}>{t('PAY')}</Button>
                            </Grid>
                        )}
                        
                        <Grid xs={8} display={"flex"} flexDirection={"column"}>
                            <Grid width={"100%"}>
                                <Typography variant='body1' textAlign={"right"} sx={{fontWeight: "bold", textTransform: "uppercase"}}>{t('TOTAL')}</Typography>
                            </Grid>
                            <Grid width={"100%"} >
                                <Typography variant='body1' textAlign={"right"} sx={{mt: 2,fontWeight: "bold", fontFamily: "Title", fontSize:"19px",color:"#30e3b7"}}>
                                    {(totalPrice).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </ParrentGrid>
            </Top>
            <Bottom  container justifyContent={"center"}  sx={{pl:8, pr:8}}>
                <ParrentGrid style={{...bottomSpring}} container width={"100%"} height={"100%"} justifyContent={"center"} >
                    <AnimatedGrid width={"90%"}  container justifyContent={"center"} alignItems={"center"}>
                        <AnimatedGrid height={"15%"} display={"flex"} width={"70%"} wrap={"nowrap"} justifyContent={"center"} sx={{mt:-10}}>
                            <BottomMenuItem width={"15%"} onClick={() => handleClickCategory(eGroceryStoreType.all)} sx={{
                                background: selectedCategory === eGroceryStoreType.all ? "linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)" : "rgba(255, 11, 48, 0.1)"}}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {t('ALL')}
                                </Typography>
                            </BottomMenuItem>
                            <BottomMenuItem width={"15%"} onClick={() => handleClickCategory(eGroceryStoreType.food)} sx={{
                                background: selectedCategory === eGroceryStoreType.food ? "linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)" : "rgba(255, 11, 48, 0.1)"}}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {t('FOOD')}
                                </Typography>
                            </BottomMenuItem>
                            <BottomMenuItem width={"15%"} onClick={() => handleClickCategory(eGroceryStoreType.drink)} sx={{
                                background: selectedCategory === eGroceryStoreType.drink ? "linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)" : "rgba(255, 11, 48, 0.1)"}}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {t('DRINK')}
                                </Typography>
                            </BottomMenuItem>
                            <BottomMenuItem width={"15%"} onClick={() => handleClickCategory(eGroceryStoreType.tools)} sx={{
                                background: selectedCategory === eGroceryStoreType.tools ? "linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)" : "rgba(255, 11, 48, 0.1)"}}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {t('TOOLS')}
                                </Typography>
                            </BottomMenuItem>
                            <BottomMenuItem width={"15%"} onClick={() => handleClickCategory(eGroceryStoreType.items)} sx={{
                                background: selectedCategory === eGroceryStoreType.items ? "linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)" : "rgba(255, 11, 48, 0.1)"}}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {t('ITEMS')}
                                </Typography>
                            </BottomMenuItem>
                            <BottomMenuItem width={"15%"} onClick={() => handleClickCategory(eGroceryStoreType.technology)} sx={{
                                background: selectedCategory === eGroceryStoreType.technology ? "linear-gradient(0deg, #ff0b30 30%, #ff3d5b 90%)" : "rgba(255, 11, 48, 0.1)"}}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {t('TECHNOLOGY')}
                                </Typography>
                            </BottomMenuItem>
                        </AnimatedGrid>
                        <AnimatedGrid height={"80%"} width={"90%"} sx={{borderRadius: "10px", backgroundColor: "rgba(163, 162, 162, 0.1)"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <BottomScrollbar width={"90%"} height={"80%"} wrap="nowrap" justifyContent={"flex-start"} sx={{pb: 3, overflowX: 'auto', overflowY: 'hidden'}}>
                                {productList.map((item) => (
                                    <BottomScrollbarItem  onClick={()=>setSelectedItem(item)} sx={{
                                        backgroundColor: selectedItem === item ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 11, 48, 0.1)"}}>
                                            <Grid width={"100%"} height={"100%"} justifyContent={"center"}>
                                                <AnimatedGrid width={"100%"} justifyContent={"center"}>
                                                    <Typography variant='body1' sx={{color: selectedItem === item ? "#ff0b30" : "#ffffff", fontWeight: "bold", textTransform: "uppercase"}} textAlign={"center"}>
                                                        {getItemDataByName(item.name)?.label}
                                                    </Typography>
                                                    <Typography variant='body1' textAlign={"center"} sx={{color:"#28ad8d", fontWeight: "bold"}}>
                                                        {item.price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $
                                                    </Typography>
                                                </AnimatedGrid>
                                                <BottoScrollbarImg  src={`./assets/groceryShop/${item.name.toLowerCase()}.png`}/>
                                            </Grid>
                                    </BottomScrollbarItem>
                                ))}

                            </BottomScrollbar>
                        </AnimatedGrid>
                    </AnimatedGrid>
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