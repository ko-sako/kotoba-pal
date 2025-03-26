import React, { useState } from 'react';
import { learnWord } from '../api';


interface LearnWordProps {
    recognizedWord: string;  // SpeechRecognitionComponent から受け取る
}

const LearnWord: React.FC<LearnWordProps> = ({ recognizedWord }) => {

    const handleLearnWord = async () => {
        if (recognizedWord) {
            await learnWord(recognizedWord); // API 呼び出し
            alert("Word Learned: " + recognizedWord);
        }
    };

    return (
        <div>
            <button onClick={handleLearnWord}>Learn Word</button>
            <p>Recognized Word: {recognizedWord}</p>
        </div>
    );
};

export default LearnWord;
