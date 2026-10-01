package net.javaguides.Ems.service;

public interface EmailService {
    void sendOtp(String toEmail, String otp);
    void sendPasswordChangeOtp(String toEmail, String otp);
}
