package com.revature.controllers;

import com.revature.aspects.AdminOnly;
import com.revature.models.Reimbursement;
import com.revature.models.dtos.IncomingReimbursementDTO;
import com.revature.models.dtos.OutgoingReimbursementDTO;
import com.revature.models.dtos.UpdateReimbursementDTO;
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
    public ResponseEntity<OutgoingReimbursementDTO> insertReimbursement(@RequestBody IncomingReimbursementDTO re) {
        OutgoingReimbursementDTO newRe = reimbursementService.insertReimbursement(re);
        return ResponseEntity.status(201).body(newRe);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<List<OutgoingReimbursementDTO>> getReimbursementsByUserId(@PathVariable int uid) {
        List<OutgoingReimbursementDTO> reList = reimbursementService.getAllReimbursementsByUserId(uid);
        if (reList.isEmpty()) return ResponseEntity.status(404).body(reList);
        return ResponseEntity.ok(reList);
    }

    @GetMapping("/all")
    @AdminOnly
    public ResponseEntity<List<OutgoingReimbursementDTO>> getAllReimbursements() {
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());
    }

    @PatchMapping("/all")
    @AdminOnly
    public ResponseEntity<OutgoingReimbursementDTO> updateReimbursement(@RequestBody UpdateReimbursementDTO re) {
        OutgoingReimbursementDTO newRe = reimbursementService.updateReimbursement(re.getReimbursementId(), re.getStatus());
        return ResponseEntity.status(201).body(newRe);
    }
}
