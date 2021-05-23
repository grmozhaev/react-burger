import { useState, useEffect, useReducer } from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import {
  IngredientListContext,
  PickedIngredientContext,
} from "../../services/ingredientContext";
import { reducer } from "../../services/reducers/constructor";
import { IngredientDTO } from "../ingredient/ingredient";

import "./app.css";
const initialState = { ingredients: [], isBun: false };

const App = () => {
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]);

  const [pickedIngredientsState, pickedIngredientsDispatcher] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://norma.nomoreparties.space/api/ingredients";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();
        setIngredients(result.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <AppHeader />
      </header>
      <p className="text text_type_main-large subtitle mb-3 mt-3">
        Соберите бургер
      </p>
      <IngredientListContext.Provider value={ingredients}>
        <PickedIngredientContext.Provider
          value={{ pickedIngredientsState, pickedIngredientsDispatcher }}
        >
          {ingredients.length > 0 && (
            <div className="burger-container">
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor />
            </div>
          )}
        </PickedIngredientContext.Provider>
      </IngredientListContext.Provider>
    </div>
  );
};

export default App;
