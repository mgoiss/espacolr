package com.vobidu.espacolr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

//Classe que pode realizar a configuração, criação de componente especifico etc
@Configuration
public class AppConfig {

	//METODO RESPONSÁVEL POR DISPONIBILIZAR O BCRYPT PARA O PROJETO
	@Bean //é um componente do spring, um Annotations de metodo
	public BCryptPasswordEncoder passwordEncoder() {
		/*Por causa do BEAN, significa que essa instagia vai ser um componente
		 * gerenciado pelo spring, tornando possivel injetar ele em outras
		 * classes e componentes*/
		return new BCryptPasswordEncoder();		
	}
	
	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		JwtAccessTokenConverter tokenConverter = new JwtAccessTokenConverter();
		tokenConverter.setSigningKey("MY-JWT-SECRET");
		return tokenConverter;
	}

	@Bean
	public JwtTokenStore tokenStore() {
		return new JwtTokenStore(accessTokenConverter());
	}
}
