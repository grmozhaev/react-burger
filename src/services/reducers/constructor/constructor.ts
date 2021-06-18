import { ConstructorAction, ConstructorState } from "../../actions/constructor";
import update from "immutability-helper";
import { IngredientDTO } from "../../../components/ingredient/ingredient";

export const initialConstructorState: ConstructorState = {
  ingredients: {},
  pickedIngredientIds: [],
  ingredientsFailed: false,
  ingredientsRequest: false,
  orderNumber: null,
  selectedIngredientId: null,
  counter: {},
};

export const doesBurgerHaveBun = (pickedIds: string[],ingredients: Record<string, IngredientDTO>) => {
  return Boolean(
    pickedIds.find(
      (id) =>
        Object.keys(ingredients).filter(
          (ingredient) => ingredient === id && ingredients[id].type === "bun"
        ).length
    )
  );
};

export const constructorReducer = (state = initialConstructorState, action: ConstructorAction) => {
  switch (action.type) {
    case "PICK_INGREDIENT":
      if (
        (state.ingredients[action.pickedIngredient.id].type === "bun" &&
          !doesBurgerHaveBun(state.pickedIngredientIds, state.ingredients)) ||
        state.ingredients[action.pickedIngredient.id].type !== "bun"
      ) {
        return {
          ...state,
          pickedIngredientIds: [
            ...state.pickedIngredientIds,
            action.pickedIngredient.id,
          ],
        };
      } else {
        return {
          ...state,
          pickedIngredientIds: [
            ...state.pickedIngredientIds.filter(
              (id) => state.ingredients[id].type !== "bun"
            ),
            action.pickedIngredient.id,
          ],
        };
      }

    case "DELETE_INGREDIENT":
      return {
        ...state,
        pickedIngredientIds: [
          ...state.pickedIngredientIds.filter(
            (item, index) => index !== action.pickedIngredient.index
          ),
        ],
        counter: {
          ...state.counter,
          [action.pickedIngredient.id]:
            state.counter[action.pickedIngredient.id] > 0
              ? state.counter[action.pickedIngredient.id] - 1
              : state.counter[action.pickedIngredient.id],
        },
      };

    case "GET_INGREDIENTS_REQUEST":
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };

    case "GET_INGREDIENTS_SUCCESS":
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false,
      };

    case "GET_INGREDIENTS_FAILED":
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };

    case "GET_ORDER_NUMBER_REQUEST":
      return {
        ...state,
        orderNumber: null,
        orderNumberRequest: true,
      };

    case "GET_ORDER_NUMBER_SUCCESS":
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberFailed: false,
        orderNumberRequest: false,
      };

    case "GET_ORDER_NUMBER_FAILED":
      return {
        ...state,
        orderNumberFailed: true,
        orderNumberRequest: false,
      };

    case "INCREASE_ITEM_COUNT":
      const isThisBun = state.ingredients[action.pickedIngredient.id].type === "bun";
      const alreadyPicked = state.counter[action.pickedIngredient.id] !== undefined;
      const anotherBunFoundId = Object.keys(state.ingredients).find((id) =>
          id !== action.pickedIngredient.id && state.ingredients[id].type === "bun"
      );

      if ((!isThisBun && !alreadyPicked) || (isThisBun && !anotherBunFoundId)) {
        return {
          ...state,
          counter: {
            ...state.counter,
            [action.pickedIngredient.id]: 1,
          },
        };
      }

      if (!isThisBun && alreadyPicked) {
        return {
          ...state,
          counter: {
            ...state.counter,
            [action.pickedIngredient.id]:
              state.counter[action.pickedIngredient.id] + 1,
          },
        };
      }

      if (isThisBun && anotherBunFoundId) {
        return {
          ...state,
          counter: {
            ...state.counter,
            [anotherBunFoundId]: 0,
            [action.pickedIngredient.id]: 1,
          },
        };
      }

      return state;

    case "MOVE_ITEM":
      const newPickedIngredientIds = update(state.pickedIngredientIds, {
        $splice: [
          [action.dragIndex, 1],
          [action.hoverIndex, 0, state.pickedIngredientIds[action.dragIndex]],
        ],
      });

      return {
        ...state,
        pickedIngredientIds: [...newPickedIngredientIds],
      };

    default:
      return state;
  }
};
