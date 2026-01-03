import { NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";

export const CustomMenu = () => {
    const { pathname } = useLocation();

    const isActive = (path: string) => pathname === path;

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild
                        className={cn(isActive('/') && "bg-slate-200", 'rounded-md p-2')}
                    >
                        <Link to="/">Inicio</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild
                        className={cn(isActive('/search') && "bg-slate-200", 'rounded-md p-2')}
                    >
                        <Link to="/search">Buscar SuperHéroe</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
