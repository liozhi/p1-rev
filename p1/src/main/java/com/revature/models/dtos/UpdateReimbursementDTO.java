package com.revature.models.dtos;

public class UpdateReimbursementDTO {
    private int reimbursementId;
    private String status;

    public UpdateReimbursementDTO() {
    }

    public UpdateReimbursementDTO(int reimbursementId, String status) {
        this.reimbursementId = reimbursementId;
        this.status = status;
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UpdateReimbursementDTO{" +
                "reimbursementId=" + reimbursementId +
                ", status='" + status + '\'' +
                '}';
    }
}
