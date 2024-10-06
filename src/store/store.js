import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Create the persist config object
const persistConfig = {
  key: 'root', // Key for the localStorage entry
  storage, // Use localStorage to persist the data
};

// Combine your reducers (if you have more, include them here)
const rootReducer = combineReducers({
  expenses: expenseReducer, // Add other reducers if needed
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
