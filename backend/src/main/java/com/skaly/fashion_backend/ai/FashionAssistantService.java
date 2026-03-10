package com.skaly.fashion_backend.ai;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
public class FashionAssistantService {

    private final ChatModel chatModel;

    public FashionAssistantService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String chat(String message) {
        return chatModel.call(message);
    }
}
