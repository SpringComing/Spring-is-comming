<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title>로그인 페이지</title>
</head>

<body>


	<div class="loginform">
		<h1>login</h1>
		<form action="/login" method="POST">
			<input type="text" name="email" placeholder="Email"> <input
				type="password" name="password" placeholder="Password"> <input
				type="checkbox" name="remember" id="checkbox" class="hidden">
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			<label for="checkbox"> <span class="idsave"> <span
					class="idsave-checked"> <i class="fas fa-check"></i>
				</span>
			</span> <span class="text">아이디 저장</span>
			</label> <input type="submit" value="LOGIN">
		</form>
		<div class="forgot">
			<a href="${pageContext.request.contextPath }/joinForm">회원가입</a> <a href="${pageContext.request.contextPath }/findForm">forgot id / password ?</a>
		</div>
	</div>


</body>
</html>