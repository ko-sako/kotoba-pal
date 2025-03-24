package com.example.kotoba_pal.repository;

import com.example.kotoba_pal.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}
