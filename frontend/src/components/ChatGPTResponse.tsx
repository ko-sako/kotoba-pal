import React, { useState, useEffect } from 'react';
import { getChatGPTResponse } from '../api';
import './ChatGPTResponse.css';  // 追加: CSSファイルをインポート
import Confetti from 'react-confetti';

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

    const [messages, setMessages] = useState<any[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);  // 正解時にクラッカーを表示するための状態

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
            const userMessage = { role: "user", content: word };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            const result = await getChatGPTResponse(word, isFirstRequest, messages);

            const message = result?.choices?.[0]?.message?.content || "No response";
            setMessages(prevMessages => [...prevMessages, { role: "assistant", content: message }]);

            if (message.includes("well done") || (message.includes("well done!!")) || (message.includes("Well done!!")) || (message.includes("Well done"))) {
                setGameState(prevState => ({
                    ...prevState,
                    gameOver: true,
                    hint: "Correct! Starting next game."
                }));
                setShowConfetti(true);  // 正解時にクラッカーを表示
            } else {
                setGameState(prevState => ({
                    ...prevState,
                    attempts: prevState.attempts + 1,
                    hint: `Hint: ${message}`,
                }));
                //if (!(isFirstRequest)) setShowConfetti(true);  // 正解時にクラッカーを表示
                if (gameState.attempts >= 10) {
                    setGameState(prevState => ({
                        ...prevState,
                        gameOver: true,
                        hint: "Game Over! Starting next game."
                    }));
                }
            }

            setResponse(message);

            if (isFirstRequest) {
                setIsFirstRequest(false);
            }
        }
    };

    useEffect(() => {
        if (showConfetti) {
            // 3秒後にクラッカーエフェクトを非表示
            setTimeout(() => setShowConfetti(false), 5000);
        }
    }, [showConfetti]);

    return (
        <div>
            <button onClick={fetchResponse}>Start Game</button>
            <p>{response || "Waiting for your guess..."}</p>
            <p>{gameState.hint}</p>
            <p>{gameState.gameOver ? "Game Over. Click to start a new game." : "Guess the word!"}</p>
            <p>Attempts: {gameState.attempts}</p>

            {/* 正解時にクラッカーエフェクトを表示 */}
            {showConfetti && <Confetti />}
        </div>
    );
};

export default ChatGPTResponse;
