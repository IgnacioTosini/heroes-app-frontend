import { useQuery } from "@tanstack/react-query"
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action"

export const usePaginatedHero = (page: number, category = 'all') => {
    return useQuery({
        queryKey: ['heroes', { page, category }],
        queryFn: () => getHeroesByPageAction(+page, 6, category),
        staleTime: 1000 * 60 * 5
    })
}
