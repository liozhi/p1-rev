package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.models.dtos.IncomingReimbursementDTO;
import com.revature.models.dtos.OutgoingReimbursementDTO;
import com.revature.models.dtos.OutgoingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public OutgoingReimbursementDTO insertReimbursement(IncomingReimbursementDTO reimbursementDTO) {
        Reimbursement re = new Reimbursement(
                0,
                reimbursementDTO.getDescription(),
                reimbursementDTO.getAmount(),
                "pending",
                null
        );

        Optional<User> user = userDAO.findById(reimbursementDTO.getUserId());
        if (user.isEmpty()) throw new IllegalArgumentException("No user found with id " + reimbursementDTO.getUserId());
        re.setUser(user.get());
        reimbursementDAO.save(re);
        return sanitizeReimbursements(re);
    }

    public List<OutgoingReimbursementDTO> getAllReimbursementsByUserId(int uid) {
        return sanitizeReimbursements(reimbursementDAO.findAllByUserUserId(uid));
    }

    public List<OutgoingReimbursementDTO> getAllPendingReimbursements() {
        return sanitizeReimbursements(reimbursementDAO.findAllByStatus("pending"));
    }

    public List<OutgoingReimbursementDTO> getAllReimbursements() {
        return sanitizeReimbursements(reimbursementDAO.findAll());
    }

    // Remove password from user field in Reimbursement (thanks Spring, very cool)
    private List<OutgoingReimbursementDTO> sanitizeReimbursements(List<Reimbursement> reList) {
        List<OutgoingReimbursementDTO> newReList = new ArrayList<>();
        for (Reimbursement re : reList) {
            newReList.add(new OutgoingReimbursementDTO(
                    re.getReimbursementId(),
                    re.getDescription(),
                    re.getAmount(),
                    re.getStatus(),
                    new OutgoingUserDTO(
                            re.getUser().getUserId(),
                            re.getUser().getUsername(),
                            re.getUser().getRole(),
                            re.getUser().getFirstName(),
                            re.getUser().getLastName()
                    )
            ));
        }

        return newReList;
    }

    private OutgoingReimbursementDTO sanitizeReimbursements(Reimbursement re) {
        return new OutgoingReimbursementDTO(
                    re.getReimbursementId(),
                    re.getDescription(),
                    re.getAmount(),
                    re.getStatus(),
                    new OutgoingUserDTO(
                            re.getUser().getUserId(),
                            re.getUser().getUsername(),
                            re.getUser().getRole(),
                            re.getUser().getFirstName(),
                            re.getUser().getLastName()
                    )
            );
    }

    public OutgoingReimbursementDTO updateReimbursement(int reId, String status) {
        Reimbursement newRe = reimbursementDAO.findById(reId).orElseThrow(() -> {
            throw new IllegalArgumentException("No reimbursement found with ID " + reId);
        });

        // Probably have checks to make sure the status can be one of 3 strings - or do this on controller side

        newRe.setStatus(status);
        return sanitizeReimbursements(reimbursementDAO.save(newRe));
    }
}
