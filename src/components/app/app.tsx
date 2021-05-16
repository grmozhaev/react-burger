import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import "./app.css";
import { useState, useEffect } from "react";
import { IngredientContext } from "../../services/ingredientContext";
import { IngredientDTO } from "../ingredient/ingredient";

const App = () => {
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]);

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
      <IngredientContext.Provider value={{ ingredients, setIngredients }}>
        {ingredients.length > 0 && (
          <div className="burger-container">
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor />
          </div>
        )}
      </IngredientContext.Provider>
    </div>
  );
};

export default App;
