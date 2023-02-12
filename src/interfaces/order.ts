export type baseOrderType = {
    user_id : number;
    status  : string;
    
}

export type orderType = {
    id : number;
    user_id : number;
    status  : string;
    
}

export type orderProductType = {
    order_id : number;
    product_id: number;
    quantity : number;
    
}

export type orderProductTypeId = {
    id:number,
    product_id: number;
    quantity : number;
    user_id : number;
    
}

