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

	public boolean addProject(Long userNo, ProjectVo projectVo) {
		
		if(projectRepository.insertProject(projectVo) == false) {
			System.out.println("-------------------------------------------------insertProject failed");
			return false;
		}
		
		System.out.println("----------------------------------------------------projectVo : " + projectVo);
		
		
		Long lastSequence = projectRepository.findLastSequence(userNo);
		
		if(projectRepository.insertAttend(userNo, projectVo.getNo(), lastSequence + 1) == false) {
			System.out.println("-------------------------------------------------insertAttend failed");
			return false;
		}
		
		return true;
	}

}
