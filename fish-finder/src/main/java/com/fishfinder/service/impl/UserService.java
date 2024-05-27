package com.fishfinder.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fishfinder.busobj.RegisterBusobj;
import com.fishfinder.domain.User;
import com.fishfinder.repository.UserRepo;
import com.fishfinder.service.ServiceInterface;

@Service
public class UserService implements ServiceInterface<User> {
   
    @Autowired
    private UserRepo userRepo;


    @Override
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

    @Override
    public User save(RegisterBusobj t) {
        User newUser = new User();
        newUser.setUserName(t.getUser());
        newUser.setPassword(t.getPwd());
        return userRepo.saveAndFlush(newUser);
    }

    @Override
    public User getById(UUID id) {
        return userRepo.getReferenceById(id);
    };
}
