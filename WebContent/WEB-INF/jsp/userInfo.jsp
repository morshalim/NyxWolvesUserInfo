<%@page import="com.morshalim.webs.util.JSONSerializer"%>
<%@page import="com.morshalim.webs.bo.UserDetails"%>


<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>User Information</title>

	<link rel="stylesheet" type="text/css" href="lib/ui-libs\bootstrap\assets\css\bootstrap.min.css">
   	<link rel="stylesheet" type="text/css" href="lib/ui-libs\bootstrap\assets\css\jquery-ui.min.css">
	<link rel="stylesheet" href="lib/ui-libs/bootstrap/assets/css/font-awesome.min.css" />
	<link rel="stylesheet" href="lib/ui-libs/bootstrap/assets/css/ace-fonts.css" />
	<link rel="stylesheet" href="lib/ui-libs/bootstrap/assets/css/uncompressed/ace-skins.css" />

	<script type="text/javascript" src="lib/ui-libs/bootstrap/assets/js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="lib/ui-libs\bootstrap\assets\js\bootstrap.min.js"></script>
	<script type="text/javascript" src="lib/ui-libs\bootstrap\assets\js\jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="lib/ui-libs\bootstrap\assets\js\jquery.dataTables.bootstrap.js"></script>
	<script type="text/javascript" src="lib/ui-libs\bootstrap\assets\js\bootbox.min.js"></script>
	<script type="text/javascript" src="lib/ui-libs/bootstrap/assets/js/date-time/bootstrap-datepicker.min.js"></script>
	<script type="text/javascript" src="lib/ui-libs/bootstrap/assets/js/date-time/moment.min.js"></script>
   	<script type="text/javascript" src="js/userInfo.js"></script>

</head>
<% 
	List<UserDetails> list = (List<UserDetails>) request.getAttribute("list");
	

%>
<script>
	 var list = <%=JSONSerializer.serializeToJSON(list)%>;
	 
	 var toDateFormat = "YYYY-MM-DD HH:mm:ss";
	 var defaultDateFormat1 = "MM/DD/YYYY";
	 var localeLang='en';
	 var fullLocale = 'en';

 </script>

<body style="background-color:#ebebe0;">
       <div class="col-xs-12">
           <div id="userTable">
           </div>
       </div>
   </body>

<script>
var userInformation = new userInformation();
userInformation.init();
</script>
</html>
