package springcome.service;

import java.util.List;

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

	public List<UserVo> findProjectPeople(Long projectNo) {
		return userRepository.findPeopleByProjectNo(projectNo);
	}

	public boolean updateProjectPeople(Long projectNo, Long userNo) {
		return userRepository.updateAttend(projectNo, userNo);
	}

}
