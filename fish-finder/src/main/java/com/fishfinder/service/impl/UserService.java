package com.fishfinder.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fishfinder.busobj.RegisterBusobj;
import com.fishfinder.domain.User;
import com.fishfinder.service.ServiceInterface;

@Service
public class UserService implements ServiceInterface<RegisterBusobj> {
    private List<User> users = new ArrayList<>();

    @Override
    public String deleteById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

    @Override
    public RegisterBusobj save(RegisterBusobj t) {
        User newUser = new User();
        return t;
    }

    @Override
    public Optional<RegisterBusobj> getById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    };
}
