// api.test.ts
import { learnWord } from './api';

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true, // ✅ ここを `true` にして、サーバーが成功したときの状態を模倣
            json: () => Promise.resolve({ success: true }), // ✅ 成功レスポンスを返す
        })
    ) as jest.Mock;
});

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

        expect(result).toEqual({ success: true });
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
