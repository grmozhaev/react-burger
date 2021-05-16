import React from 'react';
import { IngredientDTO } from '../components/ingredient/ingredient';

export const IngredientContext = React.createContext<{ingredients: IngredientDTO[], setIngredients: (ingredients: IngredientDTO[]) => void }>({ ingredients: [], setIngredients: () => {} });