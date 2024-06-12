package com.fishfinder.controller;
import com.fishfinder.domain.FishChecklist;
import com.fishfinder.domain.User;
import com.fishfinder.repository.FishChecklistRepository;
import com.fishfinder.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/checklist")
public class FishChecklistController {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private FishChecklistRepository fishChecklistRepository;

    @PostMapping("/saveFish")
    public ResponseEntity<String> saveFish(@RequestBody FishChecklist fishChecklist) {
        User user = userRepository.findById(fishChecklist.getUserUuid()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Check if the fish is already saved for this user
        List<FishChecklist> existingFish = fishChecklistRepository.findByUserUuidAndFishName(fishChecklist.getUserUuid(), fishChecklist.getFishName());
        if (!existingFish.isEmpty()) {
            return ResponseEntity.badRequest().body("Fish already saved");
        }

        fishChecklistRepository.save(fishChecklist);
        return ResponseEntity.ok("Fish saved successfully");
    }


    @GetMapping("/getFishByUser/{userUuid}")
    public ResponseEntity<List<FishChecklist>> getFishByUser(@PathVariable UUID userUuid) {
        List<FishChecklist> fishList = fishChecklistRepository.findByUserUuid(userUuid);
        return ResponseEntity.ok(fishList);
    }
}
