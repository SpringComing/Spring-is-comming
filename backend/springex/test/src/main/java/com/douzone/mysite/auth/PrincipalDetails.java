package com.douzone.mysite.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.douzone.mysite.vo.UserVo;

// 시큐리티가 /login 주소 요청이 오면 낚아채서 로그인을 진행시킨다.
// 로그인이 완료되면 시큐리티 Session을 만들어준다. (Security ContextHolder)
// 들어갈 수 있는 오브젝트 => Authentication 객체
// Authentication 안에 User 정보가 있어야 됨.
// User 오브젝트 타입 => UserDetails 타입 객체

// Security Session => Authentication => UserDetails (PrincipalDetails)

public class PrincipalDetails implements UserDetails{

	private UserVo userVo; // 컴포지션
	
	public PrincipalDetails(UserVo userVo) {
		this.userVo = userVo;
	}
	
	// 해당 User의 권한을 리턴하는 곳
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {

			@Override
			public String getAuthority() {
				return "User";
			}
			
		});
		
		return null;
	}

	@Override
	public String getPassword() {
		return userVo.getPassword();
	}

	@Override
	public String getUsername() {
		return userVo.getName();
	}
	
	public String getJoindate() {
		return userVo.getJoin_date();
	}
	
	public String getEmail() {
		return userVo.getEmail();
	}
	
	public String getTel() {
		return userVo.getTel();
	}
	
	public String getBirth() {
		return userVo.getBirth();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override // 비밀번호 오래 사용했나?
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
