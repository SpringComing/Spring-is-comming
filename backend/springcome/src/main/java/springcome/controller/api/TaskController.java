package springcome.controller.api;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import springcome.dto.JsonResult;
import springcome.service.FileUploadService;
import springcome.service.TaskService;
import springcome.vo.FileVo;
import springcome.vo.TaskDiffVo;
import springcome.vo.TaskSameVo;
/*
 * 클래스: ChecklistController
 * 작성자: 전지은
 * 책임: 칸반화면 기능
 */
import springcome.vo.TaskVo;
@RestController("TaskApiController")
@RequestMapping("/api/task")
public class TaskController {
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private FileUploadService fileService;
	/*
	/*
	 * 함수: delete
	 * 작성자: 전지은
	 * 기능: 선택한 no에 맞는 checklist삭제하기
	 
	@RequestMapping(value="/{checklistNo}", method=RequestMethod.GET)
	public JsonResult delete(@PathVariable(value="checklistNo", required = true) Long no) {
		//System.out.println(no);
		return JsonResult.success(checklistService.deleteByChecklistNo(no));
	}
	
	*/
	
	/* 함수: insert
	 * 작성자: 전지은
	 * 기능: checklist 추가
	*/ 
	@PostMapping("")
	public JsonResult insert(@RequestBody TaskVo vo) {
		taskService.insert(vo);
		return JsonResult.success(taskService.getAllByProcessNo(vo.getProcessNo()));
	}
	
	@PutMapping("/{taskNo}")
	public JsonResult update(@PathVariable(value="taskNo", required = true) Long no) {
		//System.out.println(no);
		return JsonResult.success(taskService.updateTaskStatus(no));
	}
	

	@DeleteMapping("/{taskNo}")
	public JsonResult delete(@PathVariable(value="taskNo", required = true) Long no) {
		return JsonResult.success(taskService.deleteTask(no));
	}
	
	@PutMapping("/attr")
	public JsonResult updateTaskAttr(
			@RequestBody TaskVo vo) {
		//System.out.println(vo);
		return JsonResult.success(taskService.updateTaskAttr(vo));
	}
	
	@PutMapping("/same")
	public JsonResult updateTaskSeq(
			@RequestBody TaskSameVo vo) {
		//System.out.println(vo);
		return JsonResult.success(taskService.updateTaskSeq(vo));
	}
	
	@PutMapping("/diff")
	public JsonResult updateProcessTaskSeq(
			@RequestBody TaskDiffVo vo) {
		//System.out.println(vo);
		return JsonResult.success(taskService.updateProcessTaskSeq(vo));
		
	}
	
	@GetMapping("/file/{taskNo}")
	public JsonResult getFileList(@PathVariable(value="taskNo", required = true) Long no) {
		System.out.println("taskNo:"+no);
		System.out.println("여기");
		List<FileVo> vo = taskService.getFileList(no);
		System.out.println(vo);
		for(FileVo f : vo) {System.out.println("vo라라라라라:"+ f);} 
		return JsonResult.success(taskService.getFileList(no));
	}
	
	@PostMapping("/file")
	public JsonResult insertFile(
			MultipartHttpServletRequest request,
			@RequestParam(value="userNo", required = true) Long userNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) throws Exception {
		
		MultipartFile file = request.getFile("file");
		FileVo vo = new FileVo();
		vo.setUserNo(userNo);
		vo.setTaskNo(taskNo);
		fileService.restoreImage(file, vo);
		
		System.out.println(vo);
		
		return JsonResult.success(taskService.insertFile(vo));
	}
	
	
	@GetMapping("/taskUser/{taskNo}")
	public JsonResult getTaskUser(@PathVariable(value="taskNo", required = true) Long no) {
		return JsonResult.success(taskService.getTaskUser(no));
	}
	
	@GetMapping("/taskNoneUser")
	public JsonResult getTaskNoneUser(
			@RequestParam(value="projectNo", required = true) Long projectNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) {
		HashMap<String, Long> map = new HashMap<String, Long>();
		map.put("projectNo", projectNo);
		map.put("taskNo", taskNo);
		return JsonResult.success(taskService.getTaskNoneUser(map));
	}
	
	@PostMapping("/assign")
	public JsonResult insertAssign(
			@RequestParam(value="userNo", required = true) Long userNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) {
		System.out.println(userNo);
		System.out.println(taskNo);
		HashMap<String, Long> map = new HashMap<String, Long>();
		map.put("userNo", userNo);
		map.put("taskNo", taskNo);
		return JsonResult.success(taskService.insertAssign(map));
	}
	
	@DeleteMapping("/assign")
	public JsonResult deleteAssign(
			@RequestParam(value="userNo", required = true) Long userNo,
			@RequestParam(value="taskNo", required = true) Long taskNo) {
		HashMap<String, Long> map = new HashMap<String, Long>();
		map.put("userNo", userNo);
		map.put("taskNo", taskNo);
		return JsonResult.success(taskService.deleteAssign(map));
	}
    
    

}
