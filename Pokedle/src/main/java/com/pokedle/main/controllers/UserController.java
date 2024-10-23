package com.pokedle.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@GetMapping({"", "/"})
	private String showWelcome() {
		return "users/index";
	}
	
	@GetMapping("/register")
	private String showRegister() {
		return "users/register";
	};
	
	@GetMapping("/login")
	private String showLogin() {
		return "users/login";
	}
	
}
