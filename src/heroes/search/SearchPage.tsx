import { CustomJumbotron } from "@/components/Custom/CustomJumbotron";
import { HeroStats } from "../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/Custom/CustomBreadcrumbs";
import { HeroGrid } from "../components/HeroGrid";
import { useSearchHero } from "../hooks/useSearchHero";

export const SearchPage = () => {
  const { data: searchedHeroes } = useSearchHero()
  return (
    <>
      <CustomJumbotron title="Busqueda de Heroes" description="Descubre, explora y administra SuperHeroes" />
      <CustomBreadcrumbs currentPage="Buscador de Héroes"
      /*         breadcrumbs={
                [
                  { label: 'Home', to: '/' },
                  { label: 'Home2', to: '/' },
                  { label: 'Home3', to: '/' },
                ]
              } */
      />
      <HeroStats />
      <SearchControls />

      <HeroGrid heroes={searchedHeroes ?? []} />
    </>
  )
}

export default SearchPage;