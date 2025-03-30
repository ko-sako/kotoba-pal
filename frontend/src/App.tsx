import viteLogo from '/vite.svg';
import './App.css';
import SpeechRecognition from './components/SpeechRecognition';

function App() {
//    const [setTranscript] = useState("");  // 音声入力された単語

    return (
        <>
            <div>
                {/* SpeechRecognition に setTranscript を渡す */}
                <SpeechRecognition />
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
        </>
    );
}

export default App;
