import { createAction, props } from "@ngrx/store";
import { productStructure } from "./app.reducer";

export const LOGIN= createAction('LOGIN',props<{payload:string}>())
export const LOGOUT= createAction('LOGOUT')
export const GET_PRODUCTS = createAction('GET_PRODUCTS',props<{payload:any}>())
export const ADD_TO_CART=createAction('ADD_TO_CART',props<{payload:productStructure}>())
export const REMOVE= createAction('REMOVE',props<{payload:string}>())

export const INCREASE_QUAN= createAction('INCREASE_QUAN',props<{payload:string}>())
export const DECREASE_QUAN= createAction('DECREASE_QUAN',props<{payload:string}>())