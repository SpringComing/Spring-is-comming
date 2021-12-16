package springcome.controller.api;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.dto.JsonResult;
import springcome.service.ProjectService;
import springcome.vo.ProjectVo;

/*
 * 클래스: ProjectController
 * 작성자: 성창현
 * 책임: 프로젝트화면 컨트롤러
 */
@RestController("ProjectApiController")
@RequestMapping("/api/project")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	
	/*
	 * 함수: getProject
	 * 작성자: 성창현
	 * 기능: 로그인한 유저({userNo})의 프로젝트 목록 가져오기
	 */
	@GetMapping("/{userNo}")
	public JsonResult getProject(@PathVariable(value = "userNo", required = true) Long userNo) {
		
		List<ProjectVo> projectList = projectService.getAll(userNo);
		
		//System.out.println("------------------------------projectList : " + projectList);
		
		return JsonResult.success(projectList);
	}
	
	/*
	 * 함수: addProject
	 * 작성자: 성창현
	 * 기능: 로그인 유저({userNo}) 새 프로젝트 디비에 insert
	 */
	@PostMapping("/{userNo}")
	public JsonResult addProject(@PathVariable(value = "userNo", required = true) Long userNo,
								 @RequestBody ProjectVo projectVo) {
		boolean result = false;
		System.out.println("insert start");
		//System.out.println("-------------------------------------------------projectVo"+ projectVo);
		
		result = projectService.addProject(userNo, projectVo);
		
		return JsonResult.success(result);
	}
	
	/*
	 * 함수: upDateBasicProject
	 * 작성자: 성창현
	 * 기능: 프로젝트 기본내용 업데이트 
	 */
	@PutMapping("/{userNo}")
	public JsonResult updateBasicProject(@PathVariable(value = "userNo", required = true) Long userNo,
								 	@RequestBody ProjectVo projectVo) {
		boolean result = false;
		System.out.println("-------------------------------------------------update projectVo"+ projectVo);
		
		result = projectService.updateBasicProject( projectVo);
		
		return JsonResult.success(result);
	}
	
}
