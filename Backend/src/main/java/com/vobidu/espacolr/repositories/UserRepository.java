package com.vobidu.espacolr.repositories;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vobidu.espacolr.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);
	
	@Query("SELECT obj FROM User obj JOIN FETCH obj.roles WHERE obj IN :users")
	List<User> find(List<User> users);
	
	//@Query("SELECT obj FROM User obj JOIN FETCH obj.roles WHERE obj IN :user")
	//User findById(Optional<User> user); // N+1 consulta
	
	@Query("SELECT obj FROM User obj WHERE (LOWER(obj.firstName) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<User> findAllFilter(String name, Pageable pageable);
}
