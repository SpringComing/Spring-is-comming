package springcome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.ProjectRepository;
import springcome.vo.ProjectVo;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository; 
	
	public List<ProjectVo> getAll(Long no) {
		return projectRepository.findAll(no);
	}

}
