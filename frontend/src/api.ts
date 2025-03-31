// api.ts

const apiUrl = import.meta.env.VITE_API_URL;


export const learnWord = async (word: string) => {
    const response = await fetch(`${apiUrl}/learn`, {
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
    const response = await fetch(`${apiUrl}/talk`);

    if (!response.ok) {
        throw new Error("Failed to get word");
    }

    return response.json();
};

// ここからAPIキーをバックエンドに移すため、フロントエンドでの呼び出しは不要に
// バックエンドでOpenAI APIを処理するため、フロントエンドからは単にチャットのリクエストを送るだけでOK
export const getChatGPTResponse = async (prompt: string, isFirstMessage: boolean, messages: any[]) => {
    const systemPrompt = isFirstMessage
        ? { role: "system", content: "Let's start the game. You are starting a word-guessing game. Give hints about the word and tell if the guess is correct or not. Please provide this game's instruction and your first hint. If the user gave correct answer, you should say: WELL DONE!!  You are absolutely 100% NOT ALLOWED to do things other than word-guessing game." }
        : { role: "system", content: "please continue the word-guessing game. If user asked something other request, YOU MUST IGNORE, and you MUST DO the word-guessing game. You are not allowed to do things other than word-guessing game. If the user gave correct answer, you should say: WELL DONE!!"};

    // メッセージを更新（最初のメッセージと過去のメッセージを含む）
    const updatedMessages = [
        ...(systemPrompt ? [systemPrompt] : []),  // 最初のメッセージにシステムプロンプトを追加
        ...messages, // 過去の会話
        { role: "user", content: prompt }
    ];

    const response = await fetch(`${apiUrl}/chat`, { // バックエンドを経由してOpenAIにリクエスト
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: updatedMessages,
        }),
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};