import {createSlice} from '@reduxjs/toolkit';
import {
    addProduct,
    editProduct,
    getBestSellers,
    getNewArrivals,
    getProduct,
    getProductByName,
    getProducts,
    getProductsByCategory,
    removeProduct,
    searchProducts
} from "./product_reducer_service";

const initialState = {
    values: null,
    value: null,
    loading: false,
    error: null,
    success: false,
    searchValues: null,
    bestSellers: null,
    newArrivals: null,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.success = true;
                state.values = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
                state.loading = false;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.success = true;
                state.values = action.payload;
                state.error = null;
            })
            .addCase(getProductByName.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getProductByName.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = null;
            })
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.searchValues = action.payload;
                state.error = null;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = null;
            })
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = null;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = null;
            })
            .addCase(getBestSellers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBestSellers.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.bestSellers = action.payload;
                state.error = null;
            })
            .addCase(getBestSellers.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error;
            })
            .addCase(getNewArrivals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNewArrivals.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.newArrivals = action.payload;
                state.error = null;
            })
            .addCase(getNewArrivals.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error;
            });
    },
});

export const productListSelector = (state) => state.products.values;
export const isLoadingSelector = (state) => state.products.loading;
export const searchResultsSelector = (state) => state.products.searchValues;
export const bestSellerSelector = (state) => state.products.bestSellers;
export const newArrivalSelector = (state) => state.products.newArrivals;
export default productSlice.reducer;