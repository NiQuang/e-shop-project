package com.eshop.dto;

public class ChangePass {
    private String oldpass;
    private String newpass;
    private String confirmpass;

    public String getOldpass() {
        return oldpass;
    }

    public String getNewpass() {
        return newpass;
    }

    public String getConfirmpass() {
        return confirmpass;
    }

    public void setOldpass(String oldpass) {
        this.oldpass = oldpass;
    }

    public void setNewpass(String newpass) {
        this.newpass = newpass;
    }

    public void setConfirmpass(String confirmpass) {
        this.confirmpass = confirmpass;
    }

    public ChangePass(String oldpass, String newpass, String confirmpass) {
        this.oldpass = oldpass;
        this.newpass = newpass;
        this.confirmpass = confirmpass;
    }

    @Override
    public String toString() {
        return "ChangePass{" +
                "oldpass='" + oldpass + '\'' +
                ", newpass='" + newpass + '\'' +
                ", confirmpass='" + confirmpass + '\'' +
                '}';
    }
}
