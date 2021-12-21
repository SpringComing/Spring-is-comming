package springcome.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.UserVo;

@Repository
public class UserRepository {

	@Autowired
	private SqlSession sqlSession;

	public boolean join(UserVo vo) {

		int count = sqlSession.insert("user.join", vo);

		return count == 1;

	}

	public UserVo findByUseremail(String useremail) {

		Map<String, String> map = new HashMap<>();
		map.put("e", useremail);

		return sqlSession.selectOne("findByUseremail", map);
	}

	public UserVo findEmail(String name, String tel) {

		Map<String, String> map = new HashMap<>();
		map.put("n", name);
		map.put("t", tel);

		return sqlSession.selectOne("findEmail", map);

	}

	public UserVo findPassword(String email, String tel) {

		Map<String, String> map = new HashMap<>();
		map.put("e", email);
		map.put("t", tel);

		return sqlSession.selectOne("findPassword", map);

	}
	
	public UserVo findTel(String tel) {

		Map<String, String> map = new HashMap<>();
		map.put("t", tel);

		return sqlSession.selectOne("findTel", map);

	}
	
	public int updatePWD(String email, String password) {

		Map<String, String> map = new HashMap<>();
		map.put("e", email);
		map.put("p", password);

		return sqlSession.update("updatePWD", map);

	}

	public List<UserVo> findPeopleByProjectNo(Long projectNo) {
		return sqlSession.selectList("user.findPeopleByProjectNo", projectNo);
	}

	public boolean updateAttend(Long projectNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("projectNo", projectNo);
		map.put("userNo", userNo);
		return sqlSession.update("project.updateAttend", map) == 1;
	}

}
