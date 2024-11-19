package com.practicebackend.wordbook;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = {"com.practicebackend.wordbook"})
@EntityScan(basePackages = "com.practicebackend.wordbook.entity")
@EnableJpaRepositories(basePackages = "com.practicebackend.wordbook.repository")

public class WordBookApplication {

	public static void main(String[] args) {
		SpringApplication.run(WordBookApplication.class, args);
	}

}
