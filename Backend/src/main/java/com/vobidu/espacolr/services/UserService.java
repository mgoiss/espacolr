package com.vobidu.espacolr.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vobidu.espacolr.dto.RoleDTO;
import com.vobidu.espacolr.dto.UserDTO;
import com.vobidu.espacolr.dto.UserInsertDTO;
import com.vobidu.espacolr.dto.UserUpdateDTO;
import com.vobidu.espacolr.entities.Role;
import com.vobidu.espacolr.entities.User;
import com.vobidu.espacolr.repositories.RoleRepository;
import com.vobidu.espacolr.repositories.UserRepository;
import com.vobidu.espacolr.services.exceptions.DatabaseException;
import com.vobidu.espacolr.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {
	
	//Instanciando o logger para poder v qual o erro por meio console
	private static Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(String firstName, PageRequest pageRequest) {
		
		Page<User> page = repository.findAllFilter(firstName, pageRequest);
		repository.find(page.toList()); //Evitando as N+1 consulta, pois já será pego todos os ROLES aqui e não será feita varias consultas na linha abaixo
		return page.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		//repository.findById(obj); // N+1 consulta
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrada"));		
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		
		//REMOVER DEPOIS
		if (entity.getRoles().size() == 0) {
			Role role = roleRepository.getOne(1L);
			entity.getRoles().add(role);
		}
		
		copyDtoToEntity(dto, entity);
		
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
				
		entity = repository.save(entity);
		return new UserDTO(entity);
	}	

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			
			//Atualizando a senha
			entity.setPassword(passwordEncoder.encode(dto.getPassword()));
			
			entity = repository.save(entity);
			return new UserDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id não incontrado " + id);
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

	private void copyDtoToEntity(UserDTO dto, User entity) {		
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		
		
		entity.getRoles().clear();
		
		for (RoleDTO roleDto : dto.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);
		}		
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = repository.findByEmail(username);
		
		if(user == null) {
			logger.error("Usuário não encontrado: " + username);
			throw new UsernameNotFoundException("Email não encontrado");
		}
		
		logger.info("Usuário encontrado: " + username);
		
		return user;
	}
	
}
