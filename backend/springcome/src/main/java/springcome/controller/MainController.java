package springcome.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import springcome.auth.PrincipalDetails;
import springcome.vo.UserVo;

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
	
	@RequestMapping({"/test"})
	public String testForm() {
		return "test";
	}
	
}