import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LearnWord from "./LearnWord.tsx";
import ChatGPTResponse from "./ChatGPTResponse.tsx";
const SpeechRecognitionComponent = () => {
    const [text, setText] = useState("");
    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.onresult = (event) => {
            setText(event.results[0][0].transcript);
        };
        recognition.start();
    };
    return (_jsxs("div", { children: [_jsx("button", { onClick: startListening, children: "Start Listening" }), _jsxs("p", { children: ["Recognized: ", text] }), _jsx(LearnWord, { recognizedWord: text }), _jsx(ChatGPTResponse, { word: text })] }));
};
export default SpeechRecognitionComponent;
