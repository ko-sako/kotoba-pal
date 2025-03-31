package com.example.kotoba_pal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")  // ワイルドカードで全てのオリジンを許可
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // 必要なHTTPメソッドを許可
                .allowedHeaders("*")  // すべてのヘッダーを許可
                .allowCredentials(true);  // 必要であれば、認証情報を含める設定
    }
}
