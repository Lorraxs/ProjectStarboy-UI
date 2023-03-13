import useShow from '../hooks/useShow';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AnimatedGrid } from '../components/animated-mui';
import { config, useSpring, useChain, useSpringRef, useTransition } from '@react-spring/web';
import styled from 'styled-components';
import { cRequest } from '../utils/request';
import {useTranslation} from "react-i18next";
import { craftingTableTypeItem, ICraftingDefaultData, IItemCategory, IWeaponCategory, LIST_CATEGORY_ITEM, LIST_CATEGORY_WEAPON, ICraftIngredients } from '../shared/interfaces';
import { Grid, Typography, IconButton, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import { useEffect, useMemo, useRef, useState } from 'react';
const request = new cRequest();

const Container= styled(AnimatedGrid)`
    margin: 0 auto;
    background-image: url('/assets/backgrounds/craftingSystem_bg.png');
    background-position: center;
    background-size: cover;
    height:100%;
    min-width: 100vh;
    pointer-events: all;
    user-select: none;
    padding: 2% 3% 2% 3%;
`

const Header = styled(AnimatedGrid)`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
`
const Body = styled(AnimatedGrid)`
    width: 100%;
    height: 90%;
`
const CategoryButton = styled(AnimatedGrid)`
    margin-right: 20px;
    border: 1px solid #ff0b30;
    width: 20%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        transform: scale(1.1)
    }
    transition: all  0.5s ease;
    border-radius: 5px
`

const IngredientsListSrollbar = styled(AnimatedGrid)`
    display: flex;
    flex-wrap: wrap;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        height: 3px;
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
    gap: 25px;
    align-content: flex-start;
`

const IngredientsListSrollbarItem = styled(AnimatedGrid)`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color:  rgba(255, 11, 48, 1);
    }
    transition: background  0.5s ease;
    border-radius: 5px;
    min-width: calc(25% - 19px);
    height: 100%;
`
const ListItemSrollbar = styled(AnimatedGrid)`
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
    gap: 25px;
    align-content: flex-start;
`

const ListSrollbarItem = styled(AnimatedGrid)`
    cursor: pointer;
    &:hover{
        background: linear-gradient( 45deg, rgba(0, 0, 0,0.6) 20%, rgba(255, 11, 48, 1) 100%);
    }
    transition: background  0.5s ease;
    border-radius: 5px;
    width: calc(25% - 25px);
    height: calc(33% - 22px);
`
const BottomListItemSrollbar = styled(AnimatedGrid)`
    display: flex;
    flex-wrap: nowrap;
    ::-webkit-scrollbar
    {   
        background-color: transparent;
        height: 3px;
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
    gap: 25px;
    align-content: flex-start;
`

const BottomListSrollbarItem = styled(AnimatedGrid)`
    
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color:  rgba(255, 11, 48, 1);
    }
    transition: background  0.5s ease;
    border-radius: 5px;
    min-width: calc(25% - 19px);
    height: 100%;
`

function CraftingSystem() {
    const {t} = useTranslation('common');
    const [show] = useShow(process.env.NODE_ENV === 'development', 'cratingSystem', false, false, false, false)
    const [categoryCraft, setCategoryCraft] = useState<craftingTableTypeItem>("items");
    const [countCraft, setCountCraft] = useState(1);
    const CRAFT_DATA: ICraftingDefaultData[] = require("../shared/json/craftingData.json");
    const [itemsCategory, setItemsCateGory] = useState<IItemCategory>("GROUP_ITEMS");
    const [weaponsCategory, setWeaponsCategory] = useState<IWeaponCategory>("GROUP_PISTOL");
    const [selectedItem, setSelectedItem] = useState<ICraftingDefaultData>();
    const ingredients: ICraftIngredients = selectedItem?.ingredients || {};
    
    const actualIngredients = Object.fromEntries(
        Object.entries(ingredients).map(([ingredient, quantity]) => {
          return [ingredient, quantity * countCraft];
        })
    );

    const checkCanCraft = (playerInventory: Record<string, number>, actualIngredients: Record<string, number>): boolean => {
        for (const [ingredient, quantity] of Object.entries(actualIngredients)) {
            if (!(ingredient in playerInventory) || playerInventory[ingredient] < quantity) {
                return false;
            }
        }
        return true;
    }

    const rawPlayerInventory = useSelector((state:RootState)=>state.craftingSystem.inventory);
    const totalCountPerItems: { [key: string]: number } = {};
    Object.values(rawPlayerInventory).forEach((items) => {
        items.forEach((item) => {
        const itemName = item.name;
        if (item.hasOwnProperty('name')) {
            totalCountPerItems[itemName] = (totalCountPerItems[itemName] || 0) + 1;
        }
        });
    });

    const canCraft = checkCanCraft(totalCountPerItems, ingredients)
    console.log(selectedItem)
    const getCraftitemsGroup = (itemname: string) => {
        for (let i = 0; i < CRAFT_DATA.length; i++) {
            if (
                itemname.toLowerCase() === CRAFT_DATA[i].name.toLowerCase()
            ){
                return CRAFT_DATA[i].group;
            }
        }
        return '';
    };


    const selectedGroupItems = useMemo(() => {
        const itemsInGroup:ICraftingDefaultData[] = []
        CRAFT_DATA.forEach(e=>{
            const itemsGroup = getCraftitemsGroup(e.name);
            
            if(itemsGroup.toLowerCase() === itemsCategory.toLowerCase() ){
                itemsInGroup.push(e)
            }
        })
        return itemsInGroup
    }, [itemsCategory, CRAFT_DATA])

    const selectedGroupWeapons = useMemo(() => {
        const weaponsInGroup:ICraftingDefaultData[] = []
        CRAFT_DATA.forEach(e=>{
            const weaponsGroup = getCraftitemsGroup(e.name);
            
            if(weaponsGroup.toLowerCase() === weaponsCategory.toLowerCase() ){
                weaponsInGroup.push(e)
            }
        })
        return weaponsInGroup
    }, [weaponsCategory, CRAFT_DATA])

    useEffect(() => {
        setSelectedItem(undefined);
    }, [categoryCraft, itemsCategory,weaponsCategory])
    
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

    const handleCountCraftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setCountCraft(value);
        }
    };


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

    const transRef = useSpringRef()
    const transitions = useTransition(show, {
        ref: transRef,
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
        config: {...config.molasses, duration: 500}
    })

    useChain(show ? [transRef, topSpringRef, bottomSpringRef] : [bottomSpringRef, topSpringRef, transRef ], show ? 
        [0.0, 0.5, 0.5]:
        [0.5, 0.5, 0.0], 
    1000)
    
    return transitions( (style, show) => (show ? 
        <Container style={{...style}}>
            <Header  style={{...topSpring}}>
                <AnimatedGrid container>
                    <AnimatedGrid xs={8} item display={"flex"} alignItems={"center"}>
                        <CategoryButton onClick={() => setCategoryCraft("items")} sx={{
                            backgroundColor: categoryCraft === "items" ? "#ff0b30" : "rgba(0, 0, 0,0.6)"
                        }}>
                            <Typography variant='body1' sx={{
                                fontWeight: "bold", 
                                fontFamily: "Title",
                                }}>
                                    {t('item_craft')}
                                </Typography>
                        </CategoryButton>
                        <CategoryButton onClick={() => setCategoryCraft("weapons")} sx={{
                            backgroundColor: categoryCraft === "weapons" ? "#ff0b30" : "rgba(0, 0, 0,0.6)"
                        }}>
                            <Typography variant='body1' sx={{fontWeight: "bold", fontFamily: "Title"}}>{t('weapon_craft')}</Typography>
                        </CategoryButton>
                    </AnimatedGrid>
                    <AnimatedGrid xs={4} item display={"flex"} alignItems={"center"}>
                        <Grid width={"100%"}>
                            <Grid display={"flex"} width={"100%"} justifyContent={"right"}>
                                <Typography variant='h5' sx={{mr: 2,fontWeight: "bold", fontFamily:"Title"}}>{t('craft_title')}</Typography>
                                <Typography variant='h5' color={"primary"} sx={{fontWeight: "bold", fontFamily:"Title"}}>{t('table_title')}</Typography>
                            </Grid>
                            <Grid width={"100%"} display={"flex"} justifyContent={"right"}>
                                <Typography variant='body1' sx={{textTransform: "uppercase", fontFamily:"Gilroy"}}>{t('crafting_table_description')}</Typography>
                            </Grid>
                        </Grid>
                    </AnimatedGrid>
                </AnimatedGrid>
                
            </Header>
            <Body container style={{...bottomSpring}}>
                <AnimatedGrid item xs={8}>
                    {categoryCraft === "items" ? (
                        <AnimatedGrid width={"100%"} height={"100%"}>
                            {selectedGroupItems.length > 0 ? (
                                    <Grid width={"100%"} height={"100%"}>
                                        <ListItemSrollbar width={"100%"} height={"83%"} display={"flex"} sx={{mb: "2%",overflowX: 'hidden', overflowY: 'auto'}}>
                                        {selectedGroupItems.map((i)=> (
                                            <ListSrollbarItem onClick={() => setSelectedItem(i)} sx={{
                                                background: selectedItem?.name === i.name ? "linear-gradient( 45deg, rgba(0, 0, 0,0.6) 20%, rgba(255, 11, 48, 1) 100%)": "rgba(0,0,0,0.6)",
                                                border:  selectedItem?.name === i.name ? "1px solid rgba(255, 11, 48, 1)" : "none",
                                                padding: 4
                                            }}>
                                                <Grid width={"100%"} height={"15%"}>
                                                    <Typography sx={{
                                                        fontWeight: "bold", 
                                                        fontFamily: "Gilroy", 
                                                        textTransform: "uppercase",
                                                        textAlign: "right"
                                                    }}>
                                                            {i.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid width={"100%"} height={"85%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                    <img src={`./assets/groceryShop/${i.name}.png`} alt="" style={{
                                                        width: "90%",
                                                        height: "90%",
                                                        objectFit: "fill",
                                                    }}/>
                                                    {/* sếp nhớ đổi lại đường dẫn theo inventory */}
                                                </Grid>
                                            </ListSrollbarItem>
                                            ))}
                                        </ListItemSrollbar>
                                        <BottomListItemSrollbar width={"100%"} height={"15%"} display={"flex"} sx={{overflowX: 'auto', overflowY: 'hidden'}}>
                                            {LIST_CATEGORY_ITEM.map((i) => (
                                                <BottomListSrollbarItem onClick={() => setItemsCateGory(i as IItemCategory)} sx={{
                                                    backgroundColor: itemsCategory === i ? "rgba(255, 11, 48, 1)" : "rgba(59, 0, 9, 0.8)",
                                                }}>
                                                    <Typography variant='body1' sx={{fontFamily: "Title", fontWeight: "bold"}}>{i}</Typography>
                                                </BottomListSrollbarItem>
                                            ))}
                                        </BottomListItemSrollbar>
                                    </Grid>
                            ):(
                                <Grid width={"100%"} height={"100%"}>
                                    <Grid width={"100%"} height={"83%"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb: "2%"}}>
                                        <Grid display={"flex"} alignItems={"center"}>
                                            <HourglassDisabledIcon sx={{fontSize: 100, color: "rgba(255,255,255,0.5)"}}/>
                                            <Typography variant='h4' sx={{fontFamily: "Gilroy", color: "rgba(255,255,255,0.5)", textTransform: "uppercase"}}>{t('empty_products')}</Typography>
                                        </Grid>
                                    </Grid>
                                    <BottomListItemSrollbar width={"100%"} height={"15%"} display={"flex"} sx={{overflowX: 'auto', overflowY: 'hidden'}}>
                                        {LIST_CATEGORY_ITEM.map((i) => (
                                            <BottomListSrollbarItem onClick={() => setItemsCateGory(i as IItemCategory)} sx={{
                                                backgroundColor: itemsCategory === i ? "rgba(255, 11, 48, 1)" : "rgba(59, 0, 9, 0.8)",
                                            }}>
                                                <Typography variant='body1' sx={{fontFamily: "Title", fontWeight: "bold"}}>{i}</Typography>
                                            </BottomListSrollbarItem>
                                        ))}
                                    </BottomListItemSrollbar>
                                </Grid>
                            )}
                        </AnimatedGrid>
                    ):(
                        <AnimatedGrid width={"100%"} height={"100%"}>
                            {selectedGroupWeapons.length > 0 ? (
                                <Grid width={"100%"} height={"100%"}>
                                    <ListItemSrollbar width={"100%"} height={"83%"} display={"flex"} sx={{mb: "2%",overflowX: 'hidden', overflowY: 'auto'}}>
                                        {selectedGroupWeapons.map((i)=> (
                                            <ListSrollbarItem onClick={() => setSelectedItem(i)} sx={{
                                                background: selectedItem?.name === i.name ? "linear-gradient( 45deg, rgba(0, 0, 0,0.6) 20%, rgba(255, 11, 48, 0.7) 100%)": "rgba(0,0,0,0.6)",
                                                border:  selectedItem?.name === i.name ? "1px solid rgba(255, 11, 48, 1)" : "none",
                                                padding: 4
                                            }}>
                                                <Grid width={"100%"} height={"15%"}>
                                                    <Typography sx={{
                                                        fontWeight: "bold", 
                                                        fontFamily: "Gilroy", 
                                                        textTransform: "uppercase",
                                                        textAlign: "right"
                                                    }}>
                                                        {i.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid width={"100%"} height={"85%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                    <img src={`./assets/groceryShop/${i.name}.png`} alt="" style={{
                                                        width: "90%",
                                                        height: "90%",
                                                        objectFit: "fill",
                                                    }}/>
                                                </Grid>
                                            </ListSrollbarItem>
                                        ))}
                                    </ListItemSrollbar>
                                    <AnimatedGrid width={"100%"} height={"100%"} display={"flex"} wrap="nowrap" sx={{gap: "5px"}}>
                                        <Grid width={"3%"} height={"15%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                            <IconButton size="large" color="primary" onClick={handleScrollLeft}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Grid>
                                        <BottomListItemSrollbar ref={scrollbarRef} width={"100%"} height={"15%"} display={"flex"} sx={{width: "calc(94% - 10px)",overflowX: 'hidden', overflowY: 'hidden'}}>
                                            {LIST_CATEGORY_WEAPON.map((i) => (
                                                <BottomListSrollbarItem onClick={() => setWeaponsCategory(i as IWeaponCategory)} sx={{
                                                    backgroundColor: weaponsCategory === i ? "rgba(255, 11, 48, 1)" : "rgba(59, 0, 9, 0.8)",
                                                }}>
                                                    <Typography variant='body1' sx={{fontFamily: "Title", fontWeight: "bold"}}>{i}</Typography>
                                                </BottomListSrollbarItem>
                                            ))}
                                        </BottomListItemSrollbar>
                                        <Grid width={"3%"} height={"15%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                        <IconButton size="large" color="primary" onClick={handleScrollRight}>
                                            <ArrowForwardIcon />
                                        </IconButton>
                                        </Grid>
                                    </AnimatedGrid>
                                </Grid>
                            ):(
                                <Grid width={"100%"} height={"100%"}>
                                    <Grid width={"100%"} height={"83%"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb: "2%"}}>
                                        <Grid display={"flex"} alignItems={"center"}>
                                            <HourglassDisabledIcon sx={{fontSize: 100, color: "rgba(255,255,255,0.5)"}}/>
                                            <Typography variant='h4' sx={{fontFamily: "Gilroy", color: "rgba(255,255,255,0.5)", textTransform: "uppercase"}}>{t('empty_products')}</Typography>
                                        </Grid>
                                    </Grid>
                                    <AnimatedGrid width={"100%"} height={"100%"} display={"flex"} wrap="nowrap" sx={{gap: "5px"}}>
                                        <Grid width={"3%"} height={"15%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                            <IconButton size="large" color="primary" onClick={handleScrollLeft}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Grid>
                                        <BottomListItemSrollbar ref={scrollbarRef} width={"100%"} height={"15%"} display={"flex"} sx={{width: "calc(94% - 10px)",overflowX: 'hidden', overflowY: 'hidden'}}>
                                            {LIST_CATEGORY_WEAPON.map((i) => (
                                                <BottomListSrollbarItem onClick={() => setWeaponsCategory(i as IWeaponCategory)} sx={{
                                                    backgroundColor: weaponsCategory === i ? "rgba(255, 11, 48, 1)" : "rgba(59, 0, 9, 0.8)",
                                                }}>
                                                    <Typography variant='body1' sx={{fontFamily: "Title", fontWeight: "bold"}}>{i}</Typography>
                                                </BottomListSrollbarItem>
                                            ))}
                                        </BottomListItemSrollbar>
                                        <Grid width={"3%"} height={"15%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                            <IconButton size="large" color="primary" onClick={handleScrollRight}>
                                                <ArrowForwardIcon />
                                            </IconButton>
                                        </Grid>
                                    </AnimatedGrid>
                                </Grid>
                            )}

                        </AnimatedGrid>
                    )}
                </AnimatedGrid>
                <AnimatedGrid item xs={4} sx={{pl: 10}}>
                    {selectedItem === undefined ? (
                        <Grid width={"100%"} height={"100%"} sx={{backgroundColor: "rgba(0,0,0,0.5)"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Grid display={"flex"} alignItems={"center"}>
                                <HourglassDisabledIcon sx={{fontSize: 100, color: "rgba(255,255,255,0.5)"}}/>
                                <Typography variant='h4' sx={{fontFamily: "Gilroy", color: "rgba(255,255,255,0.5)", textTransform: "uppercase"}}>{t('empty_products')}</Typography>
                            </Grid>
                        </Grid>
                    ): (
                        <Grid width={"100%"} height={"100%"}>
                            <Grid width={"100%"} height={"30%"} sx={{p: 4, backgroundColor: "rgba(0,0,0,0.5)"}}>
                                <Grid width={"100%"} height={"10%"}>
                                    <Typography variant='body1' color={"primary"} sx={{fontFamily: "Title", fontWeight: "bold"}}>{t('ingredients_craft')}</Typography>
                                </Grid>
                                <IngredientsListSrollbar width={"100%"} height={"90%"}>
                                    {selectedItem?.ingredients && Object.keys(selectedItem.ingredients).map((i: string) => (
                                        <Grid>
                                            {totalCountPerItems[i]}/{countCraft > 0 ? (selectedItem.ingredients[i as keyof ICraftIngredients])*countCraft : selectedItem.ingredients[i as keyof ICraftIngredients]}{i}
                                        </Grid>
                                    ))}                
                                </IngredientsListSrollbar>
                            </Grid>
                            <Grid width={"100%"} height={"50%"} sx={{p: 4, backgroundColor: "rgba(0,0,0,0.5)"}}>
                                <Grid width={"100%"}>
                                    <Typography variant='body1' color={"primary"} sx={{fontFamily: "Title", fontWeight: "bold"}}>{t('content_craft')}</Typography>
                                </Grid>
                                <TextField 
                                    label="Nhập số lượng" 
                                    variant="filled"
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        const parsedValue = parseInt(value);
                                        if (!isNaN(parsedValue)) {
                                            setCountCraft(parsedValue);
                                            } else if (value === "") {
                                            setCountCraft(1);
                                            }
                                        }}
                                />
                                {countCraft}
                            </Grid>
                            <Grid width={"100%"} height={"20%"} sx={{p: 4, backgroundColor: "rgba(0,0,0,0.5)"}}>
                                <Grid>
                                    <Typography variant='body1' color={"primary"} sx={{fontFamily: "Title", fontWeight: "bold"}}>{t('progess_craft')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}

                </AnimatedGrid>
            </Body>
        </Container>:null
        ));
}


const CraftingSystemPage = {
    element: CraftingSystem,
    needLogin: true
};
export default CraftingSystemPage