import { createSlice } from "@reduxjs/toolkit";
import { IGarageData } from "../../shared/interfaces";
interface IInitStateProps {
    vehicle: IGarageData[];
    shopIdx: number;
    returnPrice: number;
    garageName: string,
}

const initialState: IInitStateProps = {
    vehicle: [
        {
            model: 917809321,
            name: "xa21",
            plate: "BDQ6T5O2",
            impound: false,
            properties:{
                health: 1000,
                fuelLevel: 800,
                dirtLevel: 5,
                colorPrimary: 29,
                colorSecondary: 7,
                pearlescentColor: 5,
                wheelColor: 5,
                wheels: 7,
                windowTint: -1,
                neonEnabled: [
                    false,
                    false,
                    false,
                    false
                ],
                extras: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ],
                neonColor: [
                    255,
                    0,
                    255
                ],
                tyreSmokeColor: [
                    255,
                    255,
                    255
                ],
                mods: {
                    VMT_BUMPER_F: -1,
                    VMT_BUMPER_R: -1,
                    VMT_SKIRT: -1,
                    VMT_EXHAUST: -1,
                    VMT_CHASSIS: -1,
                    VMT_GRILL: -1,
                    VMT_BONNET: -1,
                    VMT_WING_L: -1,
                    VMT_WING_R: -1,
                    VMT_ROOF: -1,
                    VMT_ENGINE: -1,
                    VMT_BRAKES: -1,
                    VMT_GEARBOX: -1,
                    VMT_HORN: -1,
                    VMT_SUSPENSION: -1,
                    VMT_ARMOUR: -1,
                    VMT_NITROUS: -1,
                    VMT_TURBO: false,
                    VMT_SUBWOOFER: -1,
                    VMT_TYRE_SMOKE: false,
                    VMT_HYDRAULICS: -1,
                    VMT_XENON_LIGHTS: false,
                    VMT_WHEELS: -1,
                    VMT_WHEELS_REAR_OR_HYDRAULICS: -1,
                    VMT_PLTHOLDER: -1,
                    VMT_PLTVANITY: -1,
                    VMT_INTERIOR1: -1,
                    VMT_INTERIOR2: -1,
                    VMT_INTERIOR3: -1,
                    VMT_INTERIOR4: -1,
                    VMT_INTERIOR5: -1,
                    VMT_SEATS: -1,
                    VMT_STEERING: -1,
                    VMT_KNOB: -1,
                    VMT_PLAQUE: -1,
                    VMT_ICE: -1,
                    VMT_TRUNK: -1,
                    VMT_HYDRO: -1,
                    VMT_ENGINEBAY1: -1,
                    VMT_ENGINEBAY2: -1,
                    VMT_ENGINEBAY3: -1,
                    VMT_CHASSIS2: -1,
                    VMT_CHASSIS3: -1,
                    VMT_CHASSIS4: -1,
                    VMT_CHASSIS5: -1,
                    VMT_DOOR_L: -1,
                    VMT_DOOR_R: -1,
                    VMT_LIVERY_MOD: -1,
                    VMT_LIGHTBAR: -1,
                    modLivery: -1
                }
            },
            plateIndex: 0,
            inGarage: true
        },
        {
            model: 917809321,
            name: "adder",
            plate: "mp091099",
            impound: false,
            properties:{
                health: 1000,
                fuelLevel: 800,
                dirtLevel: 5,
                colorPrimary: 29,
                colorSecondary: 7,
                pearlescentColor: 5,
                wheelColor: 5,
                wheels: 7,
                windowTint: -1,
                neonEnabled: [
                    false,
                    false,
                    false,
                    false
                ],
                extras: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ],
                neonColor: [
                    255,
                    0,
                    255
                ],
                tyreSmokeColor: [
                    255,
                    255,
                    255
                ],
                mods: {
                    VMT_BUMPER_F: -1,
                    VMT_BUMPER_R: -1,
                    VMT_SKIRT: -1,
                    VMT_EXHAUST: -1,
                    VMT_CHASSIS: -1,
                    VMT_GRILL: -1,
                    VMT_BONNET: -1,
                    VMT_WING_L: -1,
                    VMT_WING_R: -1,
                    VMT_ROOF: -1,
                    VMT_ENGINE: -1,
                    VMT_BRAKES: -1,
                    VMT_GEARBOX: -1,
                    VMT_HORN: -1,
                    VMT_SUSPENSION: -1,
                    VMT_ARMOUR: -1,
                    VMT_NITROUS: -1,
                    VMT_TURBO: false,
                    VMT_SUBWOOFER: -1,
                    VMT_TYRE_SMOKE: false,
                    VMT_HYDRAULICS: -1,
                    VMT_XENON_LIGHTS: false,
                    VMT_WHEELS: -1,
                    VMT_WHEELS_REAR_OR_HYDRAULICS: -1,
                    VMT_PLTHOLDER: -1,
                    VMT_PLTVANITY: -1,
                    VMT_INTERIOR1: -1,
                    VMT_INTERIOR2: -1,
                    VMT_INTERIOR3: -1,
                    VMT_INTERIOR4: -1,
                    VMT_INTERIOR5: -1,
                    VMT_SEATS: -1,
                    VMT_STEERING: -1,
                    VMT_KNOB: -1,
                    VMT_PLAQUE: -1,
                    VMT_ICE: -1,
                    VMT_TRUNK: -1,
                    VMT_HYDRO: -1,
                    VMT_ENGINEBAY1: -1,
                    VMT_ENGINEBAY2: -1,
                    VMT_ENGINEBAY3: -1,
                    VMT_CHASSIS2: -1,
                    VMT_CHASSIS3: -1,
                    VMT_CHASSIS4: -1,
                    VMT_CHASSIS5: -1,
                    VMT_DOOR_L: -1,
                    VMT_DOOR_R: -1,
                    VMT_LIVERY_MOD: -1,
                    VMT_LIGHTBAR: -1,
                    modLivery: -1
                }
            },
            plateIndex: 0,
            inGarage: false
        }
    ],
    shopIdx: 0,
    garageName: "Example Garage",
    returnPrice: 2000,
};

export const garageSystemSlice = createSlice({
    name: "garageSystem",
    initialState,
    reducers: {
        setGarageData: (state, action) => ({ ...state, ...action.payload }),
    },
});

export const { setGarageData } = garageSystemSlice.actions;
export default garageSystemSlice.reducer;