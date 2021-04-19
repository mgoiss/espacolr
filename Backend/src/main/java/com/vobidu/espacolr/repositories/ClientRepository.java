package com.vobidu.espacolr.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vobidu.espacolr.entities.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{
	
	@Query("SELECT obj FROM Client obj WHERE (LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<Client> findAllFilter(String name, Pageable pageable);
}
