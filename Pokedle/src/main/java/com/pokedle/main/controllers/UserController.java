package com.pokedle.main.controllers;

import java.io.Console;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pokedle.main.models.User;
import com.pokedle.main.models.UserDto;
import com.pokedle.main.services.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private HttpSession session;
	
	@GetMapping({"", "/"})
	private String showWelcome() {
		return "user/index";
	}
	
	@GetMapping("/register")
	private String showRegister(Model model) {
		UserDto userDto = new UserDto();
		model.addAttribute("userDto", userDto);
		return "user/register";
	};
	
	@PostMapping("/register")
	private String Register( @Valid @ModelAttribute UserDto userDto, BindingResult result) throws NoSuchAlgorithmException {
//		System.out.println("nombre: " + userDto.getNombre().isEmpty() + ", mail: " + userDto.getMail().isEmpty() + ", password: " + userDto.getPassword().isEmpty());
		if(result.hasErrors()) {
			return "user/register";
		}
		
		if(repo.findByNombre(userDto.getNombre()) == null) {
			if(repo.findByMail(userDto.getMail()) == null){
				User user = new User();
				user.setNombre(userDto.getNombre());
				user.setMail(userDto.getMail().toLowerCase());
				user.setPassword(EncryptString(userDto.getPassword()));
				user.setRole("user");
				user.setRacha(0);
				user.setAdivinados(0);
				user.setAdivinadoToday(false);
				
				repo.save(user);
			}
			else {
				result.addError(new FieldError("userDto", "mail", "Correo electronico ya registrado."));
				return "user/register";
			}
		}
		else {
			result.addError(new FieldError("userDto", "nombre", "Nombre de usuario ya registrado."));
			return "user/register";
		}
		
		return "redirect:/public";
	}
	
	
	@GetMapping("/login")
	private String showLogin(Model model) {
		UserDto userDto = new UserDto();
		model.addAttribute("userDto", userDto);
		model.addAttribute("tempText", "a");
		return "user/login";
	}
	
	@PostMapping("/login")
	private String Login(@Valid @ModelAttribute UserDto userDto, BindingResult result, Model model, HttpServletRequest request) throws NoSuchAlgorithmException {
		if(repo.findByNombre(userDto.getNombre()) != null) {
			if(repo.findByPasswordAndNombre(EncryptString(userDto.getPassword()), userDto.getNombre()) != null) {
//				System.out.println(model.getAttribute("sessionMail"));
				session = request.getSession();
				session.setAttribute("username", userDto.getNombre());
				
				Enumeration<String> atributos = session.getAttributeNames();
				while(atributos.hasMoreElements()) {
					String atributo = atributos.nextElement();
					System.out.println(atributo + ": " + request.getSession().getAttribute(atributo));
				}
				
				return "public/index";
			}
			result.addError(new FieldError("userDto", "password", "Contraseña incorrecta."));
			return "user/login";
		}
		if(!(userDto.getNombre().isEmpty())) {
//			System.out.println("ESTE ES EL MAIL: " + userDto.getMail());  problemitas técnicos con la validacion del campo input jeje :3
			result.addError(new FieldError("userDto", "mail", "Username no registrado"));
		}
		return "user/login";
	}
	
	@GetMapping("/logout")
	private String logout(){
		if(session != null) {
			session.invalidate();
		}
		System.out.println("sesion destruida.");
		return "public/index";
	}
	
	private String EncryptString(String input) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] messageDigest = md.digest(input.getBytes());
		BigInteger bigInt = new BigInteger(1, messageDigest);
		
		return bigInt.toString(16);
	}
	
}
