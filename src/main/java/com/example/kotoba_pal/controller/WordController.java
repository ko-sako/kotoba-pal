package com.example.kotoba_pal.controller;

import com.example.kotoba_pal.model.Word;
import com.example.kotoba_pal.repository.WordRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
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
}
