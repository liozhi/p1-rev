package com.revature.models.dtos;

public class OutgoingReimbursementDTO {
    private int reimbursementId;
    private String description;
    private float amount;
    private String status;
    private OutgoingUserDTO user;

    public OutgoingReimbursementDTO() {
    }

    public OutgoingReimbursementDTO(int reimbursementId, String description, float amount, String status, OutgoingUserDTO user) {
        this.reimbursementId = reimbursementId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OutgoingUserDTO getUser() {
        return user;
    }

    public void setUser(OutgoingUserDTO user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "OutgoingReimbursementDTO{" +
                "reimbursementId=" + reimbursementId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
