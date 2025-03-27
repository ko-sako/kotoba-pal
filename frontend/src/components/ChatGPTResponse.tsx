import React, { useState, useEffect } from 'react';
import { getChatGPTResponse } from '../api';

interface ChatGPTResponseProps {
    word: string;  // receive word from SpeechRecognitionComponent
}

const ChatGPTResponse: React.FC<ChatGPTResponseProps> = ({ word }) => {
    const [response, setResponse] = useState<string>('');
    const [isFirstRequest, setIsFirstRequest] = useState(true);

    useEffect(() => {
        // wordが更新されたときにisFirstRequestをtrueにリセット
        if (word) {
            setIsFirstRequest(true);
        }
    }, [word]);

    const fetchResponse = async () => {
        alert('word is: ' + word);

        if (word) {
            const result = await getChatGPTResponse(word, isFirstRequest);
            setResponse(result);

            // 最初のリクエスト後にisFirstRequestをfalseに変更
            if (isFirstRequest) {
                setIsFirstRequest(false);
            }
        }
    };

    return (
        <div>
            <button onClick={fetchResponse}>ChatGPT Call</button>
            <p>{response?.choices?.[0]?.message?.content || "No response"}</p>
            <p>Is First Request: {isFirstRequest ? "Yes" : "No"}</p> {/* 画面に表示 */}
        </div>
    );
};

export default ChatGPTResponse;
