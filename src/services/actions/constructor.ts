import { IngredientDTO } from '../../components/ingredient/ingredient';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

export interface IngredientsProps {
    type: string;
    id: string;
    index: number;
}

export interface BurgerConstructorIngredientProps extends IngredientDTO {
    index: number;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

export interface CounterProps {
    id: string;
    counter: number;
    type: string;
}

export interface PickedIngredientsState {
    ingredients: IngredientDTO[];
    pickedIngredientIds: IngredientsProps[];
    isBun: boolean;
    ingredientsFailed: boolean;
    ingredientsRequest: boolean;
    orderNumber: number | null;
    ingredientName: string | null;
    counter: CounterProps[];
}

export type Action = 
| { type: "PICK_INGREDIENT"; pickedIngredient: IngredientsProps } 
| { type: "DELETE_INGREDIENT"; pickedIngredient: IngredientsProps }
| { type: "GET_INGREDIENTS_REQUEST" }
| { type: "GET_INGREDIENTS_SUCCESS"; ingredients: IngredientDTO[] }
| { type: "GET_INGREDIENTS_FAILED" }
| { type: "GET_ORDER_NUMBER_REQUEST" }
| { type: "GET_ORDER_NUMBER_SUCCESS", orderNumber: number | null }
| { type: "GET_ORDER_NUMBER_FAILED" }
| { type: "VIEW_INGREDIENT_DETAILS"; ingredientName: string}
| { type: "REMOVE_INGREDIENT_DETAILS"}
| { type: "INCREASE_ITEM"; pickedIngredient: IngredientsProps}
| { type: "MOVE_ITEM"; dragIndex: number, hoverIndex: number}

export const getIngredients = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: 'GET_INGREDIENTS_REQUEST' });
        
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            dispatch({ type: 'GET_INGREDIENTS_FAILED' })
        }

        const result = await response.json();
        dispatch({ type: 'GET_INGREDIENTS_SUCCESS', ingredients: result.data })
    } catch (e) {
        dispatch({ type: 'GET_INGREDIENTS_FAILED' })
    }  
}

export const getOrderNumber = (pickedIngredients: BurgerConstructorIngredientProps[]) => async (dispatch: ThunkDispatch<{},{}, AnyAction>) => {
    dispatch({ type: 'GET_ORDER_NUMBER_REQUEST' });
    
    const url = 'https://norma.nomoreparties.space/api/orders';  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ ingredients: pickedIngredients }),
        });
        if (!response.ok) {
            dispatch({type: 'GET_ORDER_NUMBER_FAILED'})
        }
        
        const result = await response.json();
        dispatch({ type: 'GET_ORDER_NUMBER_SUCCESS', orderNumber: result.order.number })
    } catch (e) {
        dispatch({ type: 'GET_ORDER_NUMBER_FAILED' })
    }
}