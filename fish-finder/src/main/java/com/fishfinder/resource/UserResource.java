package com.fishfinder.resource;

import java.util.UUID;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fishfinder.busobj.RegisterBusobj;
import com.fishfinder.domain.User;
import com.fishfinder.repository.UserRepo;
import com.fishfinder.service.impl.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResource {
    
    @Autowired
    private UserService registerService;
    @Autowired
    private UserRepo userRepo;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody RegisterBusobj user) throws JSONException{
        JSONObject jsonObject = new JSONObject();
        try {
            User savedUser = registerService.save(user);
            jsonObject.put("message", savedUser.getUserName() + " has been saved");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (Exception e) {
            jsonObject.put("message", user.getUser() + " is in use");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUser(@PathVariable UUID id){
        return new ResponseEntity<>(registerService.getById(id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable UUID id){
        return new ResponseEntity<>(registerService.deleteById(id), HttpStatus.OK);
    }
}
