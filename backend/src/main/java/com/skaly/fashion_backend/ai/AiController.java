package com.skaly.fashion_backend.ai;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@RestController
@RequestMapping("/api/v1/ai")
@ConditionalOnProperty(name = "spring.ai.google.genai.api-key")
public class AiController {

    private final FashionAssistantService fashionAssistantService;

    public AiController(FashionAssistantService fashionAssistantService) {
        this.fashionAssistantService = fashionAssistantService;
    }

    @GetMapping("/chat")
    public String chat(@RequestParam String message) {
        return fashionAssistantService.chat(message);
    }
}
