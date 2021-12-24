package springcome.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.CommentVo;
import springcome.vo.TaskDiffVo;
import springcome.vo.TaskSameVo;
import springcome.vo.TaskVo;

@Repository
public class TaskRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<TaskVo> findAllByProcessNo(Long no) {
		return sqlSession.selectList("task.findAllByProcessNo", no);
	}

	public Boolean updateTaskStatus(Long no) {
		return 1 == sqlSession.update("task.update", no);
	}

	public Boolean insert(TaskVo vo) {
		return 1 == sqlSession.insert("task.insert", vo);
	}

	public Long findMaxSeqByProcessNo(Long no) {
		return sqlSession.selectOne("task.findMaxSeqByProcessNo", no);
	}

	public Boolean updateTaskSeq(TaskSameVo vo) {
		Boolean result = true;
		if(1 == sqlSession.update("task.updateTaskSeq1", vo)) result = false;
		if(1 == sqlSession.update("task.updateTaskSeq2", vo)) result = false;
		return result;
		//return 1 == sqlSession.update("task.updateTaskSeq", vo);
	}

	public Boolean updateProcessTaskSeq(TaskDiffVo vo) {
		Boolean result = true;
		if(1 == sqlSession.update("task.updateProcessTaskSeq1", vo)) result = false;
		if(1 == sqlSession.update("task.updateProcessTaskSeq2", vo)) result = false;
		if(1 == sqlSession.update("task.updateProcessTaskSeq3", vo)) result = false;
		return result; 
		//return 1 == sqlSession.update("task.updateProcessTaskSeq", vo); 
		
	}

	public Boolean updateTaskAttr(TaskVo vo) {
		return 1 == sqlSession.update("task.updateTaskAttr", vo);
	}
	
	public List<CommentVo> findComment(String no) {
		
		Map<String,String> a = new HashMap<>();
		a.put("task_no", no);
		
		return sqlSession.selectList("task.findComment",a);

	}
	
	public int addComment(String message, String task_no, String user_no) {
		Map<String,String> a = new HashMap<>();
		a.put("message", message);
		a.put("task_no", task_no);
		a.put("user_no", user_no);
		this.sqlSession.insert("task.addComment",a);
		return Integer.valueOf(String.valueOf((a.get("no"))));
	}
	
	public CommentVo commentData(int no) {
		return sqlSession.selectOne("task.commentData",no);
	}
	
	
}
