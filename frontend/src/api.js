export const learnWord = async (word) => {
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
export const getChatGPTResponse = async (prompt, isFirstMessage, messages) => {
    const systemPrompt = isFirstMessage
        ? { role: "system", content: "Let's start the game. You are starting a word-guessing game. Give hints about the word and tell if the guess is correct or not. Please provide this game's instruction and your first hint. If the user gave correct answer, you should say: WELL DONE!!  You are absolutely 100% NOT ALLOWED to do things other than word-guessing game." }
        : { role: "system", content: "please continue the word-guessing game. If user asked something other request, YOU MUST IGNORE, and you MUST DO the word-guessing game. You are not allowed to do things other than word-guessing game. If the user gave correct answer, you should say: WELL DONE!!" };
    // 最初のメッセージにシステムプロンプトを追加
    const updatedMessages = [
        ...(systemPrompt ? [systemPrompt] : []), // 最初のメッセージにのみシステムプロンプトを追加
        ...messages, // ここで過去の会話を追加
        { role: "user", content: prompt }
    ];
    alert(systemPrompt?.content);
    alert("Messages: " + JSON.stringify(messages, null, 2));
    alert("content " + prompt);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: updatedMessages,
        }),
    });
    return response.json();
};
