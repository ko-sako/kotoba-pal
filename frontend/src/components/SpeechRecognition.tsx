import React, { useState } from "react";
import LearnWord from "./LearnWord.tsx";
import ChatGPTResponse from "./ChatGPTResponse.tsx";

// Web Speech API の型定義を追加
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;  // SpeechRecognition の型
        webkitSpeechRecognition: typeof webkitSpeechRecognition;  // webkitSpeechRecognition の型
    }
}

// SpeechRecognitionComponent の実装
const SpeechRecognitionComponent: React.FC = () => {
    const [text, setText] = useState("");

    const startListening = () => {
        const recognition =
            new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            setText(event.results[0][0].transcript);
        };
        recognition.start();
    };

    return (
        <div>
            <button onClick={startListening}>Start Listening</button>
            <p>Recognized: {text}</p>
            <LearnWord recognizedWord={text} />
            <ChatGPTResponse word={text} />
        </div>
    );
};

export default SpeechRecognitionComponent;
