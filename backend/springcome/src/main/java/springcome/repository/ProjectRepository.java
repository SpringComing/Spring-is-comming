package springcome.repository;

import java.util.List;

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
	
	public List<ProjectVo> findTest(){
		return sqlSession.selectList("project.testFind");
		
	}

	public ProjectVo findByProjectNo(Long no) {
		return sqlSession.selectOne("project.findByProjectNo", no);
	}

}
