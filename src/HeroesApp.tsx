import { RouterProvider } from "react-router"
import { router } from "./router/app.routes"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext"

export const HeroesApp = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </FavoriteHeroProvider>
        </QueryClientProvider>
    )
}
