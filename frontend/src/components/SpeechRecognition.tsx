import React, { useState } from "react";
import LearnWord from "./LearnWord.tsx";

const SpeechRecognitionComponent: React.FC = () => {
    const [text, setText] = useState("");

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.onresult = (event) => {
            setText(event.results[0][0].transcript);
        };
        recognition.start();
    };

    return (
        <div>
            <button onClick={startListening}>Start Listening</button>
            <p>Recognized: {text}</p>
            <LearnWord recognizedWord={text}/>
        </div>
    );
};

export default SpeechRecognitionComponent;
