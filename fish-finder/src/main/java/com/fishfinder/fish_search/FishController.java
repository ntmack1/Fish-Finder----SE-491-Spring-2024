package com.fishfinder.fish_search;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
@CrossOrigin(origins = "http://localhost:3000") // React app's URL

@RestController
public class FishController {
	private List<Fish> fishList;

    @GetMapping("/fish/{name}")
    public ResponseEntity<?> getFishByName(@PathVariable String name) {
        try {
            ClassPathResource resource = new ClassPathResource("fish_data.json");
            ObjectMapper mapper = new ObjectMapper();
            TypeFactory typeFactory = mapper.getTypeFactory();
            fishList = mapper.readValue(resource.getInputStream(),
                                                   typeFactory.constructCollectionType(List.class, Fish.class));

            Optional<Fish> fish = fishList.stream()
                                          .filter(f -> f.getName().equalsIgnoreCase(name))
                                          .findFirst();

            return fish.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to process the JSON file.");
        }
    }
    @GetMapping("/fish/all")
    public ResponseEntity<List<Fish>> getAllFish() {
        return ResponseEntity.ok(fishList);
    }
    
    @GetMapping("/fish/content")
    public ResponseEntity<String> getFishFileContent() {
        ClassPathResource resource = new ClassPathResource("fish_data.json");
        try {
            String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to read the content of the file.");
        }
    }

    
    
}