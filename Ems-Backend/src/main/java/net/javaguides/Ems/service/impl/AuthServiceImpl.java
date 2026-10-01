package net.javaguides.Ems.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javaguides.Ems.dto.ChangePasswordRequestDto;
import net.javaguides.Ems.dto.LoginRequestDto;
import net.javaguides.Ems.dto.LoginResponseDto;
import net.javaguides.Ems.dto.OtpVerifyRequestDto;
import net.javaguides.Ems.dto.VerifyChangePasswordDto;
import net.javaguides.Ems.entity.Admin;
import net.javaguides.Ems.exception.UnauthorizedException;
import net.javaguides.Ems.repository.AdminRepository;
import net.javaguides.Ems.service.AuthService;
import net.javaguides.Ems.service.EmailService;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final EmailService emailService;

    // OTP storage for login 2FA
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    // OTP storage for change password (key = email, value = OTP)
    private final Map<String, String> changePasswordOtpStorage = new ConcurrentHashMap<>();

    // Pending new password storage (key = email, value = new password)
    private final Map<String, String> changePasswordPendingStorage = new ConcurrentHashMap<>();

    private final SecureRandom random = new SecureRandom();

    // ── Login Flow ──────────────────────────────────────────────────────────────

    @Override
    public LoginResponseDto initiateLogin(LoginRequestDto request) {
        String email = request.getEmail().trim().toLowerCase();
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        int code = 100000 + random.nextInt(900000);
        String otp = String.valueOf(code);
        otpStorage.put(email, otp);

        emailService.sendOtp(admin.getEmail(), otp);
        log.info("OTP generated and email dispatched for: {}", email);

        return LoginResponseDto.builder()
                .email(admin.getEmail())
                .fullName(admin.getFullName())
                .role(admin.getRole())
                .requireOtp(true)
                .message("OTP sent to " + admin.getEmail())
                .build();
    }

    @Override
    public LoginResponseDto verifyOtp(OtpVerifyRequestDto request) {
        String email = request.getEmail().trim().toLowerCase();
        String enteredOtp = request.getOtp().trim();

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Admin account not found"));

        String storedOtp = otpStorage.get(email);
        boolean isValidOtp = storedOtp != null && storedOtp.equals(enteredOtp);

        if (!isValidOtp) {
            throw new UnauthorizedException("Invalid OTP code. Please try again.");
        }

        otpStorage.remove(email);
        String token = "ems-token-" + UUID.randomUUID();

        return LoginResponseDto.builder()
                .id(admin.getId())
                .fullName(admin.getFullName())
                .email(admin.getEmail())
                .role(admin.getRole())
                .profilePicture(admin.getProfilePicture())
                .token(token)
                .requireOtp(false)
                .message("Welcome Admin")
                .build();
    }

    @Override
    public LoginResponseDto resendOtp(String email) {
        String normalizedEmail = email.trim().toLowerCase();
        Admin admin = adminRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new UnauthorizedException("Admin account not found"));

        int code = 100000 + random.nextInt(900000);
        String otp = String.valueOf(code);
        otpStorage.put(normalizedEmail, otp);

        emailService.sendOtp(admin.getEmail(), otp);
        log.info("OTP resent to: {}", normalizedEmail);

        return LoginResponseDto.builder()
                .email(normalizedEmail)
                .requireOtp(true)
                .message("New OTP sent to " + admin.getEmail())
                .build();
    }

    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        return initiateLogin(request);
    }

    @Override
    public LoginResponseDto getAdminProfile(String email) {
        Admin admin = adminRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Admin user not found"));

        return LoginResponseDto.builder()
                .id(admin.getId())
                .fullName(admin.getFullName())
                .email(admin.getEmail())
                .role(admin.getRole())
                .profilePicture(admin.getProfilePicture())
                .token("valid-session")
                .message("Session active")
                .build();
    }

    @Override
    public LoginResponseDto updateProfilePhoto(net.javaguides.Ems.dto.ProfilePhotoRequestDto request) {
        String email = request.getEmail().trim().toLowerCase();
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Admin account not found"));

        admin.setProfilePicture(request.getProfilePicture());
        adminRepository.save(admin);
        log.info("Profile photo updated in database for: {}", email);

        return LoginResponseDto.builder()
                .id(admin.getId())
                .fullName(admin.getFullName())
                .email(admin.getEmail())
                .role(admin.getRole())
                .profilePicture(admin.getProfilePicture())
                .message("Profile photo updated successfully")
                .build();
    }

    // ── Change Password Flow ────────────────────────────────────────────────────

    @Override
    public LoginResponseDto initiateChangePassword(ChangePasswordRequestDto request) {
        String email = request.getEmail().trim().toLowerCase();

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Admin account not found"));

        if (!admin.getPassword().equals(request.getCurrentPassword())) {
            throw new UnauthorizedException("Current password is incorrect");
        }

        int code = 100000 + random.nextInt(900000);
        String otp = String.valueOf(code);
        changePasswordOtpStorage.put(email, otp);
        changePasswordPendingStorage.put(email, request.getNewPassword());

        emailService.sendPasswordChangeOtp(admin.getEmail(), otp);
        log.info("Change password OTP sent to: {}", email);

        return LoginResponseDto.builder()
                .email(admin.getEmail())
                .requireOtp(true)
                .message("OTP sent to " + admin.getEmail() + ". Enter it to confirm password change.")
                .build();
    }

    @Override
    public LoginResponseDto verifyChangePassword(VerifyChangePasswordDto request) {
        String email = request.getEmail().trim().toLowerCase();
        String enteredOtp = request.getOtp().trim();

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Admin account not found"));

        String storedOtp = changePasswordOtpStorage.get(email);
        String pendingNewPassword = changePasswordPendingStorage.get(email);

        if (storedOtp == null || !storedOtp.equals(enteredOtp)) {
            throw new UnauthorizedException("Invalid OTP code. Please try again.");
        }

        if (pendingNewPassword == null) {
            throw new UnauthorizedException("No pending password change found. Please restart the process.");
        }

        admin.setPassword(pendingNewPassword);
        adminRepository.save(admin);

        changePasswordOtpStorage.remove(email);
        changePasswordPendingStorage.remove(email);

        log.info("Password changed successfully for: {}", email);

        return LoginResponseDto.builder()
                .email(admin.getEmail())
                .requireOtp(false)
                .message("Password changed successfully!")
                .build();
    }

    @Override
    public LoginResponseDto resendChangePasswordOtp(String email) {
        String normalizedEmail = email.trim().toLowerCase();

        Admin admin = adminRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new UnauthorizedException("Admin account not found"));

        if (!changePasswordPendingStorage.containsKey(normalizedEmail)) {
            throw new UnauthorizedException("No pending password change found. Please restart the process.");
        }

        int code = 100000 + random.nextInt(900000);
        String otp = String.valueOf(code);
        changePasswordOtpStorage.put(normalizedEmail, otp);

        emailService.sendPasswordChangeOtp(admin.getEmail(), otp);
        log.info("Change password OTP resent to: {}", normalizedEmail);

        return LoginResponseDto.builder()
                .email(normalizedEmail)
                .requireOtp(true)
                .message("New OTP sent to " + admin.getEmail())
                .build();
    }
}
