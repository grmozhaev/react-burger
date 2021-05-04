import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

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
  }, [setIngredients]);

  return (
    <div className="app">
      <header className="app-header">
        <AppHeader />
      </header>
      <div className="title-container">
        <p className="text text_type_main-large subtitle mb-3 mt-3">
          Соберите бургер
        </p>
        {ingredients.length > 0 && (
          <div className="burger-container">
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
