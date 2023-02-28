import { useState , useEffect} from "react";
import { useTranslation } from "react-i18next";
import useShow from "../hooks/useShow";
import { RootState } from "../store";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from "react-redux";
import {animated, config, useSpringRef, useSpring, useChain, useTransition } from '@react-spring/web';
import styled from "styled-components";
import { AnimatedGrid } from "../components/animated-mui";
import { Button, Grid, Typography, TextField} from "@mui/material";
import { IDialogBank , IDataBank, ISavingsCreate} from "../shared/interfaces"; 
import PersonIcon from '@mui/icons-material/Person';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CloseIcon from '@mui/icons-material/Close';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import SavingsIcon from '@mui/icons-material/Savings';
import Moment from 'moment';
import moment from 'moment';
import { Controller, useForm  } from "react-hook-form";
import { cRequest } from '../utils/request'

const request = new cRequest()

const schema = yup.object().shape({
    amount: yup.number().required('123'),
    targetPlayerID: yup.number().required('456'),
    type: yup.string().required('789'),
})

// const schemaSavings = yup.object().shape({
//     amount: yup.number().required(''),
//     duration: yup.number().required(''),
//     interest: yup.number().required(''),
// })


const Container= styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/bankSystem/bank_bg.png');
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
`

const DialogDeposit = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:  linear-gradient(45deg, #55763c 30%, rgba(0, 0, 0, 0.4) 90%);
    z-index: 9999;
`

const DialogWithDraw = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:  linear-gradient(45deg, rgba(255, 11, 48, 0.8) 50%, rgba(0, 0, 0, 0.4) 90%);
    z-index: 9999;
`

const DialogTransfer = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:  linear-gradient(45deg, #a1863f 20%, rgba(0, 0, 0, 0.4) 90%);
    z-index: 9999;
`

const HeaderBank = styled(AnimatedGrid)`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
`
const CenterBank = styled(AnimatedGrid)`
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: center;
`

const BottomBank = styled(AnimatedGrid)`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: right;
`
const CenterButton = styled(AnimatedGrid)`
    cursor: pointer;
    min-width: 32%;
    &:hover {
        transform: scale(1.1);
    };
    transition: transform  0.3s ease;
`
const ButtonCloseDialog = styled(AnimatedGrid)`
    &:hover {
        transform: scale(1.1);
    };
    transition: transform  0.3s ease;
    cursor: pointer;
`

const BankLogo = styled(animated.img)`
    width: 90%;
    margin-left: 5%;
    object-fit: fill;
`

const TransactionsListScrollBar = styled(AnimatedGrid)`
    
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        width: 0px;
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
`

const TransactionsListItem = styled(AnimatedGrid)`
    cursor: pointer;
    width: 99%;
    height: 25%;
    border-radius: 10px;
`

function BankSystem() {
    const {t} = useTranslation('common');
    const [show] = useShow(process.env.NODE_ENV === 'development', 'HUD', false, false, false, false)
    const bank = useSelector((state:RootState)=>state.player.bank)
    const TransactionsList = useSelector((state:RootState)=>state.bankSystem.TransictionsList)
    const SavingsList = useSelector((state:RootState)=>state.bankSystem.SavingsList)
    const now = new Date();
    const now1 =  moment();

    const sortedTransactions =  [...TransactionsList].sort((a, b) => {
        const aDiff = Math.abs(now.getTime() - new Date(a.date).getTime());
        const bDiff = Math.abs(now.getTime() - new Date(b.date).getTime());
        return aDiff - bDiff;
    });


    const [openDialog, setOpenDialog] = useState<IDialogBank>({
        deposit: false,
        withDraw: false,
        transfer: false,
    });
    
    const [defaultValues, setDefaultValue] = useState<IDataBank>({
        amount: 0,
        targetPlayerID: 0,
        type: "",
    });

    const [defaultSavingsInfo, setDefaultSavingsInfo] = useState<ISavingsCreate>({
        amount: 0,
        duration: 0,
        interest: 0,
    });


    

    useEffect(() => {
        if (openDialog.deposit) {
            setDefaultValue({
                amount: 0,
                targetPlayerID: 0,
                type: "deposit",
            });
            } else if (openDialog.withDraw) {
                setDefaultValue({
                amount: 0,
                targetPlayerID: 0,
                type: "withdraw",
            });
            } else if (openDialog.transfer) {
                setDefaultValue({
                amount: 0,
                targetPlayerID: 0,
                type: "transfer",
            });
            }
            else{
                setDefaultValue({
                    amount: 0,
                    targetPlayerID: 0,
                    type: "",
            });
        }
    }, [openDialog]);



    const topSpringRef = useSpringRef();
    const topSpring = useSpring({
        ref: topSpringRef,
        from: { y: -100, opacity: 0 },
        to: { y: show ? 0 : -100, opacity: show ? 1 : 0 },
    })

    const transRef = useSpringRef()
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

    const transitionsDialog = useTransition(openDialog, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {...config.molasses, duration: 300}
    })
    
    useChain(show ? [transRef, topSpringRef, leftSpringRef, rightSpringRef] : [rightSpringRef, leftSpringRef, topSpringRef ,transRef ], show ? 
        [0.0, 0.5, 0.5, 0.5]:
        [0.5, 0.5, 0.5, 0.0], 
    1000)

    const {control, handleSubmit, formState: { errors}} = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })



    const onSubmit = (data: any) => {
        console.log('123123123');
    };




    const onSavingsClaim = (data: string) => {
        request.post('BankSystem:ClaimSavings', data)
    }
    
    return transitions((style, show) => (show ? 
        <Container style={{...style}}>
            {transitionsDialog((style, openDialog) => (
            openDialog.deposit && (
                <DialogDeposit style={{ ...style }}>
                    <AnimatedGrid sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url('/assets/bankSystem/bank_bg_wrapper.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        position: "absolute",
                    }}>
                        <HeaderBank container>
                            <AnimatedGrid item xs={8} height={"100%"} display={"flex"}   wrap="nowrap">
                                <AnimatedGrid width={"30%"} height={"100%"}
                                    sx={{postition: "relative"}} display={"flex"} justifyContent={"center"}>
                                    <Grid width={"12%"} height={"17%"} sx={{
                                        ml: "-5%",
                                        borderLeft: "1px solid rgba(120, 168, 84, 1)",
                                        borderRight: "1px solid rgba(120, 168, 84, 1)",
                                        borderBottom: "1px solid rgba(120, 168, 84, 1)",
                                        position: "absolute",
                                        borderRadius: "0px 0px 45px 45px"
                                    }}>     
                                    </Grid>
                                    <Grid width={"11%"} height={"16%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        ml: "-5%",
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #9dd173 40%, #78a854 90%)",
                                        borderRadius: "0px 0px 40px 40px"
                                    }}>
                                        <Grid width={"100%"} height={"50%"}>
                                            <BankLogo src={`./assets/bankSystem/fleeca.png`}/>
                                        </Grid>
                                    </Grid>
                                    <Grid width={"5%"} height={"36%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #9dd173 40%, #78a854 90%)",
                                        borderRadius: "0px 0px 30px 30px",
                                        left: "3%"
                                    }}>
                                        <AddCardIcon sx={{fontSize:"35px", position: "absolute", bottom: "5%"}}></AddCardIcon>
                                    </Grid>
                                    <ButtonCloseDialog onClick={() => setOpenDialog({...openDialog, deposit: false})} width={"2%"} height={"3%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #78a854 40%, #9dd173 90%)",
                                        borderRadius: "10px",
                                        right: "3%",
                                        top: "3%"
                                    }}>
                                        <CloseIcon sx={{fontSize:"35px"}}></CloseIcon>
                                    </ButtonCloseDialog>
                                </AnimatedGrid>
                                <AnimatedGrid width={"60%"} height={"100%"} justifyContent={"center"} sx={{pt: "2%"}}>
                                </AnimatedGrid>
                                <AnimatedGrid container width={"30%"} sx={{pt: "2%"}}>
                                </AnimatedGrid>
                            </AnimatedGrid>
                        </HeaderBank>
                        <CenterBank display={"flex"} alignItems={"center"}>
                            <Grid width={"25%"} height={"40%"}>
                                <Typography variant="h5" textAlign={"center"} sx={{
                                    fontFamily: "Title",
                                    fontWeight: "bold",
                                    mb: "2%"
                                }}>
                                    {t('BANK_DEPOSIT_TITLE')}
                                </Typography>
                                <Typography variant="body1" textAlign={"center"} sx={{
                                    fontFamily: "Gilroy",
                                    mb: "3%"
                                }}>
                                    {t('BANK_DEPOSIT_DESCRIPTION')}
                                </Typography>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Controller 
                                        name='amount'
                                        control={control}
                                        render={({field: { onChange}})=>(
                                        <TextField color="warning" label={t('BANK_DEPOSIT_INPUT')} variant='filled' onChange={onChange} error={Boolean(errors.amount)} fullWidth />
                                        )}      
                                    />
                                    <AnimatedGrid  width={"100%"} sx={{mt: "3%"}} display={"flex"} >
                                        <Grid width={"90%"}>
                                            <Button variant="contained" fullWidth sx={{
                                                backgroundColor:"rgba(120, 168, 84, 0.5)",
                                                "&:hover": { backgroundColor: "rgba(120, 168, 84, 1)" , transform: "scale(1.1)"},
                                                transition: "all 0.5s ease"
                                            }}>{t('ACCEPT_BANK')}</Button>
                                        </Grid>
                                        <Grid width={"10%"}></Grid>
                                        <Grid width={"90%"}>
                                            <Button variant="contained" fullWidth sx={{
                                                    backgroundColor:"rgba(120, 168, 84, 0.5)",
                                                    "&:hover": { backgroundColor: "rgba(120, 168, 84, 1)" , transform: "scale(1.1)"},
                                                    transition: "all 0.5s ease"
                                            }} onClick={() => setOpenDialog({...openDialog, deposit: false})}>{t('CANCEL_BANK')}</Button>
                                        </Grid>
                                    </AnimatedGrid>
                                </form>
                            </Grid>
                        </CenterBank>
                        <BottomBank container>
                            <AnimatedGrid item xs={5} display={"flex"} justifyContent={"right"} alignItems={"center"}>
                                <Grid width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                    <Typography width={"100%"} variant="h6" color={"#9dd173"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('YOUR_BANK')}</Typography>
                                    <Typography width={"100%"} variant="body1" color={"white"} sx={{mt: "2%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('BALANCE_BANK')}</Typography>
                                </Grid>
                                <Grid width={"30%"} display={"flex"} alignItems={"center"}>
                                    <Typography width={"100%"} variant="h5" color={"#9dd173"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{bank.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                                </Grid>
                                <Grid width={"40%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                    <hr style={{position: "absolute", right:0, bottom: "9%",width: "15%", height: "5px", backgroundColor: "#9dd173", borderRadius: "10px", border:"none"}}></hr>
                                    <hr  style={{position: "absolute", right:0, bottom: "8%",width: "10%", height: "3px", backgroundColor: "#9dd173", borderRadius: "10px", border:"none"}}></hr>
                                </Grid>
                            </AnimatedGrid>
                        </BottomBank>
                    </AnimatedGrid>
                </DialogDeposit>
            )
            ))}
            {transitionsDialog((style, openDialog) => (
            openDialog.withDraw && (
                <DialogWithDraw style={{ ...style }}>
                    <AnimatedGrid sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url('/assets/bankSystem/bank_bg_wrapper.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        position: "absolute",
                    }}>
                        <HeaderBank container>
                            <AnimatedGrid item xs={8} height={"100%"} display={"flex"}   wrap="nowrap">
                                <AnimatedGrid width={"30%"} height={"100%"}
                                    sx={{postition: "relative"}} display={"flex"} justifyContent={"center"}>
                                    <Grid width={"12%"} height={"17%"} sx={{
                                        ml: "-5%",
                                        borderLeft: "1px solid rgba(255, 11, 48, 1)",
                                        borderRight: "1px solid rgba(255, 11, 48, 1)",
                                        borderBottom: "1px solid rgba255, 11, 48, 1)",
                                        position: "absolute",
                                        borderRadius: "0px 0px 45px 45px"
                                    }}>     
                                    </Grid>
                                    <Grid width={"11%"} height={"16%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        ml: "-5%",
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #ff082d 20%, #730112 90%)",
                                        borderRadius: "0px 0px 40px 40px"
                                    }}>
                                        <Grid width={"100%"} height={"50%"}>
                                            <BankLogo src={`./assets/bankSystem/fleeca.png`}/>
                                        </Grid>
                                    </Grid>
                                    <Grid width={"5%"} height={"36%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #ff082d 20%, #730112 90%)",
                                        borderRadius: "0px 0px 30px 30px",
                                        left: "3%"
                                    }}>
                                        <CreditScoreIcon sx={{fontSize:"35px", position: "absolute", bottom: "5%"}}></CreditScoreIcon>
                                    </Grid>
                                    <ButtonCloseDialog onClick={() => setOpenDialog({...openDialog, withDraw: false})} width={"2%"} height={"3%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #ff082d 20%, #730112 90%)",
                                        borderRadius: "10px",
                                        right: "3%",
                                        top: "3%"
                                    }}>
                                        <CloseIcon sx={{fontSize:"35px"}}></CloseIcon>
                                    </ButtonCloseDialog>
                                </AnimatedGrid>

                                <AnimatedGrid width={"60%"} height={"100%"} justifyContent={"center"} sx={{pt: "2%"}}>
                                </AnimatedGrid>
                                <AnimatedGrid container width={"30%"} sx={{pt: "2%"}}>
                                </AnimatedGrid>
                            </AnimatedGrid>
                        </HeaderBank>
                        <CenterBank display={"flex"} alignItems={"center"}>
                            <Grid width={"25%"} height={"40%"}>
                                <Typography variant="h5" textAlign={"center"} sx={{
                                    fontFamily: "Title",
                                    fontWeight: "bold",
                                    mb: "2%"
                                }}>
                                    {t('BANK_WITHDRAW_TITLE')}
                                </Typography>
                                <Typography variant="body1" textAlign={"center"} sx={{
                                    fontFamily: "Gilroy",
                                    mb: "3%"
                                }}>
                                    {t('BANK_WITHDRAW_DESCRIPTION')}
                                </Typography>
                                {/* <form id="form2" onSubmit={handleSubmit(onSubmitDialogs)}>
                                    <Controller 
                                        name='amount'
                                        control={control}
                                        render={({field: {value, onChange}})=>(
                                        <TextField color="warning" label={t('BANK_WITHDRAW_INPUT')} variant='filled' onChange={onChange} error={Boolean(errors.amount)} fullWidth/>
                                        )}          
                                    />
                                    <AnimatedGrid  width={"100%"} sx={{mt: "3%"}} display={"flex"} >
                                        <Grid width={"90%"}>
                                            <Button variant="contained" fullWidth sx={{
                                                backgroundColor:"rgba(255, 11, 48, 0.5)",
                                                "&:hover": { backgroundColor: "rgba(255, 11, 48, 1)" , transform: "scale(1.1)"},
                                                transition: "all 0.5s ease"
                                            }} type='submit'>{t('ACCEPT_BANK')}</Button>
                                        </Grid>
                                        <Grid width={"10%"}></Grid>
                                        <Grid width={"90%"}>
                                            <Button variant="contained" fullWidth sx={{
                                                    backgroundColor:"rgba(255, 11, 48, 0.5)",
                                                    "&:hover": { backgroundColor: "rgba(255, 11, 48, 1)" , transform: "scale(1.1)"},
                                                    transition: "all 0.5s ease"
                                            }} onClick={() => setOpenDialog({...openDialog, withDraw: false})}>{t('CANCEL_BANK')}</Button>
                                        </Grid>
                                    </AnimatedGrid>
                                </form> */}
                            </Grid>
                        </CenterBank>
                        <BottomBank container>
                            <AnimatedGrid item xs={5} display={"flex"} justifyContent={"right"} alignItems={"center"}>
                                <Grid width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                    <Typography width={"100%"} variant="h6" color={"#fa3e5b"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('YOUR_BANK')}</Typography>
                                    <Typography width={"100%"} variant="body1" color={"white"} sx={{mt: "2%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('BALANCE_BANK')}</Typography>
                                </Grid>
                                <Grid width={"30%"} display={"flex"} alignItems={"center"}>
                                    <Typography width={"100%"} variant="h5" color={"#fa3e5b"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{bank.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                                </Grid>
                                <Grid width={"40%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                    <hr style={{position: "absolute", right:0, bottom: "9%",width: "15%", height: "5px", backgroundColor: "#fa3e5b", borderRadius: "10px", border:"none"}}></hr>
                                    <hr  style={{position: "absolute", right:0, bottom: "8%",width: "10%", height: "3px", backgroundColor: "#fa3e5b", borderRadius: "10px", border:"none"}}></hr>
                                </Grid>
                            </AnimatedGrid>
                        </BottomBank>
                    </AnimatedGrid>
                </DialogWithDraw>
            )
            ))}
            {transitionsDialog((style, openDialog) => (
            openDialog.transfer && (
                <DialogTransfer style={{ ...style }}>
                    <AnimatedGrid sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url('/assets/bankSystem/bank_bg_wrapper.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        position: "absolute",
                    }}>
                        <HeaderBank container>
                            <AnimatedGrid item xs={8} height={"100%"} display={"flex"}   wrap="nowrap">
                                <AnimatedGrid width={"30%"} height={"100%"}
                                    sx={{postition: "relative"}} display={"flex"} justifyContent={"center"}>
                                    <Grid width={"12%"} height={"17%"} sx={{
                                        ml: "-5%",
                                        borderLeft: "1px solid rgba(245, 202, 83, 1)",
                                        borderRight: "1px solid rgba(245, 202, 83, 1)",
                                        borderBottom: "1px solid rgba(245, 202, 83, 1)",
                                        position: "absolute",
                                        borderRadius: "0px 0px 45px 45px"
                                    }}>     
                                    </Grid>
                                    <Grid width={"11%"} height={"16%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        ml: "-5%",
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #f5ca53 40%, #ab892c 90%)",
                                        borderRadius: "0px 0px 40px 40px"
                                    }}>
                                        <Grid width={"100%"} height={"50%"}>
                                            <BankLogo src={`./assets/bankSystem/fleeca.png`}/>
                                        </Grid>
                                    </Grid>
                                    <Grid width={"5%"} height={"36%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #f5ca53 40%, #ab892c 90%)",
                                        borderRadius: "0px 0px 30px 30px",
                                        left: "3%"
                                    }}>
                                        <CurrencyExchangeIcon sx={{fontSize:"35px", position: "absolute", bottom: "5%"}}></CurrencyExchangeIcon>
                                    </Grid>
                                    <ButtonCloseDialog onClick={() => setOpenDialog({...openDialog, transfer: false})} width={"2%"} height={"3%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #f5ca53 40%, #ab892c 90%)",
                                        borderRadius: "10px",
                                        right: "3%",
                                        top: "3%"
                                    }}>
                                        <CloseIcon sx={{fontSize:"35px"}}></CloseIcon>
                                    </ButtonCloseDialog>
                                </AnimatedGrid>
                                <AnimatedGrid width={"60%"} height={"100%"} justifyContent={"center"} sx={{pt: "2%"}}>
                                </AnimatedGrid>
                                <AnimatedGrid container width={"30%"} sx={{pt: "2%"}}>
                                </AnimatedGrid>
                            </AnimatedGrid>
                        </HeaderBank>
                        <CenterBank display={"flex"} alignItems={"center"}>
                            <Grid width={"25%"} height={"40%"}>
                                <Typography variant="h5" textAlign={"center"} sx={{
                                    fontFamily: "Title",
                                    fontWeight: "bold",
                                    mb: "2%",
                                    color: "#f5ca53"
                                }}>
                                    {t('BANK_TRANSFER_TITLE')}
                                </Typography>
                                <Typography variant="body1" textAlign={"center"} sx={{
                                    fontFamily: "Gilroy",
                                    mb: "3%"
                                }}>
                                    {t('BANK_TRANSFER_DESCRIPTION')}
                                </Typography>
                                {/* <form onSubmit={handleSubmit(onSubmitDialogs)}>
                                    <Controller 
                                        name='amount'
                                        control={control}
                                        render={({field: {value, onChange}})=>(
                                        <TextField sx={{mb: "2%"}}  color="warning" label={t('BANK_TRANSFER_INPUT1')} variant='filled' onChange={onChange} error={Boolean(errors.amount)} fullWidth/>
                                        )}        
                                    />
                                    <Controller 
                                        name='targetPlayerID'
                                        control={control}
                                        render={({field: {value, onChange}})=>(
                                        <TextField color="warning" label={t('BANK_TRANSFER_INPUT2')} variant='filled' onChange={onChange} error={Boolean(errors.targetPlayerID)} fullWidth/>
                                        )}          
                                    />
                                    <AnimatedGrid  width={"100%"} sx={{mt: "3%"}} display={"flex"} >
                                        <Grid width={"90%"}>
                                            <Button variant="contained" fullWidth sx={{
                                                backgroundColor:"rgba(245, 202, 83, 0.5)",
                                                "&:hover": { backgroundColor: "rgba(245, 202, 83, 1)" , transform: "scale(1.1)"},
                                                transition: "all 0.5s ease"
                                            }} type='submit' name="savings">{t('ACCEPT_BANK')}</Button>
                                        </Grid>
                                        <Grid width={"10%"}></Grid>
                                        <Grid width={"90%"}>
                                            <Button variant="contained" fullWidth sx={{
                                                    backgroundColor:"rgba(245, 202, 83, 0.5)",
                                                    "&:hover": { backgroundColor: "rgba(245, 202, 83, 1)" , transform: "scale(1.1)"},
                                                    transition: "all 0.5s ease"
                                            }} onClick={() => setOpenDialog({...openDialog, transfer: false})}>{t('CANCEL_BANK')}</Button>
                                        </Grid>
                                    </AnimatedGrid>
                                </form> */}
                            </Grid>
                        </CenterBank>
                        <BottomBank container>
                            <AnimatedGrid item xs={5} display={"flex"} justifyContent={"right"} alignItems={"center"}>
                                <Grid width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                    <Typography width={"100%"} variant="h6" color={"#f5ca53"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('YOUR_BANK')}</Typography>
                                    <Typography width={"100%"} variant="body1" color={"white"} sx={{mt: "2%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('BALANCE_BANK')}</Typography>
                                </Grid>
                                <Grid width={"30%"} display={"flex"} alignItems={"center"}>
                                    <Typography width={"100%"} variant="h5" color={"#f5ca53"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{bank.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                                </Grid>
                                <Grid width={"40%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                    <hr style={{position: "absolute", right:0, bottom: "9%",width: "15%", height: "5px", backgroundColor: "#f5ca53", borderRadius: "10px", border:"none"}}></hr>
                                    <hr  style={{position: "absolute", right:0, bottom: "8%",width: "10%", height: "3px", backgroundColor: "#f5ca53", borderRadius: "10px", border:"none"}}></hr>
                                </Grid>
                            </AnimatedGrid>
                        </BottomBank>
                    </AnimatedGrid>
                </DialogTransfer>
            )
            ))}
            <HeaderBank container >
                <AnimatedGrid item xs={8} height={"100%"} display={"flex"}   wrap="nowrap">
                    <AnimatedGrid width={"30%"} height={"100%"}
                        sx={{postition: "relative"}} display={"flex"} justifyContent={"center"}>
                        <Grid width={"12%"} height={"17%"} sx={{
                            ml: "-5%",
                            borderLeft: "1px solid rgba(255, 11, 48, 0.3)",
                            borderRight: "1px solid rgba(255, 11, 48, 0.3)",
                            borderBottom: "1px solid rgba(255, 11, 48, 0.3)",
                            position: "absolute",
                            borderRadius: "0px 0px 45px 45px"
                        }}>     
                        </Grid>
                        <Grid width={"11%"} height={"16%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                            ml: "-5%",
                            position: "absolute",
                            background: "linear-gradient(45deg, #ff0b30 40%, #ff3d5b 90%)",
                            borderRadius: "0px 0px 40px 40px"
                        }}>
                            <Grid width={"100%"} height={"50%"}>
                                <BankLogo src={`./assets/bankSystem/fleeca.png`}/>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                    <AnimatedGrid width={"60%"} height={"100%"} justifyContent={"center"} sx={{pt: "2%"}}>
                        <hr style={{marginBottom: "3%",width: "13%", height: "5px", backgroundColor: "rgba(255, 11, 48, 0.7)", borderRadius: "10px", border:"none"}}></hr>
                        <Typography variant="h4" color={"primary"} 
                            sx={{
                                mb: "2%",
                                fontFamily: "Title",
                                fontWeight: "bold",
                                textAlign: "center",
                                textShadow: "0 0 20px #ff0b30"
                            }}>
                            {t('BANK_NAME')}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Gilroy",
                                textAlign: "center",
                                color: "rgba(217, 215, 215, 0.7)"
                            }}>
                            {t('BANK_DESCRIPTION')}
                        </Typography>
                    </AnimatedGrid>
                    <AnimatedGrid container width={"30%"} sx={{pt: "2%"}}>
                        <Grid xs={9} justifyContent={"center"} display={"flex"} flexDirection={"column"}>
                            <Typography variant="body1" textAlign={"right"} sx={{
                                pr: "5%",
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontFamily: "Gilroy"
                            }}>
                                Player Name
                            </Typography>
                            <Typography textAlign={"right"} sx={{
                                pr: "5%",
                                fontFamily: "Gilroy",
                                color: "rgba(224, 222, 222, 0.7)"
                            }}>
                                Card Number
                            </Typography>
                        </Grid>
                        <Grid xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            <Grid width={"90%"} height={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                                border: "1px solid #ff0b30",
                                borderRadius: "25%",
                                backgroundColor:"rgba(255, 11, 48, 0.1)"
                            }}>
                                <PersonIcon sx={{ fontSize: 45 }}></PersonIcon>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                </AnimatedGrid>
            </HeaderBank>
            <CenterBank  container>
                <AnimatedGrid style={{...topSpring}} item xs={8} height={"23%"} display={"flex"} sx={{
                    pt: "4%",
                    gap: "2%"
                }}>
                    <CenterButton onClick={() => setOpenDialog({...openDialog, deposit: true})}  container sx={{
                            backgroundColor:"rgba(85, 118, 60, 0.2)",
                            borderRadius: "20px"
                        }}>
                        <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                            <Grid width={"60%"} height={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                                borderRadius: "20%",
                                backgroundColor:"#55763c"
                            }}>
                                <AddCardIcon sx={{fontSize:"35px"}}></AddCardIcon>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Typography variant="body1" sx={{
                                fontFamily:"Title",
                                fontWeight:"bold",
                                textTransform:"uppercase",
                                fontSize: "15px"
                            }}>
                                {t('BANK_DEPOSIT_TITLE')}
                            </Typography>
                            <Typography variant="body1" color={"#55763c"}>
                                {t('BANK_DEPOSIT_DESCRIPTION')}
                            </Typography>
                        </Grid>
                    </CenterButton>
                    <CenterButton onClick={() => setOpenDialog({...openDialog, withDraw: true})} container sx={{
                            backgroundColor:"rgba(255, 11, 48, 0.2)",
                            borderRadius: "20px"
                        }}>
                        <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                            <Grid width={"60%"} height={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                                borderRadius: "20%",
                                backgroundColor:"#ff3b58"
                            }}>
                                <CreditScoreIcon sx={{fontSize:"35px"}}></CreditScoreIcon>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Typography variant="body1" sx={{
                                fontFamily:"Title",
                                fontWeight:"bold",
                                textTransform:"uppercase",
                                fontSize: "15px"
                            }}>
                                {t('BANK_WITHDRAW_TITLE')}
                            </Typography>
                            <Typography variant="body1" color={"#bf112c"}>
                                {t('BANK_WITHDRAW_DESCRIPTION')}
                            </Typography>
                        </Grid>
                    </CenterButton>
                    <CenterButton onClick={() => setOpenDialog({...openDialog, transfer: true})} container sx={{
                            backgroundColor:"rgba(161, 134, 63, 0.2)",
                            borderRadius: "20px"
                        }}>
                        <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                            <Grid width={"60%"} height={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                                borderRadius: "20%",
                                backgroundColor:"#a1863f"
                            }}>
                                <CurrencyExchangeIcon sx={{fontSize:"35px"}}></CurrencyExchangeIcon>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Typography variant="body1" sx={{
                                fontFamily:"Title",
                                fontWeight:"bold",
                                textTransform:"uppercase",
                                fontSize: "15px"
                            }}>
                                {t('BANK_TRANSFER_TITLE')}
                            </Typography>
                            <Typography variant="body1" color={"#a1863f"}>
                                {t('BANK_TRANSFER_DESCRIPTION')}
                            </Typography>
                        </Grid>
                    </CenterButton>
                </AnimatedGrid>
                <AnimatedGrid item xs={8} height={"77%"} display={"flex"} justifyContent={"center"} sx={{
                    gap: "2%", pt: "2%"
                }}>
                    <AnimatedGrid minWidth={"70%"} style={{...leftSpring}} sx={{
                        background: "linear-gradient(180deg, rgba(255, 11, 48, 0.1) 30%, rgba(255, 11, 48, 0.0) 100%)",
                        borderRadius: "20px",
                    }}>
                        <Grid width={"100%"} height={"10%"} sx={{mt: "1%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <SavingsIcon/>
                            <Typography variant="body1" sx={{ml:"2%",fontFamily:"Title", fontWeight: "bold"}}>{t('SAVINGS_BANK')}</Typography>
                        </Grid>
                        <Grid width={"100%"} height={"75%"} display={"flex"} justifyContent={"center"}>
                            <Grid width={"25%"} display={"flex"} justifyContent={"center"}>
                                <Grid width={"90%"}>
                                    {/* <form  onSubmit={handleSubmitSavings(onSubmitSavings)}>
                                        <Controller 
                                            name='amount'
                                            control={controlSavings}
                                            render={({field: {value, onChange}})=>(
                                            <TextField color="warning" label={t('BANK_DEPOSIT_INPUT')} variant='filled' onChange={onChange} error={Boolean(errorsSavings.amount)} fullWidth/>
                                            )}          
                                        />
                                        <Button type="submit" name="dialogs">ádasd</Button>
                                    </form> */}
                                </Grid>
                            </Grid>
                            <Grid width={"70%"}>
                                <TransactionsListScrollBar width={"100%"} height={"100%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                    {SavingsList.map((i) => (
                                        <TransactionsListItem container sx={{
                                            mb: "4%",
                                            backgroundColor: "rgba(255, 11, 48, 0.2)"
                                            
                                        }}>
                                            <Grid xs={12} container display={"flex"} alignItems={"center"} sx={{pl: "1%"}}>
                                                <Grid height={"100%"} item xs={2} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography variant="body1" textAlign={"center"} sx={{fontSize:"14px"}}>{t('duration_bank')}</Typography>
                                                    <Typography variant="body1" textAlign={"center"}  sx={{fontSize:"14px"}}>{i.duration}</Typography>
                                                </Grid>
                                                <Grid height={"100%"} item xs={3} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography textAlign={"center"} sx={{fontSize:"14px"}}>{t('dateStart_bank')}</Typography>
                                                    <Typography textAlign={"center"} sx={{fontSize:"14px"}}>{Moment(i.dateStart).utcOffset(0).format('DD-MM-YYYY HH:mm:ss')}</Typography>
                                                </Grid>
                                                <Grid height={"100%"} item xs={2} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography textAlign={"center"} sx={{fontSize:"14px"}}>{t('interest_bank')}</Typography>
                                                    <Typography textAlign={"center"} sx={{fontSize:"14px"}}>{i.interest}%</Typography>
                                                </Grid>
                                                <Grid height={"100%"} item xs={3} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    <Typography textAlign={"center"} sx={{fontSize:"14px"}}>{t('amount_bank')}</Typography>
                                                    <Typography textAlign={"center"} sx={{fontSize:"14px"}}>{(i.amount).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                                                </Grid>
                                                <Grid height={"100%"} item xs={2} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                                    {now1.diff(i.dateStart, 'days') > i.duration ? (
                                                        <Button color="warning" variant="contained" sx={{mr: "20%", fontSize:"14px"}} onClick = {() => onSavingsClaim(i._id)}>Nhận</Button>
                                                    ):(
                                                        <Button color="warning" variant="contained" sx={{mr: "20%", fontSize:"14px"}} disabled>Nhận</Button>
                                                    )}
                                                    {/* <Button color="warning" variant="contained" sx={{mr: "20%", fontSize:"14px"}}>Nhận</Button> */}
                                                </Grid>
                                                {/* <Typography variant="body1" width={"20%"} sx={{fontSize: "12px"}} >{Moment(i.dateStart).utcOffset(0).format('DD-MM-YYYY HH:mm:ss')}</Typography> */}
                                            </Grid>
                                        </TransactionsListItem>
                                    ))}
                                </TransactionsListScrollBar>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                    <AnimatedGrid style={{...rightSpring}} minWidth={"28%"} sx={{
                        background: "linear-gradient(180deg, rgba(255, 11, 48, 0.1) 30%, rgba(255, 11, 48, 0.0) 100%)",
                        borderRadius: "20px",
                    }}>
                        <Grid width={"100%"} height={"10%"} sx={{mb: "4%", mt: "3%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <AccessAlarmsIcon/>
                            <Typography variant="body1" sx={{ml:"2%",fontFamily:"Title", fontWeight: "bold"}}>{t('TRANSACTIONS_BANK')}</Typography>
                        </Grid>
                        <Grid width={"100%"} height={"80%"} display={"flex"} justifyContent={"center"}>
                            <TransactionsListScrollBar width={"90%"} height={"90%"} sx={{overflowX: 'hidden', overflowY: 'auto'}}>
                                {sortedTransactions.map((i) => (
                                    <TransactionsListItem container sx={{
                                        mb: "4%",
                                        backgroundColor: i.type === "deposit" ? "rgba(64, 255, 11, 0.1)" : (i.type === "withdraw" ? "rgba(255, 11, 48, 0.1)" : "rgba(255, 198, 11, 0.1)")
                                        
                                    }}>
                                        <Grid xs={8} display={"flex"} justifyContent={"center"} flexDirection={"column"} sx={{pl: "2%"}}>
                                            <Typography variant="body1" width={"100%"} sx={{
                                                fontFamily:"Gilroy",
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                                color: i.type === "deposit" ? "#41f011" : (i.type === "withdraw" ? "#fc2b2e" : "#ffc60b")
                                                
                                            }}>
                                                {i.type === "deposit" ? t('BANK_DEPOSIT_TITLE') : (i.type === "withdraw" ? t('BANK_WITHDRAW_TITLE') : t('BANK_TRANSFER_TITLE'))}
                                            </Typography>
                                            <Typography variant="body1" width={"100%"} sx={{fontSize: "14px"}}>{i.description}</Typography>
                                            <Typography variant="body1" width={"100%"} sx={{fontSize: "12px", color: i.type === "deposit" ? "#41f011" : (i.type === "withdraw" ? "#fc2b2e" : "#ffc60b")}}>{Moment(i.date).utcOffset(0).format('DD-MM-YYYY HH:mm:ss')}</Typography>
                                        </Grid>
                                        <Grid xs={4} display={"flex"} alignItems={"center"} sx={{pr: "2%"}}>
                                            <Typography width={"100%"} textAlign={"right"} sx={{fontWeight: "bold", fontFamily: "Gilroy",color: i.type === "deposit" ? "#41f011" : (i.type === "withdraw" ? "#fc2b2e" : "#ffc60b")}}>{(i.amount).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                                        </Grid>
                                    </TransactionsListItem>
                                ))}
                            </TransactionsListScrollBar>
                        </Grid>
                    </AnimatedGrid>
                </AnimatedGrid>
            </CenterBank>
            <BottomBank container>
                <AnimatedGrid item xs={5} display={"flex"} justifyContent={"right"} alignItems={"center"}>
                    <Grid width={"30%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                        <Typography width={"100%"} variant="h6" color={"primary"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('YOUR_BANK')}</Typography>
                        <Typography width={"100%"} variant="body1" color={"white"} sx={{mt: "2%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{t('BALANCE_BANK')}</Typography>
                    </Grid>
                    <Grid width={"30%"} display={"flex"} alignItems={"center"}>
                        <Typography width={"100%"} variant="h5" color={"primary"} sx={{mt: "5%",fontFamily:"Title", textAlign: "right", fontWeight:"bold"}}>{bank.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')} $</Typography>
                    </Grid>
                    <Grid width={"40%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                        <hr style={{position: "absolute", right:0, bottom: "9%",width: "15%", height: "5px", backgroundColor: "rgba(255, 11, 48, 0.7)", borderRadius: "10px", border:"none"}}></hr>
                        <hr  style={{position: "absolute", right:0, bottom: "8%",width: "10%", height: "3px", backgroundColor: "rgba(255, 11, 48, 0.3)", borderRadius: "10px", border:"none"}}></hr>
                    </Grid>
                </AnimatedGrid>
            </BottomBank>
        </Container>:null
        )
    );
}

const BankSystemPage = {
    element: BankSystem,
    needLogin: true
};
export default BankSystemPage

