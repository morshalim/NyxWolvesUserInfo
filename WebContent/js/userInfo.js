
var userInformation = function(){
	var self=this;
	var errorvalue=false;
	var errorList="";
	var userListIndex=0;
	var taxCategoryId=0;
	var employeeStatusIndex=0;

	this.init=function(){
		this.render();
	}

	this.renderPopUp=function(element,addAction){

		var label = '';
		var title = '';
		var url = '';
		if(addAction){
			label = "Save";
			title = "Add UserInfo";
			url = "addUserInfo.htm";
		}
		else{
			label = "Update";
			title = "Update UserInfo";
			url = "updateUserInfo.htm";
		}

		bootbox.dialog({
			title: title,
			message: self.renderPopUpContent(element,addAction),
			buttons: {
				ok: {
					label: label,
					className: 'btn-success',
					callback:function(){
						if(self.validate(event)){
							var type="POST";
							var data=self.getDataFromForm();
							$.ajax({
								url: url,
								headers: {
									'Accept'		: 'application/json',
									'Content-Type'	: 'application/json'
								},
								type: type,
								dataType: "json",
								data: JSON.stringify(data),
								success: function(result){
									list=result;
									self.render();
								}
							});

						}
						else{
							return false;
						}

					}
				},

				cancel: {
					label: "Cancel",
					className: 'btn-danger',

				},

			}
		});

		$('.date-picker').datepicker({
			format : 'mm/dd/yyyy',
			autoclose : true,
			todayHighlight : true


		});
		$('.validateNumeric').keypress(function (){
			self.validateNumeric(event);
		});
	}


	this.renderDeletePopup = function(elem){
		var userId=$(elem).attr("userId");
		bootbox.dialog({
			title: 'Delete User',
			message: self.renderPopUpContentDelete(elem),
			buttons: {
				ok: {
					label: "Delete",
					className: 'btn-danger',
					callback:function(){
						var type="GET";
						var url="deleteUser.htm?userId="+userId;
						$.ajax({
							url: url,
							headers: {
								'Accept'		: 'application/json',
								'Content-Type'	: 'application/json'
							},
							type: type,
							dataType: "json",
							success: function(result){
								list=result;
								self.render();
							}
						});
					}
				},

				cancel: {
					label: "Cancel",
					className: 'btn-warning',

				},

			}
		});

	}


	this.validateNumeric=function(event){
		var keyCheck=event.keyCode;
		var isNumber=true;
		if(keyCheck>=48 && keyCheck<=57){
			isNumber=false;
		}
		if(isNumber){
			event.preventDefault();
			return true;
		}
		else
			return false;
	}

	this.validate = function(){
		var hasError=false;
		var errorList="";

		if($('#firstName').val()==""){
			hasError=true;
			errorList=errorList+"<br>First Name<br>"
		}
		if($('#lastName').val()==""){
			hasError=true;
			errorList=errorList+"Last Name<br>"
		}

		if($('input[name="gender"]:checked').val()==undefined){
			hasError=true;
			errorList=errorList+"Gender<br>"
		}
		
		var mobNum=$('#mobileNo').val();
		if(mobNum == ""){
			hasError=true;
			errorList=errorList+"Mobile No<br>"
		}
		if (mobNum.length!=10 && mobNum != "")
		{
			hasError=true;
			errorList=errorList+"Please Enter Valid Mobile Number";

		}

		var email=$('#email').val();
		var index1=email.indexOf("@");
		var index2=email.indexOf(".");
		if(email == ""){
			hasError=true;
			errorList=errorList+"Email<br>"
		}
		else if(email.length < 10 || ((index2-index1)<=3 &&(index2-index1) > 0 && email != "")){
			hasError=true;
			bootbox.alert("Please Enter Valid Email!");
		}
		
		if($('#address').val()==""){
			hasError=true;
			errorList=errorList+"Address<br>"
		}
		

		if(hasError){
			bootbox.alert("<b  style='color:red;'><font size='6'>Please Enter the following fields</font></b><center><font size='4'>"+errorList+"</font></center>");
			return false;
		}
		else{
			return true;

		}


	}

	this.renderPopUpContentDelete=function(elem){
		var arr=[];

		arr.push('<h3 style="color:blue;">Are you sure want to Delete all info of <font style="color:green;">'+$(elem).attr("firstName")+'</font>?</h3>');
		arr.push('<h3 style="color:red;">This can&apos;t be undone</h3>')
		return arr.join('');
	}


	this.getDataFromForm = function(){
		var data={};
		data['userId'] = $('#userId').val();
		data['firstName'] = $('#firstName').val();
		data['lastName'] = $('#lastName').val();
		data['gender'] = $('input[name="gender"]:checked').val();
		data['mobileNo'] = $('#mobileNo').val();
		data['email'] = $('#email').val();
		data['address'] = $('#address').val();

		return data;
	}

	this.renderPopUpContent=function(elem,addAction){
		var arr=[];

		arr.push('<div class="form-horizontal" id="updateStatus_dlg">');
		if(addAction == false){
			arr.push('    <div class="form-group">');
			arr.push('        <label class="col-sm-4 control-label no-padding-right">UserId</label>');
			arr.push('        <div class="col-sm-5">');
			arr.push('            <input type="text" class="form-control" id="userId" value="'+$(elem).attr("userId")+'" readonly/>');
			arr.push('        </div>');
			arr.push('    </div>');
		}


		arr.push('    <div class="form-group">');
		arr.push('        <label class="col-sm-4 control-label no-padding-right">First Name</label>');
		arr.push('        <div class="col-sm-5">');
		arr.push('            <input type="text" class="form-control" id="firstName" value="'+(addAction == false ? $(elem).attr("firstName") : "")+'" placeholder="'+(addAction == true ? "First Name" : "")+'"/>');
		arr.push('        </div>');
		arr.push('    </div>');

		arr.push('    <div class="form-group">');
		arr.push('        <label class="col-sm-4 control-label no-padding-right">Last Name</label>');
		arr.push('        <div class="col-sm-5">');
		arr.push('            <input type="text" class="form-control" id="lastName" value="'+(addAction == false ? $(elem).attr("lastName") : "")+'" placeholder="'+(addAction == true ? "Last Name" : "")+'"/>');
		arr.push('        </div>');
		arr.push('    </div>');

		arr.push('    <div class="form-group">');
		arr.push('        <label class="col-sm-4 control-label no-padding-right">Gender</label>');
		arr.push('        <div class="col-sm-5">');
		arr.push('            <td><input type="radio" name="gender" value="Male" '+((addAction == false)&&  ($(elem).attr("gender")=="Male")  ? "checked" : "")+'/>Male');
		arr.push('                <input type="radio" name="gender" value="Female" '+((addAction == false)&& ($(elem).attr("gender")=="Female")  ? "checked" : "")+'/>Female</td>');
		arr.push('        </div>');
		arr.push('    </div>');
		
		arr.push('    <div class="form-group">');
		arr.push('        <label class="col-sm-4 control-label no-padding-right">Mobile</label>');
		arr.push('        <div class="col-sm-5">');
		arr.push('            <input type="text" id="mobileNo" maxlength = "10" class="form-control validateNumeric"  value="'+(addAction == false ? $(elem).attr("mobileNo") : "")+'" placeholder="'+(addAction == true ? "Enter mobile number" : "")+'"/>');
		arr.push('        </div>');
		arr.push('    </div>');
		
		arr.push('    <div class="form-group">');
		arr.push('        <label class="col-sm-4 control-label no-padding-right">Email</label>');
		arr.push('        <div class="col-sm-5">');
		arr.push('            <input type="text" name="email" class="form-control" id="email" value="'+(addAction == false ? $(elem).attr("email") : "")+'" placeholder="'+(addAction == true ? "Enter email id" : "")+'"/>');
		arr.push('        </div>');
		arr.push('    </div>');

		arr.push('    <div class="form-group">');
		arr.push('        <label class="col-sm-4 control-label no-padding-right">Address</label>');
		arr.push('        <div class="col-sm-5">');
		arr.push('            <input type="text" name="address" class="form-control" id="address" value="'+(addAction == false ? $(elem).attr("address") : "")+'" placeholder="'+(addAction == true ? "Address" : "")+'"/>');
		arr.push('        </div>');
		arr.push('    </div>');
		arr.push('</div>');
		return arr.join('');



	}


	this.render=function(){

		var arr=[];
		arr.push('<div>&nbsp;</div>');
		arr.push('<table id="test" class="table table-striped table-bordered table-hover" border="1" cellspacing="0">');
		arr.push('<center><button id="add" class="btn btn-success">Add User</button>&nbsp;&nbsp;&nbsp;&nbsp;');
		arr.push('<thead>');
		arr.push('    <tr>');
		arr.push('        <th>First Name</th>');
		arr.push('        <th>Last Name</th>');
		arr.push('        <th>Gender</th>');
		arr.push('        <th>Mobile No</th>');
		arr.push('        <th>Email</th>');
		arr.push('        <th>Address</th>');
		arr.push('        <th>Options</th>');
		arr.push('	   </tr>');
		arr.push('</thead>');
		arr.push('<tbody>');
		for (userListIndex = 0; userListIndex < list.length; userListIndex++) {
			arr.push('    <tr>');
			arr.push('        <td>'+list[userListIndex].firstName+'</td>');
			arr.push('        <td>'+list[userListIndex].lastName+'</td>');
			arr.push('        <td>'+list[userListIndex].gender+'</td>');
			arr.push('        <td>'+list[userListIndex].mobileNo+'</td>');
			arr.push('        <td>'+list[userListIndex].email+'</td>');
			arr.push('        <td>'+list[userListIndex].address+'</td>');
		
			arr.push('		  <td><button firstName="'+list[userListIndex].firstName+'"');
			arr.push('			          lastName="'+list[userListIndex].lastName+'"');	
			arr.push('			          gender="'+list[userListIndex].gender+'"');
			arr.push('			          mobileNo="'+list[userListIndex].mobileNo+'"');
			arr.push('			          email="'+list[userListIndex].email+'"');
			arr.push('			          address="'+list[userListIndex].address+'"');
			arr.push('			          userId="'+list[userListIndex].userId+'"');
			arr.push('			     class="fa fa-pencil edit"></button>&nbsp;&nbsp;');
			arr.push('			  <button userId="'+list[userListIndex].userId+'" firstName="'+list[userListIndex].firstName+'" class="fa fa-trash-o delete"></button></td>');
			arr.push('    </tr>');
		}
		arr.push('</tbody>');
		arr.push('</table');
		$('#userTable').html(arr.join(''));

		var table = $('#test').dataTable({
			"order": [[1, "desc" ]]
		});
		$('#add').click(function(){
			self.renderPopUp(this,true);
		});

		$('.delete').click(function(){
			self.renderDeletePopup(this);
		});

		$('.edit').click(function(){
			self.renderPopUp(this,false);
		});

		
	}

}
