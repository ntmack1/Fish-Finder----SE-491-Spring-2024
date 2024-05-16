package com.fishfinder.service;

import com.fishfinder.busobj.RegisterBusobj;

public interface ServiceInterface<T> {
    Boolean deleteById(Long id);
    T save(RegisterBusobj t);
    T getById(Long id);
}
