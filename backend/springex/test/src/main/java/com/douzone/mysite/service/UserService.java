package com.douzone.mysite.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.mysite.repository.UserRepository;
import com.douzone.mysite.vo.UserVo;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public boolean join(UserVo vo) {
		return userRepository.join(vo);
	}

	public UserVo findByUseremail(String useremail) {
		return userRepository.findByUseremail(useremail);
	}
	
	public List<UserVo> findEmail(String name, String tel) {
		return userRepository.findEmail(name, tel);
	}

}
