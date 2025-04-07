import axios from "axios";

const AUTH_MANAGEMENT_API = "http://localhost:8080/api/auth";

export const loginUser = async (LoginRequestDTO) => {
    try {
        const response = await axios({
            url: `${AUTH_MANAGEMENT_API}/login`,
            method: "POST",
            data: {
                username: LoginRequestDTO.username,
                password: LoginRequestDTO.password,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Register user API error:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${AUTH_MANAGEMENT_API}/logout`);
        return response.data;
    } catch (error) {
        console.error("Logout user API error:", error);
        throw error;
    }
};

export const senOtp = async (SendMailRequest) => {
    try {
        const response = await axios.post(`${AUTH_MANAGEMENT_API}/otp/send`, SendMailRequest)
        return response.data;
    } catch (error) {
        console.error("Sen otp API error:", error);
        throw error;
    }
};

export const forgotPassword = async (verifyOtpRequest) => {
    try {
        const response = await axios.post(`${AUTH_MANAGEMENT_API}/reset-password/verify-otp`, verifyOtpRequest)
        return response.data;
    } catch (error) {
        console.error("Forgot password API error:", error);
        throw error;
    }
};
