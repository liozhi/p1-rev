package com.revature.models.dtos;

public class UpdateDescriptionDTO {
    private int reimbursementId;
    private String description;

    public UpdateDescriptionDTO() {
    }

    public UpdateDescriptionDTO(int reimbursementId, String description) {
        this.reimbursementId = reimbursementId;
        this.description = description;
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

    @Override
    public String toString() {
        return "UpdateDescriptionDTO{" +
                "reimbursementId=" + reimbursementId +
                ", description='" + description + '\'' +
                '}';
    }
}
