package com.vobidu.espacolr.dto;


/*DTO para realizar o cadastro de um usuário, essa classe vai herdar
da classe userDTO e vai conter tbm a senha do usuário*/
public class UserInsertDTO extends UserDTO {
	private static final long serialVersionUID = 1L;

	private String password;
	
	UserInsertDTO() {
		super(); //Isso garante que caso tenha alguma logica no construtor vazio da super classe será implementado aqui tbm
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
