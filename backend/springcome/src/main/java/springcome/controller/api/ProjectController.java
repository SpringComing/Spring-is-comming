package springcome.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.dto.JsonResult;
import springcome.service.ProjectService;
import springcome.vo.ProjectVo;

/*
 * 클래스: ProjectController
 * 작성자: 성창현
 * 책임: 프로젝트화면 기능
 */
@RestController("ProjectApiController")
@RequestMapping("/api/project")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	
	/*
	 * 함수: getProject
	 * 작성자: 성창현
	 * 기능: 로그인한 유저의 프로젝트 목록 가져오기
	 */
	@GetMapping("/{no}")
	public JsonResult getProject(@PathVariable(value = "no", required = true) Long no) {
		
		List<ProjectVo> projectList = projectService.getAll(no);
		
		//System.out.println("------------------------------projectList : " + projectList);
		
		return JsonResult.success(projectList);
	}
	
	
	@GetMapping("/attr/{no}")
	public JsonResult findByProjectNo(@PathVariable(value = "no", required = true) Long no) {
		//System.out.println("------------------------------projectNo : " + no);
		ProjectVo vo = projectService.findByProjectNo(no);
		//System.out.println("------------------------------projectVo : " + vo);
		return JsonResult.success(vo);
	}
	
}
