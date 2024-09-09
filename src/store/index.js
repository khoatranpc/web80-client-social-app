import { configureStore } from '@reduxjs/toolkit';
import authenticated from './slice-reducers/authenticated';
const store = configureStore({
    reducer: {
        authenticated: authenticated.reducer
    }
});

export default store;