package com.vobidu.espacolr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vobidu.espacolr.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
