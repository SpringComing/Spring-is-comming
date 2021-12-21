package springcome.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springcome.repository.CalendarRepository;
import springcome.vo.MemoVo;
import springcome.vo.ProjectVo;
import springcome.vo.TaskToProjectVo;
@Service
public class CalendarService {

	@Autowired
	private CalendarRepository calendarRepository;
	
	public List<ProjectVo> FindProject(String userno){
		return calendarRepository.FindProject(userno);
	}
	
	public int insertMemo(String no, String title, String date, String n) {
		return calendarRepository.insertMemo(no, title, date,n);
	}
	
	public List<MemoVo> findMemo(String userno){
		return calendarRepository.findMemo(userno);
	}
	
	public int deleteMemo(String title, String date, String userno, String no) {
		return calendarRepository.deleteMemo(title, date, userno,no);
	}
	
	public List<TaskToProjectVo> findTask(String userno){
		return calendarRepository.findTask(userno);
	}
	
	public int updateMemo(String title, String date, String userno, String no) {
		return calendarRepository.updateMemo(title, date, userno, no);
	}
	
	public String maxNo() {
		return calendarRepository.maxNo();
	}
	
	
}
