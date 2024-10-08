import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistPartial } from "redux-persist/es/persistReducer";

import menteeReducer, { MenteeState } from './slices/menteeAuthSlice'
import mentorReducer, { MentorState } from './slices/mentorAuthSlice'
import adminReducer, { AdminState } from "./slices/adminAuthSlice";


const menteePersistConfig = {
    key: 'mentee',
    storage,
};

const mentorPersistConfig = {
    key: 'mentor',
    storage
}

const adminPersistConfig = {
  key: 'admin',
  storage
}

const persistedMenteeReducer = persistReducer(menteePersistConfig, menteeReducer);
const persistedMentorReducer = persistReducer(mentorPersistConfig, mentorReducer)
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer)

const AllReducers = combineReducers({
    mentee :  persistedMenteeReducer,
    mentor : persistedMentorReducer,
    admin  : persistedAdminReducer
})

export type rootState = {
    mentee: MenteeState & PersistPartial; 
    mentor: MentorState & PersistPartial; 
    admin: AdminState & PersistPartial; 
  };

const store = configureStore({
    reducer: AllReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
    })
})
  
  const persistStoree = persistStore(store)
//   export type rootState = ReturnType<typeof store.getState>;
  export  {store,persistStoree}