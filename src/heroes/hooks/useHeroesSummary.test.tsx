import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroesSummary } from "./useHeroesSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

vi.mock('../actions/get-summary.action', () => ({
    getSummaryAction: vi.fn()
}))

const mockGetSummaryAction = vi.mocked(getSummaryAction)

const tanStackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useHeroesSummary', () => {
    test('should return the initial state(isLoading)', () => {
        const { result } = renderHook(() => useHeroesSummary(), {
            wrapper: tanStackCustomProvider()
        })

        expect(result.current.isLoading).toBe(true)
        expect(result.current.isError).toBe(false)
        expect(result.current.data).toBe(undefined)
    });

    test('should return succes state with data when API call succeeds', async () => {
        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman'
            },
            smartesHero: {
                id: '2',
                name: 'Batman'
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryInformationResponse

        mockGetSummaryAction.mockResolvedValue(mockSummaryData)

        const { result } = renderHook(() => useHeroesSummary(), {
            wrapper: tanStackCustomProvider()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy()
        })

        expect(result.current.isLoading).toBeFalsy()
        expect(result.current.isError).toBeFalsy()
        expect(mockGetSummaryAction).toHaveBeenCalled()
    });

    test('should return error state when API call fails', async () => {
        const mockError = new Error('Failed to fetch summary')
        mockGetSummaryAction.mockRejectedValue(mockError)
        const { result } = renderHook(() => useHeroesSummary(), {
            wrapper: tanStackCustomProvider()
        })

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy()
        })

        expect(result.current.error).toBeDefined()
        expect(result.current.isLoading).toBe(false)
        expect(mockGetSummaryAction).toHaveBeenCalled()
    });

});
