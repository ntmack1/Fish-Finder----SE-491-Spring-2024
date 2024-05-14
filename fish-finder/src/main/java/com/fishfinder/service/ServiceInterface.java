package com.fishfinder.service;

import java.util.Optional;

public interface ServiceInterface<T> {
    String deleteById(Long id);
    T save(T t);
    Optional<T> getById(Long id);
}
