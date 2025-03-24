// api.test.ts
import { learnWord } from './api';

// mock the fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ success: true }),
    })
) as jest.Mock;

describe('learnWord API', () => {
    it('should send a POST request to learn a word', async () => {
        const word = 'Hello from React test!';

        // API call
        const result = await learnWord(word);

        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/learn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: word }),
        });

        expect(result.success).toBe(true);
    });

    it('should handle errors correctly', async () => {
        // mock error response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.reject(new Error('Failed to learn word')),
            })
        ) as jest.Mock;

        try {
            await learnWord('Hello from React test!');
        } catch (error) {
            expect(error).toEqual(new Error('Failed to learn word'));
        }
    });
});
