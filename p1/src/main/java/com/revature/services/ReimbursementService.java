package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.models.dtos.IncomingReimbursementDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private final ReimbursementDAO reimbursementDAO;
    private final UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, UserDAO userDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.userDAO = userDAO;
    }

    public Reimbursement insertReimbursement(IncomingReimbursementDTO reimbursementDTO) {
        Reimbursement re = reimbursementDAO.save(new Reimbursement(
                0,
                reimbursementDTO.getDescription(),
                reimbursementDTO.getAmount(),
                "pending",
                null
        ));

        Optional<User> user = userDAO.findById(reimbursementDTO.getUserId());
        if (user.isEmpty()) throw new IllegalArgumentException("No user found with id " + reimbursementDTO.getUserId());
        re.setUser(user.get());
        return re;
    }

    public List<Reimbursement> getAllReimbursementsByUserId(int uid) {
        return reimbursementDAO.findAllByUserUserId(uid);
    }

    public List<Reimbursement> getAllPendingReimbursements() {
        return reimbursementDAO.findAllByStatus("pending");
    }

    public List<Reimbursement> getAllReimbursements() {
        return reimbursementDAO.findAll();
    }

    public Reimbursement updateReimbursement(int reId, String status) {
        Reimbursement newRe = reimbursementDAO.findById(reId).orElseThrow(() -> {
            throw new IllegalArgumentException("No reimbursement found with ID " + reId);
        });

        // Probably have checks to make sure the status can be one of 3 strings - or do this on controller side

        newRe.setStatus(status);
        return reimbursementDAO.save(newRe);
    }
}
