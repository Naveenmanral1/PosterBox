import api from "./api";

export const placeOrderAPI = async (orderData) => {
    try {
        const response = await api.post('/api/v1/order/place-order' , orderData)
        return response.data
    } catch (error) {
        console.error("Error in placing order :" , error.response?.data || error.message);
        throw error;
    }
}

export const razorpayOrderAPI = async (orderData) => {
    try {
        const response = await api.post('/api/v1/order/razorpay' , orderData)
        return response.data
    } catch (error) {
        console.error("Error in placing order via razorpay :" , error.response?.data || error.message);
        throw error;
    }
}

export const verifyRazorpayPaymentAPI = async (responseData) => {
    try {
        const response = await api.post('/api/v1/order/verify-razorpay',responseData)
        return response.data
    } catch (error) {
        console.error("Error in placing order via razorpay :" , error.response?.data || error.message);
        throw error;
    }
}