import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import { getAllProductAPI , getProductByIdAPI } from "../services/productAPI"

export const getAllProduct = createAsyncThunk(
    'product/all-products',
    async({queryParams},{rejectWithValue}) => {
        try {
            return await getAllProductAPI(queryParams);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProductById = createAsyncThunk(
    'product/productbyId',
    async(_id , {rejectWithValue}) => {
        try {
            return await getProductByIdAPI(_id);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    products : [],
    product : null,
    meta : null,
    loading : null,
    error : null,
};

const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        resetError(state){
            state.error = null;
        }
    },

    extraReducers : (builder) => {
        builder

        //fetch all product
        .addCase(getAllProduct.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAllProduct.fulfilled , (state , action) => {
            state.loading = false;
            state.products = action.payload;
            state.meta = action.payload.meta;
          })
          .addCase(getAllProduct.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })


          // fetch product by id
          .addCase(getProductById.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getProductById.fulfilled , (state , action) => {
            state.loading = false;
            state.product = action.payload;
          })
          .addCase(getProductById.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })
    }
})

export const {resetError} = productSlice.actions;
export default productSlice.reducer;