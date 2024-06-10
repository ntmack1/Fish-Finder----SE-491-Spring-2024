package com.fishfinder.repository;

import com.fishfinder.domain.FishChecklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FishChecklistRepository extends JpaRepository<FishChecklist, UUID> {
    List<FishChecklist> findByUserUuid(UUID userUuid);
    List<FishChecklist> findByUserUuidAndFishName(UUID userUuid, String fishName);
}
