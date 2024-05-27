package com.fishfinder.service;

import java.util.UUID;

import com.fishfinder.busobj.RegisterBusobj;

public interface ServiceInterface<T> {
    Boolean deleteById(UUID id);
    T save(RegisterBusobj t);
    T getById(UUID id);
}
