package com.example.kotoba_pal.controller;

import com.example.kotoba_pal.model.Word;
import com.example.kotoba_pal.repository.WordRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class WordController {

    private final WordRepository wordRepository;
    private final Random random = new Random();

    public WordController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @PostMapping("/learn")
    public Word learnWord(@RequestBody Word word) {
        return wordRepository.save(word);
    }

    @GetMapping("/all")
    public List<Word> allWords() {
        List<Word> words = wordRepository.findAll();
        if (words.isEmpty()) {
            Word tmp_word = new Word(null, "I have not remember any words..");
            words.add(tmp_word);
        }
        return words;
    }

    @GetMapping("/talk")
    public Word talk() {
        List<Word> words = wordRepository.findAll();
        if (words.isEmpty()) return new Word(null, "I have not remember any words..");
        return words.get(random.nextInt(words.size()));
    }


    @Value("${openai.api.key}")
    private String openAiApiKey;


    @PostMapping("/chat")
    public ResponseEntity<?> getChatResponse(@RequestBody Map<String, Object> body) {
        try {
            String apiUrl = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + openAiApiKey);

            // OpenAI API用のリクエストボディを作成
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("messages", body.get("messages"));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            // OpenAI APIにリクエストを送る
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred: " + e.getMessage());
        }
    }
}
