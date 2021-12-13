package com.douzone.mysite.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.mysite.vo.UserVo;

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
	
	public int updatePWD(String email, String password) {

		Map<String, String> map = new HashMap<>();
		map.put("e", email);
		map.put("p", password);

		return sqlSession.update("updatePWD", map);

	}

}
