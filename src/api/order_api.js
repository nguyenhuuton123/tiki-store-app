import axios from "axios";

const ORDER_MANAGEMENT_API = "http://localhost:8080/api/orders";

export const processOrderAPI = async (orderDTO) => {
    console.log(orderDTO)
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.post(
            `${ORDER_MANAGEMENT_API}/proceed`,
            orderDTO,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Server Response Data:", error.response.data);
            console.error("Server Response Status:", error.response.status);
            console.error("Server Response Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received from the server");
        } else {
            console.error("Request setup error:", error.message);
        }
        throw error;
    }
};