import { use } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import { HeroStatCard } from "./HeroStatCard"
import { useHeroesSummary } from "../hooks/useHeroesSummary"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"

export const HeroStats = () => {
    const { data: summary } = useHeroesSummary()
    const { favoriteCount } = use(FavoriteHeroContext)

    if (!summary) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Characters</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
                    <div className="flex gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {summary?.heroCount} Heroes
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                            {summary?.villainCount} Villains
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <HeroStatCard title="Favoritos" icon={<Heart className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-2xl font-bold text-red-600" data-testid="favorite-count">{favoriteCount}</div>
                <p data-testid="favorite-percentage" className="text-xs text-muted-foreground">{((favoriteCount / summary.totalHeroes) * 100).toFixed(2)}% of total</p>
            </HeroStatCard>
            <HeroStatCard title="Strongest" icon={<Zap className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}/10</p>
            </HeroStatCard>
            <HeroStatCard title="Smartest" icon={<Trophy className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}/10</p>
            </HeroStatCard>
        </div>
    )
}
