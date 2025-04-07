import {configureStore} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userReducer from "../features/user/user_slice"
import productReducer from "../features/product/product_slice";
import adminReducer from "../features/user/admin_silce"
import authReducer from "../features/user/auth_silce"
import cartReducer from "../features/product/cart_slice"

const persistConfig = {
    key: 'auth',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        auth: persistedReducer,
        admin: adminReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);