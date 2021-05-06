import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import "./app.css";
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
  }, []);

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
