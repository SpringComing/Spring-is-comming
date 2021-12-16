package springcome.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.dto.JsonResult;
import springcome.service.ProjectService;
import springcome.vo.ProjectVo;


@RestController

public class CalendarController {
	
	@Autowired
	private ProjectService projectService;
	
	@RequestMapping("/test")
	public JsonResult test() {
		
		List<ProjectVo> list = projectService.findTest();
		
		System.out.println(list);
		
		
		return JsonResult.success(list);
	}

}
