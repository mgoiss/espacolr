package com.vobidu.espacolr.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class FreeDateDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private List<LocalDate> freeDate = new ArrayList<>();

	public FreeDateDTO() {

	}
	
	public FreeDateDTO(Set<LocalDate> freeDate) {
		freeDate.forEach(free -> this.freeDate.add(free));
	}

	public List<LocalDate> getFreeTime() {
		return freeDate;
	}
	
	public void addDate(LocalDate date) {
		freeDate.add(date);
	}
}
