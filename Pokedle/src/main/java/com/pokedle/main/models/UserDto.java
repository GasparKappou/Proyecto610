package com.pokedle.main.models;

import jakarta.validation.constraints.NotEmpty;

public class UserDto {
	@NotEmpty(message = "El nombre no puede estar vacio")
	private String nombre;
	
	@NotEmpty(message = "el correo electronico no puede estar vacio")
	private String mail;
	
	
}
