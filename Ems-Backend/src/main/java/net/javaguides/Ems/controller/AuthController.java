package net.javaguides.Ems.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.javaguides.Ems.dto.ChangePasswordRequestDto;
import net.javaguides.Ems.dto.LoginRequestDto;
import net.javaguides.Ems.dto.LoginResponseDto;
import net.javaguides.Ems.dto.OtpVerifyRequestDto;
import net.javaguides.Ems.dto.VerifyChangePasswordDto;
import net.javaguides.Ems.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "Authentication", description = "Admin Login, 2FA OTP, and Change Password APIs")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Initiate admin login", description = "Authenticates admin credentials and triggers OTP generation")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        LoginResponseDto response = authService.initiateLogin(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Verify OTP", description = "Verifies 6-digit OTP and generates admin authentication token")
    @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponseDto> verifyOtp(@Valid @RequestBody OtpVerifyRequestDto request) {
        LoginResponseDto response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Resend OTP", description = "Generates and resends a new 6-digit OTP code")
    @PostMapping("/resend-otp")
    public ResponseEntity<LoginResponseDto> resendOtp(@RequestParam String email) {
        LoginResponseDto response = authService.resendOtp(email);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get admin profile", description = "Retrieves admin profile info by email")
    @GetMapping("/me")
    public ResponseEntity<LoginResponseDto> getProfile(@RequestParam String email) {
        LoginResponseDto response = authService.getAdminProfile(email);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update admin profile photo", description = "Updates or removes the admin profile photo")
    @PostMapping("/profile-photo")
    public ResponseEntity<LoginResponseDto> updateProfilePhoto(@RequestBody net.javaguides.Ems.dto.ProfilePhotoRequestDto request) {
        LoginResponseDto response = authService.updateProfilePhoto(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Admin logout", description = "Logs out the current admin session")
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    // ── Change Password Endpoints ───────────────────────────────────────────────

    @Operation(summary = "Initiate password change", description = "Verifies current password then sends OTP to email for confirmation")
    @PostMapping("/change-password/initiate")
    public ResponseEntity<LoginResponseDto> initiateChangePassword(@Valid @RequestBody ChangePasswordRequestDto request) {
        LoginResponseDto response = authService.initiateChangePassword(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Verify password change OTP", description = "Verifies OTP and applies the new password")
    @PostMapping("/change-password/verify")
    public ResponseEntity<LoginResponseDto> verifyChangePassword(@Valid @RequestBody VerifyChangePasswordDto request) {
        LoginResponseDto response = authService.verifyChangePassword(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Resend password change OTP", description = "Resends the OTP for password change confirmation")
    @PostMapping("/change-password/resend-otp")
    public ResponseEntity<LoginResponseDto> resendChangePasswordOtp(@RequestParam String email) {
        LoginResponseDto response = authService.resendChangePasswordOtp(email);
        return ResponseEntity.ok(response);
    }
}
