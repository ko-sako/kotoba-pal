package com.example.kotoba_pal.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfig {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    public DatabaseConfig(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void setupTemporaryTable() {
        String sql;
        try {
            System.out.println("PostConstruct method called!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.out.println(databaseUrl);
            if (databaseUrl.startsWith("jdbc:sqlite")) {
                sql = """
                    CREATE TEMPORARY TABLE wordwef
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        content VARCHAR(255)
                    );
            """;
            } else {
                sql = """
                CREATE TEMPORARY TABLE IF NOT EXISTS words (
                    id SERIAL PRIMARY KEY,
                    content TEXT
                );
            """;
            }
            jdbcTemplate.execute(sql);
            int rowsAffected = jdbcTemplate.update(sql);
            System.out.println("Rows affected: " + rowsAffected);
            System.out.println("PostConstruct method called!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        } catch (Exception e) {
            System.err.println("Error creating temporary table: " + e.getMessage());
        }
    }
}
