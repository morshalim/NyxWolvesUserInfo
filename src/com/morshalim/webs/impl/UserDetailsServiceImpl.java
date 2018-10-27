package com.morshalim.webs.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.morshalim.webs.bo.UserDetails;
import com.morshalim.webs.mybatis.UserMapper;
import com.morshalim.webs.service.UserDetailsService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	UserMapper userMapper;

	@Override
	public List<UserDetails> getUserData() {
		return userMapper.getUserData();
	}

	@Override
	public int addUser(UserDetails userDetails) {
		return userMapper.addUser(userDetails);
	}

	@Override
	public int deleteUser(Integer userId) {
		return userMapper.deleteUser(userId);
	}

	@Override
	public int updateUser(UserDetails userDetails) {
		return userMapper.updateUser(userDetails);
	}
	
	/*@Override
	public List<EmployeeDetails> getEmployeeData() {
		
		return employeeMapper.getEmployeeData();
	}

	@Override
	public int addEmployee(EmployeeDetails employeeDetails) {
		
		String screenId = "employee_details";
		String id = getSequenceDetails(screenId);
		employeeDetails.setEmployeeId(id);
		
		return employeeMapper.addEmployee(employeeDetails);
	}

	@Override
	public int deleteEmployee(String empId) {
		
		return employeeMapper.deleteEmployee(empId);
	}

	@Override
	public int updateEmployee(EmployeeDetails employeeDetails) {
		
		return employeeMapper.updateEmployee(employeeDetails);
	}

	@Override
	public List<EmployeeStatus> getEmployeeStatusData() {

		return employeeMapper.getEmployeeStatusData();
	}

	@Override
	public List<TaxCategory> getTaxCategoryData() {

		return employeeMapper.getTaxCategoryData();
	}

	public String getSequenceDetails(String screenId) {
		SequenceDetails sequenceDetails = employeeMapper.getSequenceDetails(screenId);
		
		String prefix = sequenceDetails.getPrefix();
		Integer currVal = sequenceDetails.getCurrentValue();
		currVal=currVal+1;
		
		String id = prefix+currVal.toString();
		sequenceDetails.setPrefix(prefix);
		sequenceDetails.setCurrentValue(currVal);
		sequenceDetails.setSequenceScreen(screenId);
		boolean result = employeeMapper.updateSequenceDetails(sequenceDetails);
		System.out.println("Updation:"+result);
		
		return id;
	}
*/
	

}
