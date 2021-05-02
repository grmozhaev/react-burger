import "./App.css";
import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <AppHeader />
      </header>
      <div className="title-container">
        <p className="text text_type_main-large subtitle mb-3 mt-3">
          Соберите бургер
        </p>
        <div className="burger-container">
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </div>
    </div>
  );
}

export default App;
