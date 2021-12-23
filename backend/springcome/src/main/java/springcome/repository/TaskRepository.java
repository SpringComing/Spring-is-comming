package springcome.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import springcome.vo.FileVo;
import springcome.vo.TaskDiffVo;
import springcome.vo.TaskSameVo;
import springcome.vo.TaskVo;
import springcome.vo.UserVo;

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

	public List<UserVo> getTaskUser(Long no) {
		return sqlSession.selectList("task.findTaskUser", no);
	}

	public List<UserVo> getTaskNoneUser(HashMap<String, Long> map) {
		return sqlSession.selectList("task.findTaskNoneUser", map);
	}

	public Boolean insertAssign(HashMap<String, Long> map) {
		return  1 == sqlSession.insert("task.insertAssign", map);
	}

	public Boolean deleteAssign(HashMap<String, Long> map) {
		return 1 == sqlSession.delete("task.deleteAssign", map);
	}

	public Boolean deleteTask(Long no) {
		return 1 == sqlSession.delete("task.deleteTask", no);
	}

	public List<FileVo> getFileList(Long no) {
		return sqlSession.selectList("task.getFileList", no);
	}

	public Boolean insertFile(FileVo vo) {
		return 1 == sqlSession.insert("task.insertFile", vo);
	}
}
