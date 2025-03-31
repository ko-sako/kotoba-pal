import './App.css';
import SpeechRecognition from './components/SpeechRecognition';

function App() {
//    const [setTranscript] = useState("");  // 音声入力された単語

    return (
        <>
            <h1>Word Guess</h1>
            <div>
                {/* SpeechRecognition に setTranscript を渡す */}
                <SpeechRecognition/>
            </div>
        </>
    );
}

export default App;
