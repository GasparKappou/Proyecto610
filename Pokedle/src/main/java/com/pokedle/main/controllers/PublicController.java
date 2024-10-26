package com.pokedle.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/public")
public class PublicController {
	
	@GetMapping({"", "/"})
	private String showWelcome() {
		return "public/index";
	}
	
	@GetMapping("/classic")
	private String showClassic() {
		return "public/classic";
	};
	
	@GetMapping("/silhouette")
	private String showSilhouette() {
		return "public/silhouette";
	}
	
	@GetMapping("/tcg")
	private String showTcg() {
		return "public/tcg";
	}
	
	@GetMapping("/emoji")
	private String showEmoji() {
		return "public/emoji";
	}
	
}
