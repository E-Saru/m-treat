import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage mechanism
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root', // The key for storage
  storage, // The storage engine (localStorage by default)
  whitelist: ['auth'], // Specify which reducers to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist-specific actions in middleware checks
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;
