package com.pokedle.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pokedle.main.services.UserRepository;

@Controller
@RequestMapping("/module")
public class ModeController {
	
	@Autowired
	private UserRepository users;
	
	@GetMapping({"", "/"})
	private String showWelcome() {
		return "holap";
	}

}
