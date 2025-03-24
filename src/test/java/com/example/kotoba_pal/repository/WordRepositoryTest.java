package com.example.kotoba_pal.repository;


import com.example.kotoba_pal.model.Word;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class WordRepositoryTest {

    @Autowired
    private WordRepository wordRepository;

    @Test
    void shouldSaveAndRetrieveWord() {
        Word word = new Word(null, "Hello!");
        wordRepository.save(word);

        Word retrieved = wordRepository.findAll().get(2);
        assertThat(retrieved.getContent()).isEqualTo("Hello!");
    }
}
