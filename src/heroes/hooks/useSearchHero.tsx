import { useQuery } from "@tanstack/react-query"
import { searchHeroesAction } from "../actions/search-heros.action"
import { useSearchParams } from "react-router"

export const useSearchHero = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;
    return useQuery({
        queryKey: ['heroesSearched', { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5,
    })
}
