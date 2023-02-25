import React, { useState, useEffect, useCallback, useMemo  } from 'react';
import useShow from '../hooks/useShow';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Grid, InputLabel, Typography, Button, MenuItem, Select, SelectChangeEvent, LinearProgress } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; 
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import styled from 'styled-components';
import { cRequest } from '../utils/request'
import {WeaponListType, WeaponShopType, EWeaponShopTypeSubTittle, IWeaponData, LIST_WEAPON_GROUP, IWeaponShop, IBuyData } from '../shared/interfaces';
import { AnimatedGrid } from '../components/animated-mui'
import FormControl from '@mui/material/FormControl/FormControl';
import { animated, config, useChain, useSpring, useSpringRef, useTransition } from '@react-spring/web'
import {useTranslation} from "react-i18next";
import { getWeaponGroupByName } from '../shared/utils/func';

const WEAPON_DATA :IWeaponData = require('../shared/json/WeaponData.json')
const request = new cRequest()

 
const Container = styled(AnimatedGrid)`
    width: 100%;
    height: 100%;
    background-color: #111111;
    pointer-events: all;
`

const Header = styled(AnimatedGrid)`
    width: 100%;
    height: 10%;
    display:flex;
`
const Center = styled(AnimatedGrid)`
    width: 100%;
    height: 67%;
    border-bottom: 1px solid #232323;
    background-image: url("./assets/weaponShop/Michale_bg.png");
    background-repeat: no-repeat;
    background-size:auto;
    background-position:75% 50%;
`

const Bottom = styled(AnimatedGrid)`
    width: 100%;
    height: 17%;
`

const ParrentGrid = styled(AnimatedGrid)`
    height: 100%;
    display: flex;
`

const CenterParrentGrid = styled(AnimatedGrid)`
    height: 100%;
    display: flex;
`
const CenterParrentGridItem = styled(AnimatedGrid)`
    height: 100%;
`

const BottomParrentGrid = styled(AnimatedGrid)`
    height: 100%;
    display: flex;
`
const BottomParrentGridItem = styled(AnimatedGrid)`
    height: 90%;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        height:7px;
        
    }
    ::-webkit-scrollbar-thumb
    {
        background-color: #FF0B30;
        border-radius: 5px
    }
    ::-webkit-scrollbar-track
    {
        background-color: transparent;
    }
`
const BottomParrentGridItemWeapon = styled(AnimatedGrid)`
    min-width: calc(20% - 15px);
    cursor: pointer;
`



const ParrentItemGrid = styled(AnimatedGrid)<{active: boolean}>`
    min-width: 8%;
    text-align: center;
    cursor: pointer;
    ${(p)=>p.active && 'background-color: #ff0b30;'}
    &:hover{
        background-color: #ff0b30;
    }
`

const MoneyPlayerGrid = styled(AnimatedGrid)`
    width: 80%;
`

const MoneyPlayerItemGrid = styled(AnimatedGrid)`
    width: 80%;
`

const Title = styled(AnimatedGrid)`
    min-width: 8%;
    text-align: center; 
`
const WeaponCenterImg = styled(animated.img)`
    position: relative
    width: 100%;
    height: 100%;
`

const WeaponBottomImg = styled(animated.img)`
    width: 90%;
    height: 90%;
`


function WeaponShop(){
    const {t, i18n} = useTranslation('common');
    const [show] = useShow(process.env.NODE_ENV==='development', 'WeaponShop', true, true, true, true)
    const money = useSelector((state:RootState)=>state.player.money)
    const bank = useSelector((state:RootState)=>state.player.bank)
    const items = useSelector((state:RootState)=>state.weaponShop.items)
    const shopIdx = useSelector((state:RootState)=>state.weaponShop.shopIdx)
    const [selectedGroup, setSelectedGroup] = useState( LIST_WEAPON_GROUP[0]);
    const [selectedItem, setSelectedItem] = useState<IWeaponShop>()
    const weaponPrice = 0;
    const feeWeaponPrice = 0 * 0.1;
    const [buyAccount, setBuyAccount] = useState<'cash' | 'bank'>('cash')
    const [data, setData] = useState<IBuyData>({ name: '', totalPrice: 0, type: 'ammo', paymentMethod: 'cash', storeIndex: shopIdx});

    const selectedGroupItems = useMemo(() => {
        const itemInGroup:IWeaponShop[] = []
        items.forEach(e=>{
            const itemGroup = getWeaponGroupByName(e.name);
            if(itemGroup === selectedGroup){
                itemInGroup.push(e)
            }
        })
        return itemInGroup
    }, [selectedGroup])

    useEffect(() => {
        setSelectedItem(undefined)
    }, [selectedGroup])
    


    useEffect(() => {
        setSelectedGroup(LIST_WEAPON_GROUP[0])
    }, [LIST_WEAPON_GROUP]);

    useEffect(() => {
        if(selectedItem){
            setData({
                name: selectedItem.name,
                totalPrice: selectedItem.price*1.1,
                type: 'ammo',
                paymentMethod: buyAccount,
                storeIndex: shopIdx
            })
        }
    }, [selectedItem, buyAccount]);

    const onSubmit = () =>{
        request.post('WeaponShop:Buy', data)
    }

    const switchAccount = (event: SelectChangeEvent) => {
        if(event.target.value === 'cash'){
            setBuyAccount('cash')
        }else{
            setBuyAccount('bank')
        }
    }

    const centerSpringRef = useSpringRef();
    const centerSpring = useSpring({
        ref: centerSpringRef,
        from: { x: -100, opacity: 0 },
        to: { x: show ? 0 : -100, opacity: show ? 1 : 0 },
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

    useChain(show ? [transRef, centerSpringRef, rightSpringRef,bottomSpringRef] : [bottomSpringRef,rightSpringRef, centerSpringRef, transRef], show ? 
        [0.0, 0.5, 0.5, 0.5]:
        [0.0, 0.0, 0.0, 0.5], 
        1000)
    return transitions( (style, show) => (show ?
        <Container container justifyContent={'center'} alignItems={'center'} style={style}>
            <Header>
                <ParrentGrid xs={9}  justifyContent={'center'} alignItems={'center'} sx={{borderBottom: "1px solid #232323", borderRight: "1px solid #232323"}}>
                    <Title xs={2} sx={{m:2}}>
                            <Typography variant='h5' sx={{ fontFamily: "Title", fontWeight: 'bold', color: '#ff0b30'}}>
                                {t('SHOP')}
                            </Typography>
                            <Typography variant='h5' sx={{ fontFamily: "Title", fontWeight: 'bold', color: '#ff0b30'}}>
                                {t('WEAPON')}
                            </Typography>
                    </Title>
                    <Grid container>
                        {LIST_WEAPON_GROUP.map((i) => (
                            <ParrentItemGrid active={selectedGroup === i} sx={{m:2, p:2, textTransform: 'uppercase'}} onClick={ ()=> setSelectedGroup(i)}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {t(i)}
                                </Typography>
                            </ParrentItemGrid>
                        ))}
                    </Grid>
                </ParrentGrid>
                <ParrentGrid xs={3} justifyContent={"center"} alignItems={"center"} sx={{borderBottom: "1px solid #232323"}}>
                    <MoneyPlayerGrid display={"flex"}>
                        <MoneyPlayerItemGrid xs={6}>
                            <Grid display={'flex'}>
                                <Grid xs={2} sx={{mb:2}}></Grid>
                                <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy', fontSize: '12px'}}>{t('CASH')}</Typography></Grid>
                            </Grid>
                            <Grid display={'flex'}>
                                <Grid xs={2} sx={{mb:2}}><AttachMoneyIcon fontSize='small'  color="primary" sx={{borderRadius: "50%"}}></AttachMoneyIcon></Grid>
                                <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy'}}>{money} $</Typography></Grid>
                            </Grid>
                        </MoneyPlayerItemGrid>
                        <MoneyPlayerItemGrid xs={6}>
                            <Grid display={'flex'}>
                                <Grid xs={2} sx={{mb:2}}></Grid>
                                <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy', fontSize: '12px'}}>{t('ACCOUNT')}</Typography></Grid>
                            </Grid>
                            <Grid display={'flex'}>
                                <Grid xs={2} sx={{mb:2}}><AccountBalanceWalletIcon fontSize='small'  color="primary" sx={{borderRadius: "50%"}}></AccountBalanceWalletIcon></Grid>
                                <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy'}}>{bank} $</Typography></Grid>
                            </Grid>
                        </MoneyPlayerItemGrid>
                    </MoneyPlayerGrid>
                </ParrentGrid>
            </Header>
            <Center>
                <CenterParrentGrid>
                    <CenterParrentGridItem xs={1}></CenterParrentGridItem>
                    <CenterParrentGridItem style={{...centerSpring}}  xs={8} sx={{width: "100%"}}>
                        {selectedItem === undefined || selectedItem === null ? (
                            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ width: "100%", height: "100%"}}>
                                <RemoveShoppingCartIcon fontSize="large" sx={{mr:4, color: "#232323"}}></RemoveShoppingCartIcon>
                                <Typography variant='h4' color={"#232323"}>{t('EMPTY_PRODUCT')}</Typography>
                            </Grid>
                        ):(
                            <Grid sx={{width: "100%", height: "100%", m:5}}>
                                <Grid sx={{width:"70%", height:"20%"}}>
                                    <Typography variant='h5' sx={{fontFamily: "Title", mb:2}} color={'primary'}>{t(selectedItem.name)}</Typography>
                                    <Typography  sx={{fontFamily: "Gilroy", fontSize: "14px"}} color={'#ffffff'}>{t(`${selectedItem.name.toUpperCase()}_DECRIPTION`)}</Typography>
                                </Grid>
                                <Grid display={"flex"} sx={{width: "100%",height:"35%"}}>
                                    <WeaponCenterImg src={`./assets/weaponShop/${selectedItem.name.toLowerCase()}.webp`}/>
                                    
                                </Grid>
                                <Grid display={"flex"} flexDirection={"column"} spacing={10} justifyContent={"center"} sx={{width: "100%",height:"35%"}}>
                                    <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                        <Grid xs={1} display={"flex"} alignItems={"center"}>
                                            <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>{t('DAMAGE')}</Typography>
                                        </Grid>
                                        <Grid xs={5}  display={"flex"} alignItems={"center"}>
                                            <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={selectedItem.damage}/>
                                        </Grid>
                                        <Grid xs={1}  display={"flex"} alignItems={"center"}>
                                            <Typography sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px", ml:1}}>{selectedItem.damage}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                        <Grid xs={1} display={"flex"} alignItems={"center"}>
                                            <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>{t('RANGE')}</Typography>
                                        </Grid>
                                        <Grid xs={5} display={"flex"} alignItems={"center"}>
                                            <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={selectedItem.range}/>
                                        </Grid>
                                        <Grid xs={1}  display={"flex"} alignItems={"center"}>
                                            <Typography sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px", ml:1}}>{selectedItem.range}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                        <Grid xs={1} display={"flex"} alignItems={"center"}>
                                            <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>{t('SPEED')}</Typography>
                                        </Grid>
                                        <Grid xs={5} display={"flex"} alignItems={"center"}>
                                            <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={selectedItem.firerate}/>
                                        </Grid>
                                        <Grid xs={1}  display={"flex"} alignItems={"center"}>
                                            <Typography sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px", ml:1}}>{selectedItem.firerate}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                        <Grid xs={1} display={"flex"} alignItems={"center"}>
                                            <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>{t('RECOIL')}</Typography>
                                        </Grid>
                                        <Grid xs={5} display={"flex"} alignItems={"center"}>
                                            <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={selectedItem.accuracy}/>
                                        </Grid>
                                        <Grid xs={1}  display={"flex"} alignItems={"center"}>
                                            <Typography sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px", ml:1}}>{selectedItem.accuracy}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                        <Grid xs={1} display={"flex"} alignItems={"center"}>
                                            <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>{t('CONTROL')}</Typography>
                                        </Grid>
                                        <Grid xs={5} display={"flex"} alignItems={"center"}>
                                            <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={selectedItem.control}/>
                                        </Grid>
                                        <Grid xs={1}  display={"flex"} alignItems={"center"}>
                                            <Typography sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px", ml:1}}>{selectedItem.control}</Typography>
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                            </Grid> 
                        )}  
                    </CenterParrentGridItem>
                    <CenterParrentGridItem style={{...rightSpring}} display={"flex"} justifyContent={"center"} alignItems={"center"} xs={3} >
                        <Grid sx={{ width: "80%", height: "90%", borderLeft: "2px solid #FF0B30"}}>
                            <Grid sx={{width: "100%", height: "10%"}} xs={12} display={"flex"} justifyContent={"center"}>
                                <Typography variant='h5' sx={{fontFamily: "Title", fontWeight: "bold", width: "60%", textAlign: "center"}} color={'primary'}>{t('EXPENSE')}</Typography>
                            </Grid>
                            <Grid sx={{width: "100%", height: "30%"}} xs={12} display={"flex"} flexDirection={"column"} >
                                <Typography variant='body1' sx={{fontFamily: "Gilroy", fontWeight: "bold", width: "90%", ml:4, mb: 2}} color={'#ffffff'}>{t('BILL')}: {selectedItem?.price} $</Typography>
                                <Typography variant='body1' sx={{fontFamily: "Gilroy", fontWeight: "bold", width: "90%", ml:4, mb: 4}} color={'#ffffff'}>{t('TAX')}: {selectedItem !== undefined ?selectedItem.price * 10 / 100 : 0} $</Typography>
                                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} xs={12} sx={{p:2, mb:3}} width={"100%"}>
                                    <FormControl fullWidth>
                                    <InputLabel sx={{fontSize:"16px", ml:2}} id="demo-simple-select-error-label">{t('PAYMENT_METHOD')}</InputLabel>
                                    <Select sx={{fontSize: "16px", ml:2}}
                                    value={buyAccount} 
                                    label={t('PAYMENT_METHOD')}
                                    labelId="demo-simple-select-error-label"
                                    onChange={switchAccount}>
                                        <MenuItem value={'cash'}>{t('CASH')}</MenuItem>
                                        <MenuItem value={'bank'}>{t('BANK')}</MenuItem>
                                    </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} width={"100%"} height={"30%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ mb:3}} >
                                    <Grid width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography textAlign={"center"} sx={{fontFamily:"Gilroy", fontWeight:"bold",p:2,width: "94%",height: "100%", border: "1px solid #FF0B30", ml:4, backgroundColor: "rgba(255, 11, 48,0.3)"}}>{t('TOTAL')}: {selectedItem !== undefined ? selectedItem.price * 1.1 : 0}$</Typography>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{p:1}}>
                                    {LIST_WEAPON_GROUP.length === 0 ? (
                                        <Button variant='contained' disabled sx={{width: "100%", ml:3, fontFamily:"Title"}}>{t('BUY')}</Button>
                                    ):(
                                        <Button variant='contained' sx={{width: "100%", ml:3, fontFamily:"Title"}} onClick={onSubmit}>{t('BUY')}</Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </CenterParrentGridItem>
                </CenterParrentGrid>
            </Center>
            <Bottom>
                <BottomParrentGrid >
                    <Grid xs={1}></Grid>
                    <BottomParrentGridItem style={{...bottomSpring}} container sx={{mt: 1,width: '100%', overflowX: 'auto', overflowY: 'hidden'}} wrap={"nowrap"} xs={10}>
                        {selectedGroupItems.length === 0 ? (
                            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{width: "100%", height: "100%"}}>
                                <RemoveShoppingCartIcon fontSize="large" sx={{mr:4, color: "#232323"}}></RemoveShoppingCartIcon>
                                <Typography variant='h4' color={"#232323"}>{t('EMPTY_PRODUCT')}</Typography>
                            </Grid>
                        ) : (
                            selectedGroupItems.map((e, i) => (
                                <BottomParrentGridItemWeapon item xs={3} sx={{p:1, m:1, textTransform: 'uppercase'}} onClick={()=>setSelectedItem(e)}>
                                    <Grid sx={{width: "100%", height: "100%", backgroundColor: "#FF0B30", borderRadius: "4px"}}>
                                        <Grid position={"relative"} sx={{width: "100%", height: "100%", clipPath: "polygon(3% 0, 97% 0, 100% 5%, 100% 95%, 97% 100%, 3% 100%, 0 95%, 0 5%)", backgroundColor: "#232323"}}>
                                            <Grid sx={{width:"100%"}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                <WeaponBottomImg src={`./assets/weaponShop/${e.name.toLowerCase()}.webp`}/>
                                            </Grid>
                                            <Grid position={"absolute"} sx={{bottom: 5, left: 5, width: "95%"}}>
                                                <Grid display={"flex"} sx={{width: "100%"}}>
                                                    <Grid xs={6} >
                                                        <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontSize: "12px", width: "100%"}}>
                                                            {t(e.name)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={6} position={"absolute"} textAlign={"right"} sx={{bottom: "0", right: "0"}} >
                                                        <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontSize: "12px", width: "100%"}}>
                                                            {e.price} $
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </BottomParrentGridItemWeapon>
                            ))
                        )}
                    </BottomParrentGridItem>
                    <Grid xs={1}></Grid>
                </BottomParrentGrid>
            </Bottom>
        </Container>
        : null
    )
    );
};
const WeaponShopPage = {
    element : WeaponShop,
    needLogin: true
}


export default WeaponShopPage;