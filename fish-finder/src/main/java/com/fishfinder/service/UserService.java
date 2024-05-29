package com.fishfinder.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fishfinder.domain.User;
import com.fishfinder.repository.UserRepo;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
@RequiredArgsConstructor
public class UserService {
   
    @Autowired
    private UserRepo userRepo;

    public Boolean deleteById(UUID id) {
        boolean status = false;
        try {
            userRepo.deleteById(id);
            status = true;
        } catch (Exception e) {
           e.printStackTrace();
        }
        return status;
    }

    
    public User save(User newUser) {
        if(newUser.getId() == null){
            newUser.setCreatedAt(LocalDateTime.now());
        }
        newUser.setUpdatedAt(LocalDateTime.now());
        return userRepo.saveAndFlush(newUser);
    }


    public UserDetailsService userDetailsService(){
        return new UserDetailsService(){
            @Override
            public UserDetails loadUserByUsername(String userName){
                return userRepo.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
            }

        };
    }
}
