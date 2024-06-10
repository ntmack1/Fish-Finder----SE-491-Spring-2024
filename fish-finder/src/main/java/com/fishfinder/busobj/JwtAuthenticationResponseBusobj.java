package com.fishfinder.busobj;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponseBusobj {
    @JsonProperty("token")
    private String token;
    @JsonProperty("userId")
    private UUID userId;
}
