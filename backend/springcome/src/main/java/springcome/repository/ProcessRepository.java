package springcome.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.ProcessVo;

@Repository
public class ProcessRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<ProcessVo> findAllByProjectNo(Long no) {
		return sqlSession.selectList("process.findAllByProjectNo", no);
	}

}
