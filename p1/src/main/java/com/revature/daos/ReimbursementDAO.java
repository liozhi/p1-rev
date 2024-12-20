package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    public List<Reimbursement> findAllByUserUserId(int userId);

    // Will probably only be used for finding pending reimbursements
    public List<Reimbursement> findAllByStatus(String status);

}
