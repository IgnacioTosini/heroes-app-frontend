import type React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";

const renderWithRouter = (component: React.ReactElement, initialEntries?: string[]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            {component}
        </MemoryRouter>
    )
}

describe('CustomPagination', () => {
    test('should render component with default values', () => {
        renderWithRouter(<CustomPagination totalPages={5} />)
        screen.debug()
        expect(screen.getByText('Previous')).toBeDefined()
        expect(screen.getByText('Next')).toBeDefined()
    });

    test('should disabled previous button when page is 1', () => {
        renderWithRouter(<CustomPagination totalPages={5} />)

        const previousButton = screen.getByText('Previous');
        expect(previousButton.getAttributeNames()).toContain('disabled')
    });

    test('should disabled next button when we are in the last page', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5'])

        const nextButton = screen.getByText('Next');
        expect(nextButton.getAttributeNames()).toContain('disabled')
    });
    test('should disabled button 3 when we are in page 3', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3'])

        const button3 = screen.getByText('3');
        expect(button3.className).toContain('bg-primary')
    });

    test('should change page when click on number button', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3'])
        const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');
        expect(button2.className).toContain('opacity-50')
        expect(button3.className).toContain('bg-primary')

        fireEvent.click(button2)
        expect(button2.className).toContain('bg-primary')
        expect(button3.className).toContain('opacity-50')
    });
});
