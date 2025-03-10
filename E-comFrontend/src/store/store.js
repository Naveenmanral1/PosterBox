import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import {persistStore , persistReducer} from "redux-persist"
import authSlice from './authSlice.js'
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key : 'auth',
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig , authSlice)

const rootReducer = combineReducers({
    auth : persistedAuthReducer,
})

const store = configureStore({
    reducer : rootReducer,
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck : {
                ignoreActions : ['persist/PERSIST'],
                ignoredPaths : ['auth.accessToken','auth.refreshToken']
            },
        }),
})

const persistor = persistStore(store);
export {store , persistor};