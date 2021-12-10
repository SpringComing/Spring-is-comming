package com.douzone.mysite.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.douzone.mysite.auth.PrincipalDetails;
import com.douzone.mysite.vo.UserVo;

@Controller // View를 리턴
public class MainController {
	
	@RequestMapping({"", "/main"})
	public String index(@AuthenticationPrincipal PrincipalDetails principalDetails, Model model) {
		
		UserVo vo = new UserVo();
		vo.setEmail(principalDetails.getEmail());
		vo.setJoin_date(principalDetails.getJoindate());
		vo.setBirth(principalDetails.getBirth());
		vo.setName(principalDetails.getUsername());
		

		
		model.addAttribute("UserVo",vo);
		
		return "index";
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
	public String loginForm() {
		return "loginForm";
	}
	
	@RequestMapping({"/findForm"})
	public String findForm() {
		return "findForm";
	}
	
}