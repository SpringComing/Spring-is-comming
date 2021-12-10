package com.douzone.mysite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.douzone.mysite.service.UserService;
import com.douzone.mysite.utility.MailSender;
import com.douzone.mysite.utility.MessageSender;
import com.douzone.mysite.utility.Sha256;
import com.douzone.mysite.vo.UserVo;

@Controller // View를 리턴
@RequestMapping("/user")
public class UserController {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private UserService userService;

	@ResponseBody
	@RequestMapping(value = "/checkemail", method = RequestMethod.POST)
	public String checkemail(UserVo vo) {

		String emailPattern = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";

		if (vo.getEmail().matches(emailPattern)) {
			UserVo check = userService.findByUseremail(vo.getEmail());
			if (check == null) {
				return "success";
			}
		} else {
			return "fail";
		}

		return "exist";
	}

	@ResponseBody
	@RequestMapping(value = "/checkpassword", method = RequestMethod.POST)
	public String checkpassword(HttpServletRequest request) {

		String passwordPattern = "^[a-zA-Z0-9]{5,30}$";
		String pwd1 = request.getParameter("password");
		String pwd2 = request.getParameter("check_password");

		if (pwd1.equals(pwd2)) {
			if (pwd1.matches(passwordPattern) && pwd2.matches(passwordPattern)) {
				return "success"; // 비밀번호가 일치하고 정규표현식에 만족
			} else {
				return "fail"; // 비밀번호가 일치하지만 정규표현식에 불만족
			}

		} else {
			return "nomatches"; // 비밀번호가 일치하지 않음
		}
	}

	@ResponseBody
	@RequestMapping(value = "/checktel", method = RequestMethod.POST)
	public String checktel(HttpServletRequest request) {

		String telPattern = "^01(?:0|1|[6-9])(\\d{3}|\\d{4})(\\d{4})$";
		String tel = request.getParameter("tel");

		if (tel.matches(telPattern)) {
			return "success";
		} else {
			return "fail";
		}

	}

	@ResponseBody
	@RequestMapping(value = "/sendemail", method = RequestMethod.POST)
	public Map sendemail(HttpServletRequest request) {

		String email = request.getParameter("email");
		MailSender mailSender = new MailSender();

		Map<String, String> map = new HashMap<>();
		map.put("result", "success");
		map.put("rand", Sha256.getHash(mailSender.randnum));
		map.put("email", email);

		try {
			mailSender.sendVerifiNum(email);
			return map;
		} catch (Exception e) {
			return map;
		}

	}

	@ResponseBody
	@RequestMapping(value = "/authemail", method = RequestMethod.POST)
	public String authemail(HttpServletRequest request) {

		String input = Sha256.getHash(request.getParameter("authNum"));
		String cookie = request.getParameter("cookie");
		Boolean results;

		if (input.equals(cookie)) {
			UserVo vo = new UserVo();
			vo.setEmail(request.getParameter("email"));
			vo.setName(request.getParameter("name"));
			vo.setPassword(bCryptPasswordEncoder.encode(request.getParameter("password")));
			vo.setBirth(request.getParameter("birth"));
			vo.setTel(request.getParameter("tel"));
			results = userService.join(vo);

			if (results) {
				return "success";
			} else {
				return "serverError";
			}

		} else {
			return "authError";
		}

	}
	
	@ResponseBody
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	public Map find(HttpServletRequest request) {
		
		String name = request.getParameter("name");
		String tel = request.getParameter("tel");
		String authCode = Integer.toString(((int)(Math.random() * 9999) + 1));
		
		List<UserVo> list = userService.findEmail(name, tel);
		
		Map<String, String> map = new HashMap<>();
		
		if(list.size() == 0) {
			map.put("result", "fail");
			return map;
		}else {
			map.put("result", "success");
			map.put("rand", Sha256.getHash(authCode));
			MessageSender sender = new MessageSender();
			sender.send(tel, authCode);
			
			return map;
		}

	}
	
	@ResponseBody
	@RequestMapping(value = "/auth", method = RequestMethod.POST)
	public String auth(HttpServletRequest request) {
		
		String input = request.getParameter("input");
		String cookie = request.getParameter("cookie");
		
		if(Sha256.getHash(input).equals(cookie)) {
			System.out.println("인증번호 일치");
			return "success";
		}else {
			System.out.println("불일치");
			return "fail";
		}

	}

}
