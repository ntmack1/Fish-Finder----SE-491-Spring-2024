package com.fishfinder.resource;


import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fishfinder.busobj.JwtAuthenticationResponseBusobj;
import com.fishfinder.busobj.LoginBusobj;
import com.fishfinder.busobj.RegisterBusobj;
import com.fishfinder.service.AuthenticationService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResource {
    
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody RegisterBusobj user) throws JSONException{
        JSONObject jsonObject = new JSONObject();
        JwtAuthenticationResponseBusobj jwt = new JwtAuthenticationResponseBusobj();
        try {
            jwt = authenticationService.signUp(user);
            jsonObject.put("message", user.getUser() + " has been saved");
            jsonObject.put("accessToken", jwt.getToken());
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (Exception e) {
            jsonObject.put("message", user.getUser() + " is in use");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.CONFLICT);
        }
    }

     @PostMapping(value = "/signIn", produces = MediaType.APPLICATION_JSON_VALUE)
     public ResponseEntity<String> logInUser(@RequestBody LoginBusobj user) throws JSONException{
        JSONObject jsonObject = new JSONObject();
        JwtAuthenticationResponseBusobj jwt = new JwtAuthenticationResponseBusobj();

        if(user.getUser().isEmpty() || user.getPwd().isEmpty()){
            jsonObject.put("message", "Username or Password is empty");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.BAD_REQUEST);
        }

        try {
           jwt = authenticationService.signIn(user);
           jsonObject.put("message", user.getUser() + " has signed in");
           jsonObject.put("accessToken", jwt.getToken());
           return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            jsonObject.put("message", e.getMessage());
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.NOT_FOUND);
        }
    }
}
