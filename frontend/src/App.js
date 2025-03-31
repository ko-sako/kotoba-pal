import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import SpeechRecognition from './components/SpeechRecognition';
function App() {
    const [setTranscript] = useState(""); // 音声入力された単語
    return (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx(SpeechRecognition, { setTranscript: setTranscript }), _jsx("a", { href: "https://vite.dev", target: "_blank", children: _jsx("img", { src: viteLogo, className: "logo", alt: "Vite logo" }) })] }), _jsx("h1", { children: "Vite + React" })] }));
}
export default App;
