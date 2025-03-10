// import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
// import { addToCartAPI , updateCartAPI , getCartAPI } from "../services/cartAPI";

// export const addTOCart = createAsyncThunk(
//     "addtoCart",
//     async({itemId , size},{rejectWithValue}) => {
//         try {
//             return await addToCartAPI({itemId , size})
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartAPI, updateCartAPI, getCartAPI } from "../services/cartAPI";

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ itemId, size }, { rejectWithValue }) => {
        try {
            return await addToCartAPI({ itemId, size });
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async ({ cartItemId, quantity }, { rejectWithValue }) => {
        try {
            return await updateCartAPI({ cartItemId, quantity });
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            return await getCartAPI();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
