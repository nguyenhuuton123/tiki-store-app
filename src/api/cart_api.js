import axios from "axios";

const CART_MANAGEMENT_API = "http://localhost:8080/api/carts";

export const addToCartAPI = async (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        throw new Error("User not logged in"); // Don't navigate here, just return an error
    }
    let response = null;
    try {
        response = await axios.post(
            `${CART_MANAGEMENT_API}/add/${productId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
    return response.data;
}

export const getCartAPI = async () => {
    const token = localStorage.getItem("accessToken");
    let response = null;
    try {
        response = await axios.get(
            `${CART_MANAGEMENT_API}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
    return response.data;
}


export const updateCartAPI = async (cartDTO) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.put(
            `${CART_MANAGEMENT_API}/update`,
            cartDTO,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
};

export const deleteCartItemAPI = async (cartDTO) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.delete(
            `${CART_MANAGEMENT_API}/delete`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: cartDTO
            }
        );

        return response.data;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
};