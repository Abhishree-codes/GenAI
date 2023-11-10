import { createReducer, on } from '@ngrx/store';
import { ADD_TO_CART, DECREASE_QUAN, GET_PRODUCTS, INCREASE_QUAN, LOGIN, LOGOUT, REMOVE } from './app.actions';


export const initialState:AppState = {
    isAuth:false,
    username:"",
    data:[],
    cart:[]
}

export const appReducer = createReducer(
  initialState,
  on(LOGIN, (state) => ({...state,isAuth:true})),
  on(LOGOUT, (state) => ({...state,isAuth:false})),
  on(GET_PRODUCTS, (state,{payload}) => ({...state,data:payload})),
  on(ADD_TO_CART,(state,{payload})=>({...state,cart:[...state.cart,{...payload,quantity:1}]})),
  on(REMOVE,(state,{payload})=>({...state,cart:state.cart.filter((ele)=>ele.id!==payload)})),
  on(DECREASE_QUAN, (state, { payload }) => ({
    ...state,
    cart: state.cart.map((ele) =>
      ele.id === payload ? { ...ele, quantity: ele.quantity - 1 } : ele
    ),
  })),
  on(INCREASE_QUAN, (state, { payload }) => ({
    ...state,
    cart: state.cart.map((ele) =>
      ele.id === payload ? { ...ele, quantity: ele.quantity + 1 } : ele
    ),
  }))
);


export interface productStructure{
  title:string,
  id:string,
  price:number,
  description:string,
  image:string
}
export interface AppState {
  isAuth: boolean;
  username: string;
  data: productStructure[]; // Use the interface for data
  cart: cartProductStructure[]; // Use the interface for cart
}

export interface cartProductStructure extends productStructure{
  quantity :number
}