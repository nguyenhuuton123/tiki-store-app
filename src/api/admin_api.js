import axios from "axios";

const ADMIN_MANAGEMENT_API = "http://localhost:8080/api/admin";

export const getUserDetails = async (userId) => {
    const token = localStorage.getItem("accessToken");
    let response = null;
    try {
        response = await axios.get(
            `${ADMIN_MANAGEMENT_API}/user-list/user/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
    return response.data;
}

export const getSearch = async (searchRequest, currentPage) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.post(
            `${ADMIN_MANAGEMENT_API}/search?page=${currentPage}`,
            searchRequest,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
