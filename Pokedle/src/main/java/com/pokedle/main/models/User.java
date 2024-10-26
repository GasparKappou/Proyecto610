package com.pokedle.main.models;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String nombre;
	private String mail;
	private String password;
	private String role;
	private int racha;
	private int adivinados;
	private boolean adivinadoToday;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
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
	public int getRacha() {
		return racha;
	}
	public void setRacha(int racha) {
		this.racha = racha;
	}
	public int getAdivinados() {
		return adivinados;
	}
	public void setAdivinados(int adivinados) {
		this.adivinados = adivinados;
	}
	public boolean isAdivinadoToday() {
		return adivinadoToday;
	}
	public void setAdivinadoToday(boolean adivinadoToday) {
		this.adivinadoToday = adivinadoToday;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
}
