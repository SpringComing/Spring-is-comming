package springcome.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springcome.dto.JsonResult;
import springcome.service.TaskService;
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
	
	
    
    
    

}
