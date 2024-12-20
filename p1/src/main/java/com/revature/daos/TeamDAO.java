package com.revature.daos;

import com.revature.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// extending JpaRepository gives us access to pre-built CRUD methods
@Repository
public interface TeamDAO extends JpaRepository<Team, Integer> { // <type of entity, type of entity's pkey>

    // "property expression" custom query
    // method must be named "findBy[xyz]" where xyz is the name of the field we are selecting by, must be camelcase
    List<Team> findByTeamLocation(String location);

}
