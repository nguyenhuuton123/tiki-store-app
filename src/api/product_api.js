import axios from 'axios';

const PRODUCT_MANAGEMENT_API = "http://localhost:8080/api";
export const findProducts = async (page, size) => {
    let result = null;
    try {
        result = await axios.get(
            `${PRODUCT_MANAGEMENT_API}/products?page=${page}&size=${size}`
        );
    } catch (e) {
        console.log("Find products API error: " + e);
    }
    return result;
};

export const findProduct = async (productId) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_MANAGEMENT_API}/products/${productId}`);
    } catch (e) {
        console.log("Find product API error: " + e);
    }
    return result;
};

export const createProduct = async (product) => {
    const token = localStorage.getItem("accessToken");
    let result = null;
    try {
        result = await axios.post(
            `http://localhost:8080/api/products/create`,
            product,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (e) {
    }
    return result;
};


export const updateProduct = async (product) => {
    let result = null;
    try {
        result = await axios.put(`${PRODUCT_MANAGEMENT_API}/products/${product.id}`, product);
        console.log("update success")
    } catch (e) {
        console.log("Update product API error: " + e);
    }
    return result;
};

export const deleteProduct = async (productId) => {
    let result = null;
    try {
        result = await axios.delete(`${PRODUCT_MANAGEMENT_API}/products/${productId}`);
    } catch (e) {
        console.log("Delete product API error: " + e);
    }
    return result;
};

export const searchProductsAPI = async (searchTerm) => {
    let result = null;
    try {
        result = await axios.get(
            `${PRODUCT_MANAGEMENT_API}/products/search?searchTerm=${searchTerm}`
        );
    } catch (e) {
        console.log("Find products API error: " + e);
    }
    return result;
};
export const findProductByName = async (productName) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_MANAGEMENT_API}/products/name/${productName}`);
    } catch (e) {
        console.log("Find product API error: " + e);
    }
    return result;
};

export const findProductsByCategory = async (categoryName, page, size) => {
    let result = null;
    try {
        result = await axios.get(`${PRODUCT_MANAGEMENT_API}/categories/${categoryName}?page=${page}&size=${size}`);
    } catch (e) {
        console.log("Find product API error: " + e);
    }
    return result;
};

export const getBestSellerAPI = async () => {
    let result = null;
    try {
        result = await axios.get(
            `${PRODUCT_MANAGEMENT_API}/products/getBestSellers`
        );
    } catch (e) {
        console.log("Find products API error: " + e);
    }
    return result;
};
export const getNewArrivalAPI = async () => {
    let result = null;
    try {
        result = await axios.get(
            `${PRODUCT_MANAGEMENT_API}/products/getNewArrivals`
        );
    } catch (e) {
        console.log("Find products API error: " + e);
    }
    return result;
};


