var timer;

function msg_time() {   // 1초씩 카운트      
	m = Math.floor(timer / 60) + "분 " + (timer % 60) + "초"; // 남은 시간 계산     
	$("#authTime").text(m);
	timer--;                  // 1초씩 감소
	if (timer == 110) {          // 시간이 종료 되었으면..        
		$("#authTime").text('인증시간 초과');
		clearInterval(tid);

	}
}

function stopTimer() {
	$("#authTime").text('');
	$("#authErrMsg").text('');
	$("#AUTH_NO").val('');
	clearInterval(tid);
}

function TimerStart() {
	timer = 180;
	tid = setInterval('msg_time()', 1000);
};

function authTel(){
	var input = $("#AUTH_NO").val();
	var cookie = getCookie('telauth');
	
	var sendData = {
		"input" : input,
		"cookie" : cookie
	}
	
	$.ajax({
		method: 'POST',
		url: '/user/auth',
		data: sendData,
		success: function(resp) {
			if (resp.result == 'success') {
				
				
			} else if (resp.result == 'fail') {
				
			} else {
				$("#checkUser").text('서버 상태를 확인하세요');
			}
		},
		error: function() {
			$("#checkUser").text('서버 상태를 확인하세요');
		}
	})
	
}


function findId(){
	var name = $("#name").val();
	var tel = $("#tel").val();
	
	var sendData = {
		"name" : name,
		"tel" : tel
	}
	
	$.ajax({
		method: 'POST',
		url: '/user/find',
		data: sendData,
		success: function(resp) {
			if (resp.result == 'success') {
				
				$("#checkUser").text('');
				timer = 180;
				TimerStart(); 
				$("#inputtel").text(tel);
				$('#authLayerTemp').show();
				setCookie('telauth', resp.rand, 1);

			} else if (resp.result == 'fail') {
				$("#checkUser").text('일치하는 정보가 없습니다');
			} else {
				$("#checkUser").text('서버 상태를 확인하세요');
			}
		},
		error: function() {
			$("#checkUser").text('서버 상태를 확인하세요');
		}
	})
	
}

function setCookie(cookie_name, value, miuntes) {
	const exdate = new Date();
	exdate.setMinutes(exdate.getMinutes() + miuntes);
	const cookie_value = escape(value) + ((miuntes == null) ? '' : '; expires=' + exdate.toUTCString());
	document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
	var x, y;
	var val = document.cookie.split(';');

	for (var i = 0; i < val.length; i++) {
		x = val[i].substr(0, val[i].indexOf('='));
		y = val[i].substr(val[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
		if (x == cookie_name) {
			return unescape(y); // unescape로 디코딩 후 값 리턴
		}
	}
}