package com.example.kotoba_pal;

import com.example.kotoba_pal.config.SecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.kotoba_pal.config.WebConfig;  // WebConfigクラスをインポート
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({WebConfig.class, SecurityConfig.class}) // CORSとセキュリティ設定を明示的にインポート
public class KotobaPalApplication {

	public static void main(String[] args) {
		SpringApplication.run(KotobaPalApplication.class, args);
	}

}
