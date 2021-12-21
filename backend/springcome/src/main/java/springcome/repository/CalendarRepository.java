package springcome.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.MemoVo;
import springcome.vo.ProjectVo;
import springcome.vo.TaskToProjectVo;

@Repository
public class CalendarRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<ProjectVo> FindProject(String userno) {

		Map<String, String> map = new HashMap<>();
		map.put("no", userno);

		return sqlSession.selectList("calendar.FindProject", map);
	}

	public int insertMemo(String no, String title, String date, String n) {
		Map<String, String> map = new HashMap<>();
		map.put("no", no);
		map.put("title", title);
		map.put("date", date);
		map.put("n", n);

		return sqlSession.insert("insertMemo", map);
	}

	public List<MemoVo> findMemo(String userno) {

		Map<String, String> map = new HashMap<>();
		map.put("no", userno);
		return sqlSession.selectList("calendar.FindMemo", map);

	}

	public int deleteMemo(String title, String date, String userno, String no) {
		Map<String, String> map = new HashMap<>();
		map.put("title", title);
		map.put("date", date);
		map.put("no", userno);
		map.put("n", no);

		return sqlSession.delete("calendar.deleteMemo", map);

	}

	public List<TaskToProjectVo> findTask(String userno) {
		Map<String, String> map = new HashMap<>();
		map.put("no", userno);
		return sqlSession.selectList("calendar.FindTask", map);

	}
	
	public int updateMemo(String title, String date, String userno, String no) {
		Map<String, String> map = new HashMap<>();
		map.put("title", title);
		map.put("date", date);
		map.put("no", userno);
		map.put("n", no);

		return sqlSession.update("calendar.updateMemo", map);
	}
	
	public String maxNo() {
		return sqlSession.selectOne("calendar.maxNo");
	}
	
}
