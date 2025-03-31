package com.example.kotoba_pal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // すべてのエンドポイントに対してCORSを許可
        registry.addMapping("/**") // すべてのエンドポイント
                .allowedMethods(CorsConfiguration.ALL) // すべてのHTTPメソッドを許可
                .allowedHeaders(CorsConfiguration.ALL) // すべてのヘッダーを許可
                .allowedOriginPatterns(CorsConfiguration.ALL); // すべてのオリジンを許可
    }
}
