package com.morshalim.webs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.morshalim.webs.bo.UserDetails;
import com.morshalim.webs.service.UserDetailsService;
import com.morshalim.webs.util.JSONSerializer;

@Controller
public class UserController {
	@Autowired
	private UserDetailsService userDetailsService;
	
	
	
	/*@RequestMapping(value="/addEmployee.htm", method = RequestMethod.POST)
	public @ResponseBody String addEmployee(@RequestBody EmployeeDetails employeeDetails){
		int result = employeeDetailsService.addEmployee(employeeDetails);
		System.out.println("Inserted Employee : "+result);
		
		List<EmployeeDetails> employeeList = employeeDetailsService.getEmployeeData();
		
		return JSONSerializer.serializeToFormatedJSON(employeeList);
	}
	
	
	@RequestMapping(value="/updateEmployee.htm", method = RequestMethod.POST)
	public @ResponseBody String updateEmployee(@RequestBody EmployeeDetails employeeDetails){
		int res=employeeDetailsService.updateEmployee(employeeDetails);
		List<EmployeeDetails> employeeList = employeeDetailsService.getEmployeeData();
		return JSONSerializer.serializeToFormatedJSON(employeeList);
	}
	
	@RequestMapping("/deleteEmployee.htm")
	public @ResponseBody String deleteStudent(@RequestParam String empId){
		int res=employeeDetailsService.deleteEmployee(empId);
		List<EmployeeDetails> list = employeeDetailsService.getEmployeeData();
		return JSONSerializer.serializeToFormatedJSON(list);
	}
	*/
	@RequestMapping("/index.htm")
	public ModelAndView showUser(){
		ModelAndView mav= new ModelAndView();
		List<UserDetails> list = userDetailsService.getUserData();
		mav.addObject("list",list);
		mav.setViewName("userInfo");
		
		return mav;
	}
	
	@RequestMapping(value="/addUserInfo.htm", method = RequestMethod.POST)
	public @ResponseBody String addUserInfo(@RequestBody UserDetails userDetails){
		int result = userDetailsService.addUser(userDetails);
		List<UserDetails> userList = userDetailsService.getUserData();
		return JSONSerializer.serializeToFormatedJSON(userList);
	}
	
	@RequestMapping(value="/updateUserInfo.htm", method = RequestMethod.POST)
	public @ResponseBody String updateUserInfo(@RequestBody UserDetails userDetails){
		int res=userDetailsService.updateUser(userDetails);
		List<UserDetails> userList = userDetailsService.getUserData();
		return JSONSerializer.serializeToFormatedJSON(userList);
	}
	
	@RequestMapping("/deleteUser.htm")
	public @ResponseBody String deleteUser(@RequestParam Integer userId){
		int res=userDetailsService.deleteUser(userId);
		List<UserDetails> userList = userDetailsService.getUserData();
		return JSONSerializer.serializeToFormatedJSON(userList);
	}
	
}
