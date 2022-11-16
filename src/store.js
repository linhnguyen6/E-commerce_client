import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import authSlice from "./reducer/authSlice";
import cartSlice from "./reducer/cartSlice";

const persistConfig = {
  key: "root",
  storage
};

const reducer = combineReducers({
  cart: cartSlice.reducer,
  auth: authSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger)
});

export const persistor = persistStore(store)

export default store;
