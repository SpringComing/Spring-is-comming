package springcome.controller.api;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.auth.PrincipalDetails;
import springcome.dto.JsonResult;
import springcome.service.UserService;
import springcome.vo.UserVo;

@RestController
public class SettingController {
	
	@Autowired
	private UserService userservice;

	@RequestMapping("/api/profile")
	public JsonResult profile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		
		if(principalDetails != null) {
			UserVo vo = userservice.findAll(principalDetails.getNo());
			return JsonResult.success(vo);
			
		}else {
			return JsonResult.fail("fail");
		}
	}
	
	@RequestMapping("/api/changeProfile")
	public JsonResult changeProfile(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody String args) {
		
		
		
		
		if(principalDetails != null) {
			
			try {
				JSONParser jsonParse = new JSONParser();
				JSONObject jsonObj = (JSONObject) jsonParse.parse(args);

				String name = jsonObj.get("name").toString();
				String birth = jsonObj.get("birth").toString();
				String profile ="";
				if(jsonObj.get("profile") != null) {
				profile = jsonObj.get("profile").toString();
				}
				userservice.updateProfile(name, birth, principalDetails.getNo(),profile);
				return JsonResult.success(null);		
			}catch(Exception e) {
				e.printStackTrace();
				return JsonResult.fail("fail");
			}
	
		}else {
			return JsonResult.fail("fail");
		}
	}
	
}
