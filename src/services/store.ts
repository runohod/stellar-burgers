import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredients-slice';
import { userSlice } from './slices/user-slice';
import { burgerConstructorSlice } from './slices/burger-constructor-slice';
import { ordersSlice } from './slices/order-slice';
import { feedSlice } from './slices/feed-slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  userSlice,
  burgerConstructorSlice,
  ordersSlice,
  feedSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
