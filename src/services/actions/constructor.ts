import {IngredientsProps} from '../ingredientContext';

export type Action = 
| { type: "PICK_INGREDIENT"; ingredient: IngredientsProps } 
| { type: "DELETE_INGREDIENT"; ingredient: IngredientsProps };
