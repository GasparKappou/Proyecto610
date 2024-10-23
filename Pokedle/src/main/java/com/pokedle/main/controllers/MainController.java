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
	
	@GetMapping("/classic")
	private String showClassic() {
		return "main/classic";
	};
	
	@GetMapping("/silhouette")
	private String showSilhouette() {
		return "main/silhouette";
	}
	
	@GetMapping("/tcg")
	private String showTcg() {
		return "main/tcg";
	}
	
	@GetMapping("/emoji")
	private String showEmoji() {
		return "main/emoji";
	}
	
}
