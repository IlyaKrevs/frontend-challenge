import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiKey } from "apiKey";

type CatResponse = {
    id: string,
    url: string
}


interface IInitState {
    loading: 'idle' | 'pending' | 'fulfilled' | 'error'
    itemsArr: CatResponse[],
    error: string,
    favoritesID: string[]
}

const initialState: IInitState = {
    loading: 'idle',
    itemsArr: [],
    favoritesID: [],
    error: ''
}


const fetchMoreCats = createAsyncThunk(
    'cats/fetchMore',
    async () => {
        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": apiKey
        })
        const options: RequestInit = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        }

        const searchParams = new URLSearchParams()
        searchParams.set('limit', '30')
        searchParams.set('page', '1')


        const res = await fetch(`https://api.thecatapi.com/v1/images/search?${searchParams}`, options)
        let result = await res.json()
        return result as CatResponse[]
    }
)

export const kittySlice = createSlice({
    name: 'kitties',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<{ id: string }>) => {
            let incomeID = action.payload.id
            if (state.favoritesID.includes(incomeID)) {
                state.favoritesID = state.favoritesID.filter(item => item !== incomeID)
            } else {
                state.favoritesID.push(incomeID)
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoreCats.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchMoreCats.fulfilled, (state, action) => {
            state.loading = 'fulfilled'
            state.itemsArr = [...state.itemsArr, ...action.payload]
        })
        builder.addCase(fetchMoreCats.rejected, (state, action) => {
            state.loading = 'error'
            state.error = action.error.message || ''
        })
    }
})


export const { toggleFavorite } = kittySlice.actions

export const kittyAsyncActions = { fetchMoreCats }

export default kittySlice.reducer


