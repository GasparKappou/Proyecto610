package com.pokedle.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainController {
	
	@GetMapping({"", "/"})
	private String showWelcome() {
		return "main/index";
	}
	
	@GetMapping("/x")
	private String showRegister() {
		return "main/x";
	};
	
	@GetMapping("/y")
	private String showLogin() {
		return "main/y";
	}
	
}
