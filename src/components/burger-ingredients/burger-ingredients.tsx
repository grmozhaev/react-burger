import Ingredient from "../ingredient/ingredient";
import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientProps } from "../ingredient/ingredient";
import "./burger-ingredients.css";

const tabs = [
  {
    label: "Булки",
    value: "bun",
  },
  {
    label: "Соусы",
    value: "sauce",
  },
  {
    label: "Начинки",
    value: "main",
  },
];

interface BurgerIngredientsProps {
  ingredients: IngredientProps[];
}

const BurgerIngredients = (props: BurgerIngredientsProps) => {
  const [state, setState] = useState({ activeTab: tabs[0].label });

  const handleTabClick = (activeTab: string) => {
    setState({ activeTab });
    document.querySelector(`#${activeTab}`)?.scrollIntoView();
  };

  return (
    <section>
      <div className="ingredients-container">
        <div className="tabs">
          {tabs.map((tabName) => {
            return (
              <Tab
                active={state.activeTab === tabName.label}
                key={tabName.value}
                value={tabName.label}
                onClick={handleTabClick}
              >
                {tabName.label}
              </Tab>
            );
          })}
        </div>

        <div className="ingredients-scrollable">
          {tabs.map((activeTab) => (
            <ul key={activeTab.label} className="ingredients-list mt-2">
              <li className="list-item">
                <p
                  id={`${activeTab.label}`}
                  className="text text_type_main-medium"
                >
                  {activeTab.label}
                </p>
              </li>

              <ul className="ingredients-list p-2">
                {props.ingredients.map(
                  (item) =>
                    item.type === activeTab.value && (
                      <li key={item._id} className="list-item">
                        <Ingredient
                          image_large={item.image_large}
                          onClick={() => console.log()}
                          image={item.image}
                          name={item.name}
                          price={item.price}
                        />
                      </li>
                    )
                )}
              </ul>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
