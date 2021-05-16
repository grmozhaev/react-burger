import Ingredient from "../ingredient/ingredient";
import { useState, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientDTO } from "../ingredient/ingredient";
import { ModalType } from "../modal/modal";
import "./burger-ingredients.css";
import IngredientDetails from "../ingredient-details/ingredient-details";

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
  ingredients: IngredientDTO[];
}

const BurgerIngredients = (props: BurgerIngredientsProps) => {
  const [state, setState] = useState({ activeTab: tabs[0].label });
  const [modalType, setModalType] = useState<ModalType | null>(null);
  let [ingredientName, setIngredientName] = useState<string>("");

  const openIngredientModal = useCallback(
    (name) => {
      setModalType(ModalType.PICKED_INGREDIENT);
      setIngredientName(name);
    },
    [setModalType]
  );

  const closeModal = useCallback(() => {
    setModalType(null);
    setIngredientName("");
  }, [setModalType]);

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
                          onClick={openIngredientModal}
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

        {modalType === ModalType.PICKED_INGREDIENT && (
          <IngredientDetails
            ingredients={props.ingredients}
            ingredientName={ingredientName}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
};

export default BurgerIngredients;
