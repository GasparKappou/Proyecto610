package com.pokedle.main.models;

import jakarta.validation.constraints.*;

public class UserDto {
	@NotEmpty(message = "El nombre no puede estar vacio")
	private String nombre;
	
	@NotEmpty(message = "el correo electronico no puede estar vacio")
	private String mail;
	
	@NotEmpty(message = "la contraseña no puede estar vacia")
	private String password;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
