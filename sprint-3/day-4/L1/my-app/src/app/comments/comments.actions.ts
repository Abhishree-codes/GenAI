import { createAction, props } from '@ngrx/store';

export const ADD= createAction('ADD',props<{username:string,content:string,productID:number}>())
