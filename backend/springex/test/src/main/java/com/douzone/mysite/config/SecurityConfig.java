package com.douzone.mysite.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.douzone.mysite.auth.PrincipalDetailsService;


// 사용자의 HTTP 요청 경로에 대해 접근 제한과 같은 보안 관련 처리를 설정하는 클래스

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록이 됨.
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private PrincipalDetailsService principalDetailsService;
	

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf();
		http.authorizeRequests()
			.antMatchers("/user/profile").authenticated()        // /user는 로그인 한 사람만
			.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")      // 로그인 한 사람중에 ADMIN 권한이 있는자
			.anyRequest().permitAll()
			.and()
			.formLogin()           // 인증되지 않은 사용자가 해당 페이지 방문 시 로그인 페이지로 이동
			.loginPage("/loginForm")
			.usernameParameter("email")
			.loginProcessingUrl("/login") // /login이라는 주소가 호출이되면 시큐리티가 낚아채서 대신 로그인을 진행 
			.defaultSuccessUrl("/main",true)
			.failureUrl("/loginForm")
			.and()
			.logout()
			.logoutSuccessUrl("/loginForm");
			
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(principalDetailsService)
			.passwordEncoder(encodePwd());

	}
	
}
