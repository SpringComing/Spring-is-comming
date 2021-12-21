package springcome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.ChecklistRepository;
import springcome.repository.TaskRepository;
import springcome.vo.TaskDiffVo;
import springcome.vo.TaskSameVo;
import springcome.vo.TaskVo;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	@Autowired
	private ChecklistRepository checklistRepository;

	public Boolean updateTaskStatus(Long no) {
		return taskRepository.updateTaskStatus(no);
	}

	public Boolean insert(TaskVo vo) {
		Long maxSeq = taskRepository.findMaxSeqByProcessNo(vo.getProcessNo());
		if(maxSeq == null) {maxSeq=1L;}
		vo.setSequence(maxSeq+1);
		return taskRepository.insert(vo);
	}

	public List<TaskVo> getAllByProcessNo(Long no) {
		List<TaskVo> result = taskRepository.findAllByProcessNo(no);
		for(TaskVo tVo : result) {
			tVo.setChecklists(checklistRepository.findAllByTaskNo(tVo.getNo()));
		}
		
		return result;
	}

	public Boolean updateTaskSeq(TaskSameVo vo) {
		return taskRepository.updateTaskSeq(vo);
	}

	public Boolean updateProcessTaskSeq(TaskDiffVo vo) {
		return taskRepository.updateProcessTaskSeq(vo);
	}

	public Boolean updateTaskAttr(TaskVo vo) {
		return taskRepository.updateTaskAttr(vo);
	}



}
