import React, { useState } from 'react';
import { learnWord } from '../api';

const WordLearning: React.FC = () => {
    const [recognizedWord, setRecognizedWord] = useState('');

    const handleLearnWord = async () => {
        if (recognizedWord) {
            await learnWord(recognizedWord); // call `learnWord` at `api.ts`
            alert('Word Learned: ' + recognizedWord);
        }
    };

    return (
        <div>
            <button onClick={handleLearnWord}>Learn Word</button>
            <p>Recognized Word: {recognizedWord}</p>
        </div>
    );
};

export default WordLearning;
