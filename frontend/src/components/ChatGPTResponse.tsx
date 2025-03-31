import React, { useState, useEffect } from 'react';
import { getChatGPTResponse } from '../api';
import './ChatGPTResponse.css';
import Confetti from 'react-confetti';

interface ChatGPTResponseProps {
    word: string;
    startListening: () => void; // 音声認識を開始する関数
}

const ChatGPTResponse: React.FC<ChatGPTResponseProps> = ({ word, startListening }) => {
    const [response, setResponse] = useState<string>('');
    const [isFirstRequest, setIsFirstRequest] = useState(true);
    const [gameState, setGameState] = useState({
        hint: '',
        attempts: 0,
        gameOver: false
    });

    const [messages, setMessages] = useState<any[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const fetchResponse = async (input: string) => {
        if (!input) return; // 空の入力は送らない

        if (gameState.gameOver) {
            setIsFirstRequest(true);
            setGameState({
                hint: '',
                attempts: 0,
                gameOver: false,
            });
            setMessages([]);
        }

        const userMessage = { role: "user", content: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        const result = await getChatGPTResponse(input, isFirstRequest, messages);

        const message = result?.choices?.[0]?.message?.content || "No response";
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: message }]);

        if (/well done/i.test(message)) {
            setGameState(prevState => ({
                ...prevState,
                gameOver: true,
                hint: "Correct! Starting next game."
            }));
            setShowConfetti(true);
        } else {
            setGameState(prevState => ({
                ...prevState,
                attempts: prevState.attempts + 1,
                hint: `Hint: ${message}`,
            }));

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
    };

    useEffect(() => {
        if (isFirstRequest) {
            fetchResponse("hello, start game");
        }
    }, []);

    useEffect(() => {
        if (word) {
            fetchResponse(word);
        }
    }, [word]);

    useEffect(() => {
        if (response) {
            startListening(); // 返答が表示されたら音声認識を再開
        }
    }, [response]);

    useEffect(() => {
        if (showConfetti) {
            setTimeout(() => setShowConfetti(false), 5000);
        }
    }, [showConfetti]);

    return (
        <div>
            <p>{response || "Thinking..."}</p>
            {showConfetti && <Confetti />}
        </div>
    );
};

export default ChatGPTResponse;
