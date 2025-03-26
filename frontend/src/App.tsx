import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import SpeechRecognition from './components/SpeechRecognition';
import ChatGPTResponse from './components/ChatGPTResponse.tsx';

function App() {
    const [transcript, setTranscript] = useState("");  // 音声入力された単語
    const [response, setResponse] = useState("");  // ChatGPT API のレスポンス

    // 音声入力が終わったら ChatGPT API に投げる
    useEffect(() => {
        if (transcript) {
            fetchChatGPTResponse(transcript);
        }
    }, [transcript]);

    // ChatGPT API にリクエストを送る関数
    const fetchChatGPTResponse = async (text: string) => {
        try {
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // 環境変数からAPIキーを取得
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: text }],
                }),
            });

            if (!res.ok) {
                throw new Error(`API request failed: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.choices[0]?.message?.content || "No response from API");
        } catch (error) {
            console.error("Error fetching ChatGPT response:", error);
            setResponse("Error fetching response.");
        }
    };

    return (
        <>
            <div>
                {/* SpeechRecognition に setTranscript を渡す */}
                <SpeechRecognition setTranscript={setTranscript} />
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
        </>
    );
}

export default App;