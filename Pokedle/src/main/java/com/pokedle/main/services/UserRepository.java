package com.pokedle.main.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pokedle.main.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByMail(String mail);
	User findByPassword(String password);
	User findByNombre(String nombre);
}
