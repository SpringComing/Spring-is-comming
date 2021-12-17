package springcome.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import springcome.auth.PrincipalDetails;

/*
 * 클래스: MainController
 * 작성자: 이동현
 * 책임: 요청에 따른 View를 리턴 (회원가입, ID/PWD찾기, 로그인, 메인)
 */

@Controller
public class MainController {
		
	@RequestMapping({"", "/main"})
	public String index(@AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletRequest req, HttpServletResponse resp) {
		
//		UserVo vo = new UserVo();
//		vo.setEmail(principalDetails.getEmail());
//		vo.setJoin_date(principalDetails.getJoindate());
//		vo.setBirth(principalDetails.getBirth());
//		vo.setName(principalDetails.getUsername());
//
//		model.addAttribute("UserVo",vo);
		
		Cookie Cookie = new Cookie("useremail", principalDetails.getEmail());
//		Cookie nameCookie = new Cookie("username", principalDetails.getUsername());
//		Cookie noCookie = new Cookie("userno", principalDetails.getNo().toString());
		
		Cookie.setMaxAge(-1);
		resp.addCookie(Cookie);
		
//		nameCookie.setMaxAge(-1);
//		resp.addCookie(nameCookie);
//		
//		noCookie.setMaxAge(-1);
//		resp.addCookie(noCookie);
		
		return "redirect:http://localhost:9999/";
	}
	
	@RequestMapping({"/user"})
	public @ResponseBody String user() {
		return "user";
	}
	
	@RequestMapping({"/joinForm"})
	public String joinForm() {
		return "joinForm";
	}
	
	@RequestMapping({"/loginForm"})
	public String loginForm(HttpServletRequest req, HttpServletResponse resp) {
		
		Cookie[] cookies = req.getCookies();
		
		if(cookies != null) {
		
		for(Cookie c : cookies) {
			if(c.getName().equals("useremail")) {
				c.setMaxAge(0);
				resp.addCookie(c);
			}
		}
		}
		
		
		return "loginForm";
	}
	
	@RequestMapping({"/findForm"})
	public String findForm() {
		return "findForm";
	}
		
}