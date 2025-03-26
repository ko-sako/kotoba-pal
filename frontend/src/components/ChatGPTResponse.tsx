import React, { useState } from 'react';
import { getChatGPTResponse } from '../api';

interface LearnWordProps {
    word: string;  // receive word from SpeechRecognitionComponent
}

const ChatGPTResponse: React.FC<LearnWordProps> = ({ word }) => {
    const [response, setResponse] = useState<string>('');

        const fetchResponse = async () => {
            alert('word is: ' + word)
            if (word) {
                const result = await getChatGPTResponse(word);
                setResponse(result);
            }
        };


    return (
        <div>
            <button onClick={fetchResponse}>ChatGPT Call</button>
            <p>{response?.choices?.[0]?.message?.content || "No response"}</p>
        </div>
    );
};

export default ChatGPTResponse;
