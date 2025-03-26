export const learnWord = async (word: string) => {
    // alert("[API] Word Learned: " + word);
    const response = await fetch("http://localhost:8080/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: word }),
    });

    if (!response.ok) {
        alert("[API call error] Failed to learn word");
        throw new Error("Failed to learn word");
    }

    return response.json();
};


export const getResponse = async () => {
    const response = await fetch("http://localhost:8080/api/talk");

    if (!response.ok) {
        throw new Error("Failed to get word");
    }

    return response.json();
};

export const getChatGPTResponse = async (word: string) => {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: `Create a response based on the word: "${word}"`,
            max_tokens: 100,
        }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();
};
