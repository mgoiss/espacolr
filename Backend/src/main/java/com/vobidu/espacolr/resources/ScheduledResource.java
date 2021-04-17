package com.vobidu.espacolr.resources;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.vobidu.espacolr.dto.FreeDateDTO;
import com.vobidu.espacolr.dto.ScheduledDTO;
import com.vobidu.espacolr.services.ScheduledService;

@RestController
@RequestMapping(value = "/scheduleds")
public class ScheduledResource {
	
	@Autowired
	private ScheduledService service;
	
	@GetMapping
	public ResponseEntity<Page<ScheduledDTO>> findAll(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,	
			@RequestParam(value = "orderBy", defaultValue = "date") String orderBy			
			) {
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<ScheduledDTO> list = service.findAllPaged(pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ScheduledDTO> findById(@PathVariable Long id) {
		ScheduledDTO dto = service.findById(id);
		
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping(value = "/filters")
	public ResponseEntity<List<ScheduledDTO>> findFilters(
			@RequestParam(value = "month", defaultValue = "0") Integer month,
			@RequestParam(value = "status", defaultValue = "all") String status,
			@RequestParam(value = "client", defaultValue = "all") String client
			) {
		
		if (month == 0) {
			month = LocalDate.now().getMonthValue();
		}
		
		List<ScheduledDTO> dto = service.findFilters(month, status, client);
		
		return ResponseEntity.ok().body(dto);
		//return ResponseEntity.ok().body(month.toString() + " + " + status + " + " + client);
	}
	
	//FAZER UMA VERIFICAÇÃO DO ANO SOLICITADO E O MES
	@GetMapping(value = "/date/{year}&{month}")
	public ResponseEntity<List<FreeDateDTO>> findFreeTime(@PathVariable Long year, @PathVariable Long month) {
		List<FreeDateDTO> dto = service.findFreeDate(year.intValue(), month.intValue()); //Pegando os dados no banco por meio do medo findAll

		return ResponseEntity.ok().body(dto); //Retornando a lista na requisição
	}
	
	@PostMapping
	public ResponseEntity<ScheduledDTO> insert(@Valid @RequestBody ScheduledDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<ScheduledDTO> update(@PathVariable Long id, @Valid @RequestBody ScheduledDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ScheduledDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
