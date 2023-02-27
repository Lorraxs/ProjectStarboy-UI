import { useState } from "react";
import { useTranslation } from "react-i18next";
import useShow from "../hooks/useShow";
import {animated, config, useSpringRef, useSpring, useChain, useTransition } from '@react-spring/web';
import styled from "styled-components";
import { AnimatedGrid } from "../components/animated-mui";
import { Grid, Typography} from "@mui/material";
import { IDialogBank } from "../shared/interfaces"; 
import PersonIcon from '@mui/icons-material/Person';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CloseIcon from '@mui/icons-material/Close';

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
    background:  linear-gradient(45deg, rgba(255, 11, 48, 0.7) 20%, rgba(0, 0, 0, 0.4) 90%);
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

function BankSystem() {
    const {t} = useTranslation('common');
    const [show] = useShow(process.env.NODE_ENV === 'development', 'HUD', false, false, false, false)
    
    const [openDialog, setOpenDialog] = useState<IDialogBank>({
        deposit: false,
        widthDraw: false,
        transfer: false,
      });

    console.log(openDialog.deposit)


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

    const transitionsDeposit = useTransition(openDialog, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {...config.molasses, duration: 300}
      })

    useChain(show ? [transRef, topSpringRef] : [ topSpringRef ,transRef ], show ? 
        [0.0, 0.5]:
        [0.5, 0.0], 
    1000)

    return transitions((style, show) => (show ? 
        <Container style={{...style}}>
            {transitionsDeposit((style, openDialog) => (
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
                                        background: "linear-gradient(0deg, #78a854 40%, #9dd173 90%)",
                                        borderRadius: "0px 0px 40px 40px"
                                    }}>
                                        <Grid width={"100%"} height={"50%"}>
                                            <BankLogo src={`./assets/bankSystem/fleeca.png`}/>
                                        </Grid>
                                    </Grid>
                                    <Grid width={"5%"} height={"36%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
                                        position: "absolute",
                                        background: "linear-gradient(0deg, #78a854 40%, #9dd173 90%)",
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
                    </AnimatedGrid>
                </DialogDeposit>
            )
            ))}
            {transitionsDeposit((style, openDialog) => (
            openDialog.widthDraw && (
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
                                    <ButtonCloseDialog onClick={() => setOpenDialog({...openDialog, widthDraw: false})} width={"2%"} height={"3%"} display={"flex"}  justifyContent={"center"} alignItems={"center"} sx={{
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
                    </AnimatedGrid>
                </DialogWithDraw>
            )
            ))}
            {transitionsDeposit((style, openDialog) => (
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
                            <Grid width={"70%"} height={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                                borderRadius: "20%",
                                backgroundColor:"#55763c"
                            }}>
                                <AddCardIcon sx={{fontSize:"35px"}}></AddCardIcon>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Typography variant="body1" sx={{
                                fontFamily:"Gilroy",
                                fontWeight:"bold",
                                textTransform:"uppercase",
                                fontSize: "20px"
                            }}>
                                {t('BANK_DEPOSIT_TITLE')}
                            </Typography>
                            <Typography variant="body1" color={"#55763c"}>
                                {t('BANK_DEPOSIT_DESCRIPTION')}
                            </Typography>
                        </Grid>
                    </CenterButton>
                    <CenterButton onClick={() => setOpenDialog({...openDialog, widthDraw: true})} container sx={{
                            backgroundColor:"rgba(255, 11, 48, 0.2)",
                            borderRadius: "20px"
                        }}>
                        <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"} >
                            <Grid width={"70%"} height={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                                borderRadius: "20%",
                                backgroundColor:"#ff3b58"
                            }}>
                                <CreditScoreIcon sx={{fontSize:"35px"}}></CreditScoreIcon>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Typography variant="body1" sx={{
                                fontFamily:"Gilroy",
                                fontWeight:"bold",
                                textTransform:"uppercase",
                                fontSize: "20px"
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
                            <Grid width={"70%"} height={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                                borderRadius: "20%",
                                backgroundColor:"#a1863f"
                            }}>
                                <CurrencyExchangeIcon sx={{fontSize:"35px"}}></CurrencyExchangeIcon>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Typography variant="body1" sx={{
                                fontFamily:"Gilroy",
                                fontWeight:"bold",
                                textTransform:"uppercase",
                                fontSize: "20px"
                            }}>
                                {t('BANK_TRANSFER_TITLE')}
                            </Typography>
                            <Typography variant="body1" color={"#a1863f"}>
                                {t('BANK_TRANSFER_DESCRIPTION')}
                            </Typography>
                        </Grid>
                    </CenterButton>
                </AnimatedGrid>
            </CenterBank>
        </Container>:null
        )
    );
}

const BankSystemPage = {
    element: BankSystem,
    needLogin: true
};
export default BankSystemPage

