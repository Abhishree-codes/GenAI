import { createReducer, on } from '@ngrx/store';
import { ADD } from './comments.actions';


export interface CommentStructure{
    username:string,
    content:string,
    productID:number
}

export interface StateStructure{
    comments:CommentStructure[]
}
export const initialState:StateStructure={
    comments:[]

}

export const commentsReducer= createReducer(
    initialState,on(ADD, (state, { username, content, productID }) => {
        return {
          ...state,
          comments: [...state.comments, { username, content, productID }],
        };
      })
)