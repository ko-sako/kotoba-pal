import {getResponse} from "../api.ts";

beforeEach(() => {
    jest.clearAllMocks();  // clear the mock
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true, // Mock the success API response
            json: () => Promise.resolve({
                "id": 3,
                "content": "Hello!"
            }),
        })
    ) as jest.Mock;
});


describe('getWord API', () => {
    it('should send a GET request to retrieve a word', async () => {
        // API call
        const result = await getResponse();

        expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/talk");
        expect(result).toEqual({
            "id": 3,
            "content": "Hello!"
        });
    });

    it('should handle errors correctly', async () => {
        // mock error response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.reject(new Error('Failed to get word')),
            })
        ) as jest.Mock;

        try {
            await getResponse();
        } catch (error) {
            expect(error).toEqual(new Error('Failed to get word'));
        }
    });
});
