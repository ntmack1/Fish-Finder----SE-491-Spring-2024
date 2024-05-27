package com.fishfinder.domain;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name ="t_user")
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    UUID id;
    @Column(name = "uname", nullable = false)
    String userName;
    @Column(name = "pword", nullable = false)
    String password;
}
