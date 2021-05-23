import { PickedIngredientsState } from "../ingredientContext";
import { Action } from "../actions/constructor";

export const reducer = (state: PickedIngredientsState, action: Action) => {
    switch (action.type) {
      case "PICK_INGREDIENT":
        if (action.ingredient.type !== "bun") {
          return {
            ...state,
            ingredients: [
              ...state.ingredients,
              {
                type: action.ingredient.type,
                id: action.ingredient.id,
              },
            ],
          };
        } else if (action.ingredient.type === "bun" && !state.isBun) {
          return {
            ...state,
            isBun: true,
            ingredients: [
              ...state.ingredients,
              {
                type: action.ingredient.type,
                id: action.ingredient.id,
              },
            ],
          };
        } else {
          return {
            ...state,
            ingredients: [
              ...state.ingredients.map((item) =>
                item.type === "bun"
                  ? { type: item.type, id: action.ingredient.id }
                  : item
              ),
            ],
          };
        }
  
      case "DELETE_INGREDIENT":
        const index = state.ingredients.findIndex(
          (el) => el.id === action.ingredient.id
        );
  
        return {
          ...state,
          ingredients: [
            ...state.ingredients.slice(0, index),
            ...state.ingredients.slice(index + 1),
          ],
        };
  
      default:
        return state;
    }
  };
  