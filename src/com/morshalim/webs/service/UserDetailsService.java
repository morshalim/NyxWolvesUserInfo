package com.morshalim.webs.service;

import java.util.List;

import com.morshalim.webs.bo.UserDetails;

public interface UserDetailsService {
	
	public List<UserDetails> getUserData();
	public int addUser(UserDetails userDetails);
	public int deleteUser(Integer userId);
	public int updateUser(UserDetails userDetails);

	

}
