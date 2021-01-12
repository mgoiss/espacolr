package com.vobidu.espacolr.services.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.vobidu.espacolr.dto.ScheduledDTO;
import com.vobidu.espacolr.entities.Scheduled;
import com.vobidu.espacolr.repositories.ScheduledRepository;
import com.vobidu.espacolr.resources.exceptions.FieldMessage;

public class ScheduledValidator implements ConstraintValidator<ScheduledValid, ScheduledDTO> {
	
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private ScheduledRepository repository;
	
	@Override
	public void initialize(ScheduledValid ann) {
	}

	@Override
	public boolean isValid(ScheduledDTO dto, ConstraintValidatorContext context) {
		
		//Pegando o id passado na url da requisição de update
		@SuppressWarnings("unchecked") //Para remover a warning que fica aparecendo
		var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);		
		
		List<FieldMessage> list = new ArrayList<>();
		
		//Verificando se o email informado já existe no BD
		Scheduled sche = repository.findByDate(dto.getDate()); //Pegando o email, caso exista no BD		
		if (sche != null) {
			
			//Verificação para saber se foi um update ou insert, pois o update é passado o id pela URL
			if(uriVars.get("id") != null) {				
				if(Long.parseLong(uriVars.get("id")) != sche.getId()) { //Verificando se o id passado não é o mesmo do atualiza
					list.add(new FieldMessage("date", "A data já foi agendada"));
				}
			}
			else { //Caso não seja update vai ser insert e o erro ocorre 
				list.add(new FieldMessage("date", "A data já foi agendada"));
			}
			
		}
		
		for (FieldMessage e : list) {
			//Inserindo os erros na lista de erros do Beans Validation
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}
