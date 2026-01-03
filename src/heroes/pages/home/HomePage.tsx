import { use, useMemo } from "react"
import { useSearchParams } from "react-router"
import { Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/Custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/Custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/Custom/CustomBreadcrumbs"
import { useHeroesSummary } from "@/heroes/hooks/useHeroesSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const category = searchParams.get('category') ?? 'all';
  const { favoriteCount, favorites } = use(FavoriteHeroContext)

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])

  const { data: heroesResponse } = usePaginatedHero(+page, category)

  const { data: summary } = useHeroesSummary()

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title="Superhero Universe" description="Descubre, explora y administra SuperHeroes" />
        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all')
                prev.set('category', 'all')
                prev.set('page', '1')
                return prev
              })}>All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'favorites')
              return prev
            })} className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes')
              prev.set('category', 'hero')
              prev.set('page', '1')
              return prev
            })}>Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'villains')
              prev.set('category', 'villain')
              prev.set('page', '1')
              return prev
            })}>Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {selectedTab !== 'favorites' &&
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        }
      </>
    </>
  )
}