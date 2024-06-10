package com.fishfinder.domain;

import java.util.UUID;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name ="t_fish_checklist", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_uuid", "fish_name"})})
public class FishChecklist {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    UUID id;
    @Column(name="user_uuid", nullable=false)
    UUID userUuid;
    @Column(name = "fish_name", nullable = false)
    String fishName;
}
