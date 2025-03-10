import api from "./api";

export const addToCartAPI = async ({itemId , size}) => {
    try {
        const response = await api.post('/api/v1/cart/addtocart' , {itemId , size})
        return response.data
    } catch (error) {
        console.error("Error in adding to cart :" , error.response?.data || error.message);
        throw error;
    }
}

export const updateCartAPI = async ({itemId , size , quantity}) => {
    try {
        const response = await api.post('/api/v1/cart/updatecart',{itemId , size , quantity})
        return response.data
    } catch (error) {
        console.error("Error in updating cart :" , error.response?.data || error.message);
        throw error;
    }
}

export const getCartAPI = async ({}) => {
    try {
        const response = await api.get('/api/v1/cart/get-cart',{})
        return response.data
    } catch (error) {
        console.error("Error in getting cartData :" , error.response?.data || error.message);
        throw error;
    }
}