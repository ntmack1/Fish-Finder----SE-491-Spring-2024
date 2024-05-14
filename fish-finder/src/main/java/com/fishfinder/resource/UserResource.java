package com.fishfinder.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fishfinder.busobj.RegisterBusobj;
import com.fishfinder.service.impl.UserService;

@RestController
@RequestMapping(produces = "/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResource {
    
    @Autowired
    private UserService registerService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody RegisterBusobj user){
        try {
            registerService.save(user);
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }
}
