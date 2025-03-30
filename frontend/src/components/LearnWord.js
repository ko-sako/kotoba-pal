import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { learnWord } from '../api';
const LearnWord = ({ recognizedWord }) => {
    const handleLearnWord = async () => {
        if (recognizedWord) {
            await learnWord(recognizedWord); // API call
            //alert("Word Learned: " + recognizedWord);
        }
    };
    return (_jsxs("div", { children: [_jsx("button", { onClick: handleLearnWord, children: "Learn Word" }), _jsxs("p", { children: ["Recognized Word: ", recognizedWord] })] }));
};
export default LearnWord;
