import { ConstructorActionType as types } from "../../actions/constructor";
import {
  constructorReducer,
  initialConstructorState as initialState,
} from "./constructor";

describe("Constructor reducer", () => {
  const notEmptyInitialState = {
    ...initialState,
    ingredients: {
      "1": {
        image: "image",
        image_large: "image_large",
        name: "name",
        price: 100,
        type: "type",
        _id: "_id",
        calories: 200,
        proteins: 300,
        fat: 400,
        carbohydrates: 500,
        classes: "classes",
        isLocked: false,
        counter: 1000,
      },
      "2": {
        image: "image__2",
        image_large: "image_large__2",
        name: "name__2",
        price: 1000,
        type: "type__2",
        _id: "_id__2",
        calories: 2000,
        proteins: 3000,
        fat: 4000,
        carbohydrates: 5000,
        classes: "classes__2",
        isLocked: true,
        counter: 10000,
      },
    },
  };

  it("should return the initial constructor state", () => {
    expect(constructorReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle PICK_INGREDIENT with no picked ingredients", () => {
    expect(
      constructorReducer(notEmptyInitialState, {
        type: types.PICK_INGREDIENT,
        pickedIngredient: {
          id: "1",
          index: 1,
        },
      })
    ).toEqual({
      ...notEmptyInitialState,
      pickedIngredientIds: ["1"],
    });
  });

  it("should handle PICK_INGREDIENT with picked ingredients", () => {
    expect(
      constructorReducer(
        {
          ...notEmptyInitialState,
          pickedIngredientIds: ["1"],
        },
        {
          type: types.PICK_INGREDIENT,
          pickedIngredient: {
            id: "2",
            index: 2,
          },
        }
      )
    ).toEqual({
      ...notEmptyInitialState,
      pickedIngredientIds: ["1", "2"],
    });
  });

  it("should handle DELETE_INGREDIENT", () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          pickedIngredientIds: ["1", "2"],
          counter: { "2": 1 },
        },
        {
          type: types.DELETE_INGREDIENT,
          pickedIngredient: {
            id: "2",
            index: 1,
          },
        }
      )
    ).toEqual({
      ...initialState,
      pickedIngredientIds: ["1"],
      counter: {
        ...initialState.counter,
        "2": 0,
      },
    });
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      constructorReducer(initialState, {
        type: types.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      constructorReducer(initialState, {
        type: types.GET_INGREDIENTS_SUCCESS,
        ingredients: {
          "1": {
            image: "image",
            image_large: "image_large",
            name: "name",
            price: 100,
            type: "type",
            _id: "_id",
            calories: 200,
            proteins: 300,
            fat: 400,
            carbohydrates: 500,
            classes: "classes",
            isLocked: false,
            counter: 1000,
          },
        },
      })
    ).toEqual({
      ...initialState,
      ingredients: {
        "1": {
          image: "image",
          image_large: "image_large",
          name: "name",
          price: 100,
          type: "type",
          _id: "_id",
          calories: 200,
          proteins: 300,
          fat: 400,
          carbohydrates: 500,
          classes: "classes",
          isLocked: false,
          counter: 1000,
        },
      },
      ingredientsFailed: false,
      ingredientsRequest: false,
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      constructorReducer(initialState, {
        type: types.GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false,
    });
  });

  it("should handle GET_ORDER_NUMBER_REQUEST", () => {
    expect(
      constructorReducer(initialState, {
        type: types.GET_ORDER_NUMBER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderNumber: null,
      orderNumberRequest: true,
    });
  });

  it("should handle GET_ORDER_NUMBER_SUCCESS", () => {
    expect(
      constructorReducer(initialState, {
        type: types.GET_ORDER_NUMBER_SUCCESS,
        orderNumber: 1,
      })
    ).toEqual({
      ...initialState,
      orderNumber: 1,
      orderNumberFailed: false,
      orderNumberRequest: false,
    });
  });

  it("should handle GET_ORDER_NUMBER_FAILED", () => {
    expect(
      constructorReducer(initialState, {
        type: types.GET_ORDER_NUMBER_FAILED,
      })
    ).toEqual({
      ...initialState,
      orderNumberFailed: true,
      orderNumberRequest: false,
    });
  });

  it("should handle INCREASE_ITEM_COUNT", () => {
    expect(
      constructorReducer(
        {
          ...notEmptyInitialState,
          pickedIngredientIds: ["1"],
          counter: { "1": 1 },
        },
        {
          type: types.INCREASE_ITEM_COUNT,
          pickedIngredient: {
            id: "1",
            index: 1,
          },
        }
      )
    ).toEqual({
      ...notEmptyInitialState,
      pickedIngredientIds: ["1"],
      counter: { "1": 2 },
    });
  });

  it("should handle MOVE_ITEM", () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          pickedIngredientIds: ["1", "2"],
        },
        {
          type: types.MOVE_ITEM,
          dragIndex: 1,
          hoverIndex: 0,
        }
      )
    ).toEqual({
      ...initialState,
      pickedIngredientIds: ["2", "1"],
    });
  });
});
