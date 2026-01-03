import { describe, expect, test, vi } from "vitest";
import { router as appRouter } from "./app.routes";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    HeroesLayout: () =>
        <div data-testid='heroes-layout'>
            <Outlet />
        </div>
}))
vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid='home-page'></div>
}))

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { idSlug = '' } = useParams()
        return (
            <div data-testid='hero-page'>
                HeroPage - {idSlug}
            </div>
        )
    }
}))

vi.mock('@/heroes/search/SearchPage', () => ({
    default: () => <div data-testid='search'></div>
}))

describe('app.routes', () => {
    test('should be configured as expected', () => {
        expect(appRouter.routes).toMatchSnapshot()
    });

    test('should render homePage at root path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/']
        })
        render(<RouterProvider router={router} />)
        screen.debug()
        expect(screen.getByTestId('home-page')).toBeDefined()
    });
    test('should render heroPage at /heroes/:idSlug path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman']
        })
        render(<RouterProvider router={router} />)
        screen.debug()
        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman')
    });

    test('should render search page at /search path', async () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search']
        })
        render(<RouterProvider router={router} />)
        expect(await screen.findByTestId('search')).toBeDefined()
        screen.debug()
    });

    test('should redirect to home page for unknown routes', async () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/adsfdsf']
        })
        render(<RouterProvider router={router} />)
        expect(screen.getByTestId('home-page')).toBeDefined()
        screen.debug()
    });
});
