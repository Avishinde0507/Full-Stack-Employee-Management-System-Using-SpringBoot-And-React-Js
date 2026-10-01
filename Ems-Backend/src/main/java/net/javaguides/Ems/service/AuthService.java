package net.javaguides.Ems.service;

import net.javaguides.Ems.dto.ChangePasswordRequestDto;
import net.javaguides.Ems.dto.LoginRequestDto;
import net.javaguides.Ems.dto.LoginResponseDto;
import net.javaguides.Ems.dto.OtpVerifyRequestDto;
import net.javaguides.Ems.dto.VerifyChangePasswordDto;

public interface AuthService {
    LoginResponseDto initiateLogin(LoginRequestDto request);
    LoginResponseDto verifyOtp(OtpVerifyRequestDto request);
    LoginResponseDto resendOtp(String email);
    LoginResponseDto login(LoginRequestDto request);
    LoginResponseDto getAdminProfile(String email);
    LoginResponseDto initiateChangePassword(ChangePasswordRequestDto request);
    LoginResponseDto verifyChangePassword(VerifyChangePasswordDto request);
    LoginResponseDto resendChangePasswordOtp(String email);
    LoginResponseDto updateProfilePhoto(net.javaguides.Ems.dto.ProfilePhotoRequestDto request);
}
