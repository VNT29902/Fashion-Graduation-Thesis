package com.skaly.fashion_backend.ai;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
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
