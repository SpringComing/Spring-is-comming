package springcome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.UserRepository;
import springcome.vo.UserVo;



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
	
	public UserVo findEmail(String name, String tel) {
		return userRepository.findEmail(name, tel);
	}
	
	public UserVo findPassword(String email, String tel) {
		return userRepository.findPassword(email, tel);
	}
	
	public UserVo findTel(String tel) {
		return userRepository.findTel(tel);
	}
	
	public int updatePWD(String email, String password) {

		return userRepository.updatePWD(email, password);

	}
	
	public UserVo findAll(String user_no) {
		return userRepository.findAll(user_no);
	}
	
	public int updateProfile(String name, String birth, String no, String profile) {
		return userRepository.updateProfile(name, birth, no, profile);
	}

}
