package springcome.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.ProjectVo;

@Repository
public class ProjectRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<ProjectVo> findAll(Long no) {
		return sqlSession.selectList("project.findAllByNo",no);
	}

	public boolean insertProject( ProjectVo projectVo) {
		return sqlSession.insert("project.insertProject",  projectVo) == 1;
	}

	public boolean insertAttend(Long userNo, Long projectNo, String role,Long sequence) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("projectNo", projectNo);
		map.put("sequence", sequence);
		map.put("role", role);
		return sqlSession.insert("project.insertAttend",  map) == 1;
	}

	public Long findLastSequence(Long userNo) {
		return sqlSession.selectOne("project.findLastSequence", userNo);
	}

	public boolean updateBasic(ProjectVo projectVo) {
		return sqlSession.update("project.updateBasic", projectVo) == 1;
	}

	public List<ProjectVo> findTest(){
		return sqlSession.selectList("project.testFind");
		
	}

	public boolean insertGuest(String email, Long projectNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("email", email);
		map.put("no", projectNo);
		return sqlSession.insert("project.insertGuest", map) ==  1;
	}
	
}