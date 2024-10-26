package com.pokedle.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pokedle.main.controllers.CustomUserDetails;
import com.pokedle.main.models.User;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository repo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = repo.findByNombre(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("Username" + username + " no encontrado");
		}
		
		CustomUserDetails customUserDetails = new CustomUserDetails(user);
		
		return customUserDetails;
	}

}
