import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import menteeReducer from './slices/menteeAuthSlice'



const menteePersistConfig = {
    key: 'mentee',
    storage,
};

const persistedMenteeReducer = persistReducer(menteePersistConfig, menteeReducer);

const AllReducers = combineReducers({
    mentee :  persistedMenteeReducer,
})

const store = configureStore({
    reducer: AllReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
    })
})
  
  const persistStoree = persistStore(store)
  export type RootState = ReturnType<typeof store.getState>;
  export  {store,persistStoree}