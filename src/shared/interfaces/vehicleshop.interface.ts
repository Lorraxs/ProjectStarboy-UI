export interface IPerformanceVehicle {
   power: number;
   acceleration: number;
   handling: number;
   topspeed: number;
 }
 
 export interface IVehicleDataItem {
   name: string;
   brand: string;
   description: string;
   category: string;
   brandLogo: string;
   spawncode: string;
   performance: IPerformanceVehicle;
 }
 
 export interface IVehicleData extends Array<IVehicleDataItem> {}
 
 export interface IColorVehicleItem {
   ID: string;
   Description: string;
   Hex: string;
   RGB: string;
 }
 
 export interface IColorVehicle extends Array<IColorVehicleItem> {}
 
 export interface IVehicleShop {
   spawncode: string;
   price: number;
 }
 
 export const TopSpeedServer = 350;
 
 export const LIST_VEHICLE_GROUP = [
   "COMPACT",
   "SEDAN",
   "SUV",
   "COUPE",
   "MUSCLE",
   "SPORTSCLASSIC",
   "SPORT",
   "SUPER",
   "MOTORCYCLE",
   "OFFROAD",
   "VAN",
   "HELICOPTER",
   "BOAT",
 ];
 
 export interface IBuyDataVehicle {
   spawncode: string;
   price: number;
   color1: number;
   color2: number;
   shopIndex: number;
 }