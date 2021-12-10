package com.douzone.mysite.auth;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.douzone.mysite.repository.UserRepository;
import com.douzone.mysite.vo.UserVo;


// 시큐리티 설정에서 loginProcessingUrl("/login"); 요청이 오면 자동으로 UserDetailsService 타입으로 IoC되어 있는 loadUserByUsername 함수가 실행


@Service
public class PrincipalDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	// 시큐리티 session = Authentication (내부 UserDetails)
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		UserVo userVo = userRepository.findByUseremail(email);
		if(userVo != null) {
 
			return new PrincipalDetails(userVo);
		}
		System.out.println("일치하는 정보 없음");
		
		return null;
	}
	
	
	
	

}
