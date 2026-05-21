package org.cours.web;

import lombok.RequiredArgsConstructor;
import org.cours.dto.AiRequest;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final ChatModel chatModel;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody AiRequest request) {
        String response = chatModel.call(
            new Prompt(new UserMessage(request.getMessage()))
        ).getResult().getOutput().getText(); 
        return ResponseEntity.ok(Map.of("response", response));
    }

    @GetMapping("/suggest")
    public ResponseEntity<Map<String, String>> suggest(
            @RequestParam String marque) {
        String prompt = "En 2-3 phrases, décris les points forts de la marque "
                + marque + " pour un client qui cherche une voiture.";
        String response = chatModel.call(prompt);
        return ResponseEntity.ok(Map.of("suggestion", response));
    }
}