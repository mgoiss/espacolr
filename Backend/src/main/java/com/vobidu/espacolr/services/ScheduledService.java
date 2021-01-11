package com.vobidu.espacolr.services;

import java.time.LocalDate;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vobidu.espacolr.dto.FreeDateDTO;
import com.vobidu.espacolr.dto.ScheduledDTO;
import com.vobidu.espacolr.entities.Client;
import com.vobidu.espacolr.entities.Scheduled;
import com.vobidu.espacolr.repositories.ScheduledRepository;
import com.vobidu.espacolr.services.exceptions.DatabaseException;
import com.vobidu.espacolr.services.exceptions.ResourceNotFoundException;
import com.vobidu.espacolr.repositories.ClientRepository;

@Service
public class ScheduledService {
	
	@Autowired
	private ScheduledRepository repository;
	
	@Autowired
	private ClientRepository clientRepository;
	
	@Transactional(readOnly = true)
	public Page<ScheduledDTO> findAllPaged(PageRequest pageRequest) {
		Page<Scheduled> list = repository.findAll(pageRequest);				
		
		return list.map(x -> new ScheduledDTO(x, x.getClient()));
	}
	
	@Transactional
	public ScheduledDTO findById(Long id) {
		Optional<Scheduled> obj = repository.findById(id);
		Scheduled entity = obj.orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));
		return new ScheduledDTO(entity, entity.getClient());
	}
	
	@Transactional
	public ScheduledDTO insert(ScheduledDTO dto) {
		Scheduled entity = new Scheduled();
		
		copyDtoToEntity(dto, entity);
		
		entity = repository.save(entity);
		return new ScheduledDTO(entity, entity.getClient());
	}
	
	@Transactional
	public ScheduledDTO update(Long id, ScheduledDTO dto) {
		try {
			Scheduled entity = repository.getOne(id);
			
			copyDtoToEntity(dto, entity);
			
			entity = repository.save(entity);
			return new ScheduledDTO(entity, entity.getClient());
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id não encontrado " + id);
		}
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id não encontrado" + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de Integridade");
		}
	}
	
	private void copyDtoToEntity(ScheduledDTO dto, Scheduled entity) {
		entity.setDate(dto.getDate());
		entity.setPrice(dto.getPrice());
		entity.setStatus(dto.getStatus());
		
		//Pegando o Client no Banco
		Client client = clientRepository.getOne(dto.getClient().getId());
		entity.setClient(client);
	}

	public FreeDateDTO findFreeDate(int year, int month) {
		
		FreeDateDTO freeDate = new FreeDateDTO();
		LocalDate date = LocalDate.of(year, month, 1);
		int count = date.lengthOfMonth();
		
		for (int i = 1; i <= count; i++) {
			
			date = date.withDayOfMonth(i); //Passando para o proximo dia
			
			if (repository.findByDate(date).isEmpty()) {			
				freeDate.addDate(date);		//Adicionando a data disponivel		
			}			
		}
		
		return freeDate;
	}
}
