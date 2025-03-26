import React, { useState } from 'react';
import { learnWord } from '../api';


interface LearnWordProps {
    recognizedWord: string;  // receive word from SpeechRecognitionComponent
}

const LearnWord: React.FC<LearnWordProps> = ({ recognizedWord }) => {

    const handleLearnWord = async () => {
        if (recognizedWord) {
            await learnWord(recognizedWord); // API call
            //alert("Word Learned: " + recognizedWord);
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
