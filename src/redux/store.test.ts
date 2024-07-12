import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

describe("Redux Store", () => {
  let store: any;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  test("should have user reducer in the store", () => {
    const state = store.getState();
    expect(state.user).toBeDefined();
  });

  // Add more test cases as needed
});
