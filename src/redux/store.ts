import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { booksApi } from "./features/api/booksApi";
import { borrowApi } from "./features/api/borrowApi";


// If you have any local slices, import them here:
// import uiReducer from "./features/ui/uiSlice"; 

export const store = configureStore({
  reducer: {
    // Add your RTK Query API slices here
    [booksApi.reducerPath]: booksApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
    // Add any local slices if you need
    // ui: uiReducer,
  },

  // Add the RTK Query middleware for caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      borrowApi.middleware
    ),
});

// Enable refetchOnFocus/refetchOnReconnect behavior
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;