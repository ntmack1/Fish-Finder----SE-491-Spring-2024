package com.fishfinder.service;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fishfinder.busobj.JwtAuthenticationResponseBusobj;
import com.fishfinder.busobj.LoginBusobj;
import com.fishfinder.busobj.RegisterBusobj;
import com.fishfinder.domain.enums.Role;
import com.fishfinder.domain.User;
import com.fishfinder.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepo userRepo;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public JwtAuthenticationResponseBusobj signUp(RegisterBusobj request){
        var user = User
                   .builder()
                   .userName(request.getUser())
                   .password(passwordEncoder.encode(request.getPwd()))
                   .role(Role.ROLE_USER)
                   .build();
        user = userService.save(user);
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponseBusobj.builder().token(jwt).build();
    }

    public JwtAuthenticationResponseBusobj signIn(LoginBusobj request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUser(), request.getPwd()));
        var user = userRepo.findByUserName(request.getUser()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(user);
        var userId = user.getId(); // get the user's ID
        return JwtAuthenticationResponseBusobj.builder().token(jwt).userId(userId).build(); // include the userId in the response
    }
}