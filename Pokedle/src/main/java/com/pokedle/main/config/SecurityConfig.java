package com.pokedle.main.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	@Autowired
	private UserDetailsService userDetailsService;
	 
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.authorizeHttpRequests(auth -> auth.requestMatchers("/public/**").permitAll()
				.requestMatchers("/user").authenticated() 
				)
				.formLogin(login -> login
                        .loginPage("/user/login")
                        .permitAll())
				.build();
	}
	
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
	    return (web) -> web.ignoring().requestMatchers("/styles/**", "/js/**", "/src/**");
	}
	
	@SuppressWarnings("deprecation")
	@Bean
	AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(new MessageDigestPasswordEncoder("MD5"));
		return provider;
	}
}
