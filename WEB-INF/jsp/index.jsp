<%@ page import="com.mobilebook.utils.PropertyConfig" %><%--
  Created by IntelliJ IDEA.
  User: zhy
  Date: 2016/12/6
  Time: 11:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String userInfo = request.getSession().getAttribute("user_info").toString();
%>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>test Page</title>
</head>
<body class="error-page">
   <%=userInfo%>
<!--common scripts for all pages-->
<!--<script src="js/scripts.js"></script>-->
<script>
</script>
</body>
</html>
