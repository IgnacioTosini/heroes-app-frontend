import { SlashIcon } from "lucide-react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Link, useLocation } from "react-router"

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[]
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs }: Props) => {
    const { pathname } = useLocation();

    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={'/'}>
                            Inicio
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {
                    breadcrumbs?.map(crumb => (
                        <div className="flex items-center">
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                            <BreadcrumbLink asChild className="p-1">
                                <Link to={crumb.to}>
                                    {crumb.label}
                                </Link>
                            </BreadcrumbLink>
                        </div>
                    ))
                }
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink href={`${pathname}`}>{currentPage}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
