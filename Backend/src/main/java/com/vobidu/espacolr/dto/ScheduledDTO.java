package com.vobidu.espacolr.dto;

import java.time.LocalDate;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Positive;

import com.vobidu.espacolr.entities.Client;
import com.vobidu.espacolr.entities.Scheduled;
import com.vobidu.espacolr.services.validation.ScheduledValid;

@ScheduledValid
public class ScheduledDTO {
	
	private Long id;
	
	@FutureOrPresent(message = "A data de agendamento deve ser o dia atual ou futuro")
	private LocalDate date;
	
	@Positive(message = "O preço deve ser um valor positivo")
	private Double price;
	@Positive(message = "O valor pago deve ser um valor positivo")
	private Double valuePaid;
	private String status;
	
	private ClientDTO client;

	public ScheduledDTO() {
		
	}

	public ScheduledDTO(Long id, LocalDate date, Double price, Double valuePaid, String status) {
		this.id = id;
		this.date = date;
		this.price = price;
		this.valuePaid = valuePaid;
		this.status = status;
	}
	
	public ScheduledDTO(Scheduled scheduled) {
		id = scheduled.getId();
		date = scheduled.getDate();
		price = scheduled.getPrice();
		valuePaid = scheduled.getValuePaid();
		status = scheduled.getStatus();
	}
	
	public ScheduledDTO(Scheduled scheduled, Client client) {
		this(scheduled);
		this.client = new ClientDTO(client);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getValuePaid() {
		return valuePaid;
	}

	public void setValuePaid(Double valuePaid) {
		this.valuePaid = valuePaid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ClientDTO getClient() {
		return client;
	}

	public void setClient(ClientDTO client) {
		this.client = client;
	}
}
