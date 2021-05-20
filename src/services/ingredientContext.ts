import React from 'react';
import { IngredientDTO } from '../components/ingredient/ingredient';
import { Action } from '../services/actions/constructor';

export interface IngredientsProps {
    type: string;
    id: number;
}

export interface PickedIngredientsState {
    ingredients: IngredientsProps[];
    isBun: boolean;
}

export const PickedIngredientContext = React.createContext<{pickedIngredientsState: PickedIngredientsState, pickedIngredientsDispatcher: (action: Action) => void }>({ pickedIngredientsState: {ingredients: [], isBun: false}, pickedIngredientsDispatcher: () => {} }); 
export const IngredientListContext = React.createContext<IngredientDTO[]>([]); 