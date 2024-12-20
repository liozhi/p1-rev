package com.revature.models.dtos;

public class IncomingReimbursementDTO {

    private String description;
    private float amount;
    private int userId;

    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(String description, float amount, int userId) {
        this.description = description;
        this.amount = amount;
        this.userId = userId;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount + '\'' +
                ", userId=" + userId +
                '}';
    }
}
