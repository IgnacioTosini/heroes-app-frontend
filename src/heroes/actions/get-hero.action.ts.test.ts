import { describe, expect, test } from "vitest";
import { getHero } from "./get-hero.action";

describe('GetHeroAction', () => {
    test('should fetch hero data and return with complete image url', async () => {
        const result = await getHero('clark-kent')
        expect(result.image).toContain(`http`)

        // Match the shape of the response but avoid asserting a fixed BASE_URL (CI may use a different API host)
        expect(result).toMatchObject({
            id: '1',
            name: 'Clark Kent',
            slug: 'clark-kent',
            alias: 'Superman',
            powers: [
                'Súper fuerza',
                'Vuelo',
                'Visión de calor',
                'Visión de rayos X',
                'Invulnerabilidad',
                'Súper velocidad'
            ],
            description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
            strength: 10,
            intelligence: 8,
            speed: 9,
            durability: 10,
            team: 'Liga de la Justicia',
            firstAppearance: '1938',
            status: 'Active',
            category: 'Hero',
            universe: 'DC'
        })

        // Ensure the image path ends with the expected resource
        expect(result.image).toMatch(/\/images\/1\.jpeg$/)
    });
    test('should throw an error if hero is not found', async () => {
        const idSlug = 'batman2'
        const result = await getHero(idSlug).catch(error => {
            expect(error).toBeDefined();
            expect(error.message).toBe('Request failed with status code 404')
        })

        expect(result).toBeUndefined()
    });

})