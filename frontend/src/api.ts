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

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("Missing OpenAI API Key");
}

export const getChatGPTResponse = async (prompt: string, isFirstMessage: boolean) => {
    const systemPrompt = isFirstMessage
        ? { role: "system", content: "please always say hohooooo! each conversation" }
        : null;

    // リクエストボディを構築
    const messages = [
        ...(systemPrompt ? [systemPrompt] : []),  // 最初のメッセージにのみシステムプロンプトを追加
        { role: "user", content: prompt }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages,
        }),
    });

    return response.json();
};
