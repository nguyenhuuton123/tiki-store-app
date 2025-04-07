import {createSelector, createSlice} from '@reduxjs/toolkit';
import {addToCart, deleteCartItem, getCart, updateCart} from "./product_reducer_service";

const initialState = {
    id: 0,
    items: [],
    item: null,
    loading: false,
    error: null,
    success: false,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity--;
                if (item.quantity < 1) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                }
            }
        },
        deleteItem: (state, action) => {
            const itemId = action.payload.id;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        resetCart(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.items = action.payload.cartItems;
                state.total = action.payload.totalPrice;
                state.error = null;
                state.id = action.payload.id;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                if (action.payload.cartItems) {
                    state.items = action.payload.cartItems;
                } else {
                    const item = action.payload;
                    const existingItem = state.items.find(i => i.id === item.id);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        state.items.push({...item, quantity: 1});
                    }
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.items = action.payload.cartItems;
                state.total = action.payload.totalPrice;
                state.error = null;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    }
});

export const selectCartItems = state => state.cart.items;
export const selectId = state => state.cart.id;
export const selectTotal = state => state.cart.total;
export const selectCartData = createSelector(
    [selectCartItems, selectId, selectTotal],
    (items, id, total) => ({
        id: id,
        cartItems: items,
        totalPrice: total,
    })
);

export const {increaseQuantity, decreaseQuantity, deleteItem, resetCart} = cartSlice.actions;

export default cartSlice.reducer;