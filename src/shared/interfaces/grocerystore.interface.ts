export enum eGroceryStoreType {
    all,
    food,
    drink,
    tools,
    items,
    technology,
  }
  
  export enum EGroceryStoreUsesLevel { //Shop category subtittle
    high,
    normal,
    low,
  }
  
  /* export interface IGroceryStoreItem {
      tittle: string,
      description: string,
      type: string,
      price: number,
      weight: number,
      uses: string,
      level: string,
  } */
  
  export interface IGroceryStoreItem {
    name: string;
    price: number;
    category: eGroceryStoreType;
  }
  
  export interface IGroceryStoreCart {
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface IGroceryStoreBuyData {
    cart: IGroceryStoreCart[];
    storeIdx: number;
  }