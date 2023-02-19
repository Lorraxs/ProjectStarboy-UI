import React, { useState, useEffect  } from 'react';
import useShow from '../hooks/useShow';
import { Grid, InputLabel, Typography, Button, MenuItem, Select, SelectChangeEvent, LinearProgress } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; 
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import styled from 'styled-components';
import { cRequest } from '../utils/request'
import { DefaultWeaponInfomation, WeaponListType, WeaponShopType, EWeaponShopTypeSubTittle } from '../shared/interfaces';
import { AnimatedGrid } from '../components/animated-mui'
import FormControl from '@mui/material/FormControl/FormControl';
import { animated } from '@react-spring/web'

const request = new cRequest()


const Container = styled(Grid)`
    width: 100%;
    height: 100%;
    background-color: rgba(49, 49, 49, 0.788);
    pointer-events: all;
`
const Body = styled(Grid)`
    width: 80%;
    height: 80%;
    background-color: #111111;
`
const Header = styled(Grid)`
    width: 100%;
    height: 13%;
    display:flex;
`
const Center = styled(Grid)`
    width: 100%;
    height: 70%;
    border-bottom: 1px solid #232323;
`

const Bottom = styled(Grid)`
    width: 100%;
    height: 17%;
`

const ParrentGrid = styled(Grid)`
    height: 100%;
    display: flex;

`

const CenterParrentGrid = styled(Grid)`
    height: 100%;
    display: flex;

`
const CenterParrentGridItem = styled(Grid)`
    height: 100%;
`

const BottomParrentGrid = styled(Grid)`
    height: 100%;
    display: flex;

`
const BottomParrentGridItem = styled(Grid)`
    height: 90%;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        height:5px;
        
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
const BottomParrentGridItemWeapon = styled(Grid)`
    min-width: calc(20% - 15px);
    cursor: pointer;

`



const ParrentItemGrid = styled(AnimatedGrid)`
    min-width: 8%;
    text-align: center;
    cursor: pointer;
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

const Tittle = styled(AnimatedGrid)`
    min-width: 8%;
    text-align: center; 
`
const WeaponCenterImg = styled(animated.img)`
    position: relative
    width: 100%;
    height: 100%;
    margin-top: -5%;
    

`

const WeaponBottomImg = styled(animated.img)`
    width: 90%;
    height: 90%;

`


function WeaponShop(){
    const [show, setShow] = useShow(process.env.NODE_ENV === 'development', 'WeaponShop', true, true, true, false)
    const [menuList, setMenuList] = useState("Meele");
    const selectedList = WeaponListType[menuList as keyof typeof WeaponListType];
    const [selectedWeapon, setselectedWeapon] = useState( selectedList[0]);
    const weaponPrice = DefaultWeaponInfomation[selectedWeapon]?.price?? 0;
    const feeWeaponPrice = (DefaultWeaponInfomation[selectedWeapon]?.price?? 0) * 0.1;
    const [buyAccount, setBuyAccount] = useState('money')
    const [data, setData] = useState({ name: '', totalprice: 0, type: '', account: ''});
    console.log(buyAccount);

    useEffect(() => {
        setselectedWeapon(selectedList[0])
      }, [selectedList]);

      useEffect(() => {
        setData({
            name: selectedWeapon,
            totalprice: weaponPrice + feeWeaponPrice,
            type: DefaultWeaponInfomation[selectedWeapon]?.type?? null,
            account: buyAccount
        })
      }, [selectedWeapon, weaponPrice, feeWeaponPrice, buyAccount]);

      const onSubmit = () =>{
        console.log(data);
        request.post('WeaponShop:Buy', data)
      }

      const switchAccount = (event: SelectChangeEvent) => {
        setBuyAccount(event.target.value as string)
      }

    return ( show ?
        <Container container justifyContent={'center'} alignItems={'center'}>
            <Body>
                <Header>
                    <ParrentGrid xs={9}  justifyContent={'center'} alignItems={'center'} sx={{borderBottom: "1px solid #232323", borderRight: "1px solid #232323"}}>
                        <Tittle xs={2} sx={{m:2}}>
                                <Typography variant='h5' sx={{ fontFamily: "Title", fontWeight: 'bold', color: '#ff0b30'}}>
                                    SHOP
                                </Typography>
                                <Typography variant='h5' sx={{ fontFamily: "Title", fontWeight: 'bold', color: '#ff0b30'}}>
                                    SÚNG
                                </Typography>
                        </Tittle>
                        {WeaponShopType.map((i) => (
                            <ParrentItemGrid  sx={{m:2, p:2, textTransform: 'uppercase'}} onClick={ ()=> setMenuList(i)}>
                                <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontWeight: 'bold'}}>
                                    {EWeaponShopTypeSubTittle[i as keyof typeof EWeaponShopTypeSubTittle]}
                                </Typography>
                            </ParrentItemGrid>
                        ))}
                    </ParrentGrid>
                    <ParrentGrid xs={3} justifyContent={"center"} alignItems={"center"} sx={{borderBottom: "1px solid #232323"}}>
                        <MoneyPlayerGrid display={"flex"}>
                            <MoneyPlayerItemGrid xs={6}>
                                <Grid display={'flex'}>
                                    <Grid xs={2} sx={{mb:2}}></Grid>
                                    <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy', fontSize: '12px'}}>Tiền Mặt</Typography></Grid>
                                </Grid>
                                <Grid display={'flex'}>
                                    <Grid xs={2} sx={{mb:2}}><AttachMoneyIcon fontSize='small'  color="primary" sx={{borderRadius: "50%"}}></AttachMoneyIcon></Grid>
                                    <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy'}}>1.000.000$</Typography></Grid>
                                </Grid>
                            </MoneyPlayerItemGrid>
                            <MoneyPlayerItemGrid xs={6}>
                                <Grid display={'flex'}>
                                    <Grid xs={2} sx={{mb:2}}></Grid>
                                    <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy', fontSize: '12px'}}>Tài khoản</Typography></Grid>
                                </Grid>
                                <Grid display={'flex'}>
                                    <Grid xs={2} sx={{mb:2}}><AccountBalanceWalletIcon fontSize='small'  color="primary" sx={{borderRadius: "50%"}}></AccountBalanceWalletIcon></Grid>
                                    <Grid xs={9}><Typography sx={{fontFamily: 'Gilroy'}}>1.000.000$</Typography></Grid>
                                </Grid>
                            </MoneyPlayerItemGrid>
                        </MoneyPlayerGrid>
                    </ParrentGrid>
                </Header>
                <Center>
                    <CenterParrentGrid>
                        <CenterParrentGridItem xs={1}></CenterParrentGridItem>
                        <CenterParrentGridItem xs={8} sx={{width: "100%"}}>
                            {selectedWeapon === undefined || selectedWeapon === null ? (
                                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ width: "100%", height: "100%"}}>
                                    <RemoveShoppingCartIcon fontSize="large" sx={{mr:4, color: "#232323"}}></RemoveShoppingCartIcon>
                                    <Typography variant='h4' color={"#232323"}>Không có sản phẩm</Typography>
                                </Grid>
                            ):(
                                <Grid sx={{width: "100%", height: "100%", m:5}}>
                                    <Grid sx={{width:"70%", height:"18%"}}>
                                        <Typography variant='h5' sx={{fontFamily: "Title", mb:2}} color={'primary'}>{DefaultWeaponInfomation[selectedWeapon].tittle}</Typography>
                                        <Typography  sx={{fontFamily: "Gilroy", fontSize: "14px"}} color={'#ffffff'}>{DefaultWeaponInfomation[selectedWeapon].description}</Typography>
                                    </Grid>
                                    <Grid sx={{width: "100%",height:"40%"}}>
                                        <WeaponCenterImg src={`./assets/weaponShop/${selectedWeapon}.webp`}/>
                                    </Grid>
                                    <Grid display={"flex"} flexDirection={"column"} spacing={10} justifyContent={"center"} sx={{width: "100%",height:"35%"}}>
                                        <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                            <Grid xs={1} display={"flex"} alignItems={"center"}>
                                                <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>Damage</Typography>
                                            </Grid>
                                            <Grid xs={5}  display={"flex"} alignItems={"center"}>
                                                <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={DefaultWeaponInfomation[selectedWeapon].damage}/>
                                            </Grid>
                                        </Grid>
                                        <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                            <Grid xs={1} display={"flex"} alignItems={"center"}>
                                                <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>Tầm xa</Typography>
                                            </Grid>
                                            <Grid xs={5} display={"flex"} alignItems={"center"}>
                                                <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={DefaultWeaponInfomation[selectedWeapon].range}/>
                                            </Grid>
                                        </Grid>
                                        <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                            <Grid xs={1} display={"flex"} alignItems={"center"}>
                                                <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>Tốc độ</Typography>
                                            </Grid>
                                            <Grid xs={5} display={"flex"} alignItems={"center"}>
                                                <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={DefaultWeaponInfomation[selectedWeapon].firerate}/>
                                            </Grid>
                                        </Grid>
                                        <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                            <Grid xs={1} display={"flex"} alignItems={"center"}>
                                                <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>Độ giật</Typography>
                                            </Grid>
                                            <Grid xs={5} display={"flex"} alignItems={"center"}>
                                                <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={DefaultWeaponInfomation[selectedWeapon].accuracy}/>
                                            </Grid>
                                        </Grid>
                                        <Grid height={"20%"} display={"flex"} flexDirection={"row"}>
                                            <Grid xs={1} display={"flex"} alignItems={"center"}>
                                                <Typography color={"primary"}  sx={{textTransform: "uppercase", fontFamily: "Title", fontSize: "12px"}}>Điều khiển</Typography>
                                            </Grid>
                                            <Grid xs={5} display={"flex"} alignItems={"center"}>
                                                <LinearProgress sx={{height: "30%",flexGrow: 1}} variant="determinate" value={DefaultWeaponInfomation[selectedWeapon].control}/>
                                            </Grid>
                                        </Grid>
                                        
                                    </Grid>
                                </Grid> 
                            )}  
                        </CenterParrentGridItem>
                        <CenterParrentGridItem display={"flex"} justifyContent={"center"} alignItems={"center"} xs={3} >
                            <Grid sx={{ width: "80%", height: "90%", borderLeft: "2px solid #FF0B30"}}>
                                <Grid sx={{width: "100%", height: "10%"}} xs={12} display={"flex"} justifyContent={"center"}>
                                    <Typography sx={{fontFamily: "Title", fontSize: "12px", fontWeight: "bold", width: "60%", textAlign: "center"}} color={'primary'}>chi phí</Typography>
                                </Grid>
                                <Grid sx={{width: "100%", height: "30%"}} xs={12} display={"flex"} flexDirection={"column"} >
                                    <Typography sx={{fontFamily: "Gilroy", fontSize: "13px", fontWeight: "bold", width: "90%", ml:4, mb: 2}} color={'#ffffff'}>Thanh toán: {weaponPrice} $</Typography>
                                    <Typography sx={{fontFamily: "Gilroy", fontSize: "13px", fontWeight: "bold", width: "90%", ml:4, mb: 4}} color={'#ffffff'}>Thuế: {feeWeaponPrice} $</Typography>
                                    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} xs={12} sx={{p:2, mb:3}} width={"100%"}>
                                        <FormControl fullWidth>
                                        <InputLabel sx={{fontSize:"13px", ml:2}} id="demo-simple-select-error-label">Tài khoản thanh toán</InputLabel>
                                        <Select sx={{fontSize: "13px", ml:2}}
                                        value={buyAccount} 
                                        label="Tài khoản thanh toán "
                                        labelId="demo-simple-select-error-label"
                                        onChange={switchAccount}>
                                            <MenuItem value={'money'}>Tiền Mặt</MenuItem>
                                            <MenuItem value={'bank'}>Tài khoản</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} width={"100%"} height={"30%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ mb:3}} >
                                        <Grid width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            <Typography textAlign={"center"} sx={{fontFamily:"Gilroy", fontWeight:"bold",p:2,width: "92%",height: "100%", border: "1px solid #FF0B30", ml:4, backgroundColor: "rgba(255, 11, 48,0.3)"}}>Tổng: {weaponPrice + feeWeaponPrice}$</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{p:1}}>
                                        {selectedList.length === 0 ? (
                                            <Button variant='contained' disabled sx={{width: "100%", ml:3, fontFamily:"Title"}}>MUA</Button>
                                        ):(
                                            <Button variant='contained' sx={{width: "100%", ml:3, fontFamily:"Title"}} onClick={onSubmit}>MUA</Button>
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
                        <BottomParrentGridItem container sx={{mt: 1,width: '100%', overflowX: 'auto', overflowY: 'hidden'}} wrap={"nowrap"} xs={10}>
                            {selectedList.length === 0 ? (
                                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{width: "100%", height: "100%"}}>
                                    <RemoveShoppingCartIcon fontSize="large" sx={{mr:4, color: "#232323"}}></RemoveShoppingCartIcon>
                                    <Typography variant='h4' color={"#232323"}>Không có sản phẩm</Typography>
                                </Grid>
                            ) : (
                                selectedList.map((i) => (
                                    <BottomParrentGridItemWeapon item sx={{p:1, m:1, textTransform: 'uppercase'}} onClick={()=>setselectedWeapon(i)}>
                                        <Grid sx={{width: "100%", height: "100%", backgroundColor: "#FF0B30", borderRadius: "4px"}}>
                                            <Grid position={"relative"} sx={{width: "100%", height: "100%", clipPath: "polygon(3% 0, 97% 0, 100% 5%, 100% 95%, 97% 100%, 3% 100%, 0 95%, 0 5%)", backgroundColor: "#232323"}}>
                                                <Grid sx={{width:"100%"}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                                    <WeaponBottomImg src={`./assets/weaponShop/${i}.webp`}/>
                                                </Grid>
                                                <Grid position={"absolute"} sx={{bottom: 5, left: 5, width: "95%"}}>
                                                    <Grid display={"flex"} sx={{width: "100%"}}>
                                                        <Grid xs={6} >
                                                            <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontSize: "12px", width: "100%"}}>
                                                                {DefaultWeaponInfomation[i].tittle}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6} position={"absolute"} textAlign={"right"} sx={{bottom: "0", right: "0"}} >
                                                            <Typography sx={{color: "#fffffff", fontFamily: 'Gilroy', fontSize: "12px", width: "100%"}}>
                                                                {DefaultWeaponInfomation[i]?.price?? 0} $
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
            </Body>
        </Container>
        : null
    );
};
const WeaponShopPage = {
    element : WeaponShop,
    needLogin: false
}


export default WeaponShopPage;
