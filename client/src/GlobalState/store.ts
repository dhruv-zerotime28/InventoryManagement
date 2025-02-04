import { configureStore } from "@reduxjs/toolkit";
import { inventoryApi } from "./Services/Inventory";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./Services/auth";

export const store = configureStore({
  reducer: {
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inventoryApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
