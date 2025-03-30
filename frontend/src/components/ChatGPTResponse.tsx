import React, { useState, useEffect } from 'react';
import { getChatGPTResponse } from '../api';

interface ChatGPTResponseProps {
    word: string;  // receive word from SpeechRecognitionComponent
}

const ChatGPTResponse: React.FC<ChatGPTResponseProps> = ({ word }) => {
    const [response, setResponse] = useState<string>('');
    const [isFirstRequest, setIsFirstRequest] = useState(true);
    const [gameState, setGameState] = useState({
        hint: '',
        attempts: 0,
        gameOver: false
    });

    // 会話履歴を保持
    const [messages, setMessages] = useState<any[]>([]);

    const fetchResponse = async () => {
        if (gameState.gameOver) {
            setIsFirstRequest(true);
            setGameState(prevState => ({
                ...prevState,
                hint: '',
                gameOver: false,
                attempts: 0,
            }));
            setMessages([]); // ゲーム終了時に履歴をリセット
        }

        if (word) {
            // ユーザーからのメッセージを履歴に追加
            const userMessage = { role: "user", content: word };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            const result = await getChatGPTResponse(word, isFirstRequest, messages);

            // ChatGPTからのレスポンスを履歴に追加
            const message = result?.choices?.[0]?.message?.content || "No response";
            setMessages(prevMessages => [...prevMessages, { role: "assistant", content: message }]);

            // ユーザーの発話が正解か不正解か判定
            if (message.includes("Well done") || message.includes("well done")) {
                setGameState(prevState => ({
                    ...prevState,
                    gameOver: true,
                    hint: "Correct! Starting next game."
                }));
            } else {
                // 不正解の場合、ヒントを追加
                setGameState(prevState => ({
                    ...prevState,
                    attempts: prevState.attempts + 1,
                    hint: `Hint: ${message}`,
                }));

                // 10回間違えた場合
                if (gameState.attempts >= 10) {
                    setGameState(prevState => ({
                        ...prevState,
                        gameOver: true,
                        hint: "Game Over! Starting next game."
                    }));
                }
            }

            setResponse(message);

            // 最初のリクエスト後にisFirstRequestをfalseに変更
            if (isFirstRequest) {
                setIsFirstRequest(false);
            }
        }
    };

    return (
        <div>
            <button onClick={fetchResponse}>Start Game</button>
            <p>{response || "Waiting for your guess..."}</p>
            <p>{isFirstRequest ? "isFirstRequest: true" : "isFirstRequest: false"}</p>
            <p>{gameState.gameOver ? "isGameOver: true" : "isGameOver: false"}</p>
            <p>{gameState.hint}</p>
            <p>{gameState.gameOver ? "Game Over. Click to start a new game." : "Guess the word!"}</p>
            <p>Attempts: {gameState.attempts}</p>
        </div>
    );
};

export default ChatGPTResponse;
