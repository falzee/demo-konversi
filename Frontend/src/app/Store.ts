import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['error']
}

const reducers = combineReducers({
  auth: persistReducer<any>(persistConfig, authSlice),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
})

export const persistor = persistStore(store)

export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<  ReturnType,
  RootState,
  unknown,
  Action<string>
>