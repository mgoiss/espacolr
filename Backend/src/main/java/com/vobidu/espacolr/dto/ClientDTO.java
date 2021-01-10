package com.vobidu.espacolr.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.vobidu.espacolr.entities.Client;

public class ClientDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo Obrigatório")
	private String name;
	
	@NotBlank(message = "Campo Obrigatório")
	private String phone;
	
	public ClientDTO() {

	}

	public ClientDTO(Long id, String name, String phone) {
		this.id = id;
		this.name = name;
		this.phone = phone;
	}
	
	public ClientDTO(Client client) {
		id = client.getId();
		name = client.getName();
		phone = client.getPhone();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
