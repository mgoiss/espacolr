package com.vobidu.espacolr.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vobidu.espacolr.dto.ClientDTO;
import com.vobidu.espacolr.entities.Client;
import com.vobidu.espacolr.repositories.ClientRepository;
import com.vobidu.espacolr.services.exceptions.DatabaseException;
import com.vobidu.espacolr.services.exceptions.ResourceNotFoundException;

@Service
public class ClientService {
	
	@Autowired
	private ClientRepository repository;
	
	@Transactional(readOnly = true)
	public Page<ClientDTO> findAllPaged(String name, PageRequest pageRequest) {
		Page<Client> list = repository.findAllFilter(name, pageRequest);				
		
		return list.map(x -> new ClientDTO(x));
	}
	
	@Transactional
	public ClientDTO findById(Long id) {
		Optional<Client> obj = repository.findById(id);
		Client entity = obj.orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));
		return new ClientDTO(entity);
	}
	
	@Transactional
	public ClientDTO insert(ClientDTO dto) {
		Client entity = new Client();
		
		copyDtoToEntity(dto, entity);
		
		entity = repository.save(entity);
		return new ClientDTO(entity);
	}
	
	@Transactional
	public ClientDTO update(Long id, ClientDTO dto) {
		try {
			Client entity = repository.getOne(id);
			
			copyDtoToEntity(dto, entity);
			
			entity = repository.save(entity);
			return new ClientDTO(entity);
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
	
	private void copyDtoToEntity(ClientDTO dto, Client entity) {
		entity.setName(dto.getName());		
		entity.setPhone(dto.getPhone());
	}
}
