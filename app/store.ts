import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slices/taskSlice'

// Створюємо store з редуктором tasksSlice
export const store = configureStore({
    reducer: {
        tasks: tasksSlice, // використовуємо слайс для задач
    },
})

// Типи для RootState та AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
