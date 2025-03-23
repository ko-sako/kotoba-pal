package com.example.kotoba_pal.repository;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class WordRepositoryTest {

    @Autowired
    private WordRepository wordRepository;

    @Test
    void shouldSaveAndRetriveWord() {
        Word word = new Word(null, "Hello!");
        wordRepository.save(word);

        Word retrived = wordRepository.findAll().get(0);
        assertThat(retrived.getCount()).isEqualTo("Hello!");
    }
}
