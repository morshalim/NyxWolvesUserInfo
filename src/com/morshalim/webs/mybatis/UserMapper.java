package com.morshalim.webs.mybatis;

import java.util.List;

import com.morshalim.webs.bo.UserDetails;

public interface UserMapper {
	
	public List<UserDetails> getUserData();
	public int addUser(UserDetails userDetails);
	public int deleteUser(Integer userId);
	public int updateUser(UserDetails userDetails);
	
	
}
