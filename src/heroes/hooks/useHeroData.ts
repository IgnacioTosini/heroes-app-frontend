import { useQuery } from "@tanstack/react-query"
import { getHero } from "../actions/get-hero.action"

export const useHeroData = (idSlug: string) => {
    return useQuery({
        queryKey: ['hero-information', { idSlug }],
        queryFn: () => getHero(idSlug),
        retry: false
    })
}
