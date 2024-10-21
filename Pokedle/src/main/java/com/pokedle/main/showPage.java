package com.pokedle.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class showPage {
	@RequestMapping("/input/{id}")
	public String getHomepage(@PathVariable String id) {
		//aca iria algun selector que responda con el archivo correcto dentro de la carpeta src/resources/static
		//String pagina = id.length() == 0? "index" : id;
		//return pagina + ".html";
		return "Lo que ingresaste es: " + id;
	}
}
