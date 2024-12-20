package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.models.Reimbursement;
import com.revature.models.dtos.IncomingReimbursementDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {

    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO) {
        this.reimbursementDAO = reimbursementDAO;
    }

    public Reimbursement insertReimbursement(IncomingReimbursementDTO reimbursementDTO) {
        return reimbursementDAO.save(new Reimbursement(
                0,
                reimbursementDTO.getDescription(),
                reimbursementDTO.getAmount(),
                reimbursementDTO.getStatus(),
                reimbursementDTO.getUserId()
        ));
    }

    public List<Reimbursement> getAllReimbursementsByUserId(int uid) {
        return reimbursementDAO.findAllByUserId(uid);
    }

    public List<Reimbursement> getAllPendingReimbursements() {
        return reimbursementDAO.findAllByStatus("pending");
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
