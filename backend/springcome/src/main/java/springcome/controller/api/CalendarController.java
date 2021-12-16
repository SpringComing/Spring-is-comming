package springcome.controller.api;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.auth.PrincipalDetails;
import springcome.dto.JsonResult;
import springcome.service.ProjectService;
import springcome.vo.ProjectVo;

@RestController
public class CalendarController {

	@Autowired
	private ProjectService projectService;

	@RequestMapping("/api/schedule")
	public Object api(@AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletRequest request) {

		Cookie[] cookies = request.getCookies();	
		String checkCookie = null;
		
		if(cookies != null) {
			for(Cookie c : cookies) {
				if(c.getName().equals("useremail")) {
					checkCookie = c.getValue();
				}
			}
		}

		List<ProjectVo> list = projectService.findTest();
		
		
		if(principalDetails != null && checkCookie != null) {
			return JsonResult.success(list);
		}
		

		return JsonResult.fail("실패");

	}

}
