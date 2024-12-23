package com.revature.aspects;

import jakarta.servlet.Servlet;
import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect // class that can trigger functionality at any point in our application - similar to event listener
@Component
public class AuthAspect {

    // when any method in the controller is called, we'll check if the user is logged in (ignore for login/register)
    // when a method with our custom @AdminOnly annotation is called, check that the user has the appropriate role

    @Order(1) // Login check should happen before authorization check
    @Before("within(com.revature.controllers.*)" +
            "&& !execution(* com.revature.controllers.AuthController.login(..))" +
            "&& !execution(* com.revature.controllers.UserController.insertUser(..))" +
            "&& !execution(* com.revature.controllers.AuthController.logout(..))")
    public void checkLoggedIn() {
        // Get access to the session
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false); // false -> don't create new session if it doesn't exist

        // Check if session exists
        if (session == null || session.getAttribute("userId") == null) throw new IllegalArgumentException("User is not logged in");
    }

    // Goes with @AdminOnly
    @Order(2)
    @Before("@annotation(AdminOnly)")
    public void checkAdmin() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);

        // Check if role is "manager"
        if (session == null || session.getAttribute("role") == null || !session.getAttribute("role").equals("manager")) {
            throw new IllegalArgumentException("Authorization invalid");
        }
    }
}
