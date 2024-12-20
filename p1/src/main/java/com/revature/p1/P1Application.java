package com.revature.p1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.revature.models") // Scan for entities in this package
@ComponentScan("com.revature") // Look in this package for beans (e.g. controllers, anything with stereotype annotations)
@EnableJpaRepositories("com.revature.DAOs") // Required for JPA repositories to work, look in this package for JPA repositories
public class P1Application {

	public static void main(String[] args) {

		SpringApplication.run(P1Application.class, args);

	}

}
