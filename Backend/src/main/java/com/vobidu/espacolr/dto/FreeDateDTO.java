package com.vobidu.espacolr.dto;

import java.io.Serializable;
import java.time.LocalDate;

public class FreeDateDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private LocalDate freeDate;
	private int freeDay;

	public FreeDateDTO() {

	}
	
	public FreeDateDTO(LocalDate freeDate) {
		this.freeDate = freeDate;
		this.freeDay = freeDate.getDayOfMonth();
	}

	public LocalDate getFreeTime() {
		return freeDate;
	}
	
	public int getFreeDay() {
		return freeDay;
	}
	
	/*public void addDate(LocalDate date) {
		freeDate.add(date);
	}*/
}
