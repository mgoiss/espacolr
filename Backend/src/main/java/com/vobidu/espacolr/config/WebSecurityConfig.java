package com.vobidu.espacolr.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//Classe temporraria para ignorar a segurança dos ENDPOINT
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {	
	
	//Injetando o algoritmo de criptografia
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		//O spring vai saber como deve buscar o email e qual o algoritmo de criptografia que foi utilizado
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		//Actuator - é uma biblioteca que o spring cloud usar para gerenciar a rotas
		web.ignoring().antMatchers("/actuator/**");
	}

	@Override
	@Bean //Disponibilizando o AuthenticationManager como um bean no sistema
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}		
}
