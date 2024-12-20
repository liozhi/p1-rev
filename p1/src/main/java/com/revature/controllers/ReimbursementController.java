package com.revature.controllers;

import com.revature.models.Reimbursement;
import com.revature.models.dtos.IncomingReimbursementDTO;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimb")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class ReimbursementController {
    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @PostMapping
    public ResponseEntity<Reimbursement> insertReimbursement(@RequestBody IncomingReimbursementDTO re) {
        Reimbursement newRe = reimbursementService.insertReimbursement(re);
        return ResponseEntity.status(201).body(newRe);
    }

    @GetMapping("/reimb/{reId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int uid) {
        List<Reimbursement> reList = reimbursementService.getAllReimbursementsByUserId(uid);
        if (reList.isEmpty()) return ResponseEntity.status(404).body(reList);
        return ResponseEntity.ok(reList);
    }

    @GetMapping("/reimb/all")
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());
    }
}
