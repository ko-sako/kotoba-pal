import React, { useState, useEffect, useRef } from "react";
import ChatGPTResponse from "./ChatGPTResponse.tsx";

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof webkitSpeechRecognition;
    }
}

const SpeechRecognitionComponent: React.FC = () => {
    const [text, setText] = useState("");
    const [recognizedText, setRecognizedText] = useState(""); // ChatGPT に送るテキスト
    const [isListening, setIsListening] = useState(false);
    const lastStoppedRef = useRef<number | null>(null); // 音声認識停止のタイミングを記録
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // タイマーIDを保持
    const isFirstRun = useRef(true); // 最初の実行かどうかのフラグ

    const startListening = () => {
        const recognition =
            new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false; // 1回の認識ごとに終了
        recognition.interimResults = true; // 確定した結果のみ取得
        recognition.lang = 'en-UK'

        recognition.onstart = () => {
            setIsListening(true);
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current); // タイマーをリセット
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimTranscript = "";
            let finalTranscript = "";

            for (let i = 0; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            setText(interimTranscript || finalTranscript); // 途中経過もリアルタイム表示

            if (finalTranscript) {
                setRecognizedText(finalTranscript); // 確定した結果を送信
            }
        };

        recognition.onerror = () => {
            setIsListening(false);
            lastStoppedRef.current = Date.now(); // エラー時も停止時刻を記録
            restartAfterTimeout(); // エラー時も再試行
        };

        recognition.onend = () => {
            setIsListening(false);
            lastStoppedRef.current = Date.now(); // 停止時刻を記録
            restartAfterTimeout(); // 停止時に再試行
        };

        recognition.start();
    };

    const restartAfterTimeout = () => {
        if (lastStoppedRef.current === null) return; // 初回時は再試行しない

        const currentTime = Date.now();
        const elapsedTime = currentTime - lastStoppedRef.current;

        // 停止から10秒経過した場合のみ再開
        if (elapsedTime >= 4000 && !isListening) {
            startListening();
        }
    };

    // 初回の処理でstartListeningを1回だけ呼び出す
    useEffect(() => {
        if (isFirstRun.current) {
            startListening();
            isFirstRun.current = false; // 最初の実行をフラグで制御
        }

        const intervalId = setInterval(() => {
            restartAfterTimeout(); // 定期的に再開処理を確認
        }, 1000); // 1秒ごとに確認

        return () => {
            clearInterval(intervalId); // クリーンアップ処理
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current); // クリーンアップタイマー
        };
    }, []); // 初回のみ実行

    return (
        <div>
            <p>Recognized: {text}</p>
            <ChatGPTResponse word={recognizedText} startListening={startListening} />
        </div>
    );
};

export default SpeechRecognitionComponent;
