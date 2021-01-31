package com.vobidu.espacolr.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vobidu.espacolr.entities.Scheduled;

@Repository
public interface ScheduledRepository extends JpaRepository<Scheduled, Long>{
	
	//List<Scheduled> findByDate(LocalDate date);
	
	Scheduled findByDate(LocalDate date);	
}
