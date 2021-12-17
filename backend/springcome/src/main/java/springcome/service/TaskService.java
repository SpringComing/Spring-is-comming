package springcome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.TaskRepository;
import springcome.vo.TaskVo;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;

	public Boolean updateTaskStatus(TaskVo vo) {
		return taskRepository.updateTaskStatus(vo);
	} 


}
