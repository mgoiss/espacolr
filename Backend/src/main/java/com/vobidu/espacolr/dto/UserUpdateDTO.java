package com.vobidu.espacolr.dto;

import com.vobidu.espacolr.services.validation.UserUpdateValid;

/*DTO para realizar o cadastro de um usuário, essa classe vai herdar
da classe userDTO e vai conter tbm a senha do usuário*/
@UserUpdateValid
public class UserUpdateDTO extends UserDTO {
	private static final long serialVersionUID = 1L;
	
}
