package com.canvas.canvas;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class DrawingController {

    private String lastSavedDrawing = null; // To simulate saved drawing in memory

    // Save drawing as a base64 string
    @PostMapping("/save-drawing")
    public Map<String, String> saveDrawing(@RequestBody Map<String, String> requestBody) {
        lastSavedDrawing = requestBody.get("image");
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        return response;
    }

    // Load the last saved drawing
    @GetMapping("/load-drawing")
    public Map<String, String> loadDrawing() {
        Map<String, String> response = new HashMap<>();
        response.put("image", lastSavedDrawing != null ? lastSavedDrawing : "");
        return response;
    }
}
