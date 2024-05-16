package com.fishfinder.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fishfinder.busobj.RegisterBusobj;
import com.fishfinder.domain.User;
import com.fishfinder.service.ServiceInterface;

@Service
public class UserService implements ServiceInterface<User> {
    private static List<User> users = new ArrayList<>();
    private static int id = 0;

    @Override
    public Boolean deleteById(Long id) {
        int userIndex = 0;
        boolean status = false;
        for (User user : users) {
            if (user.getId().intValue() == id.intValue()){
                userIndex = users.indexOf(user);
                status = true;
                break;
            }
        }
        users.remove(userIndex);
        return status;
    }

    @Override
    public User save(RegisterBusobj t) {
        User newUser = new User();
        newUser.setId(id);
        newUser.setUserName(t.getUser());
        newUser.setPassword(t.getPwd());
        id++;
        users.add(newUser);
        return newUser;
    }

    @Override
    public User getById(Long id) {
        int userIndex = 0;
        for (User user : users) {
            if (user.getId().intValue() == id.intValue()){
                userIndex = users.indexOf(user);
                break;
            }
        }
        return users.get(userIndex);
    };
}
