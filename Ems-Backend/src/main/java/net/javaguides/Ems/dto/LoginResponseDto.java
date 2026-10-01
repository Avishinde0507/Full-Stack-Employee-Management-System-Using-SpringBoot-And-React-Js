package net.javaguides.Ems.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private String token;
    private String message;
    private boolean requireOtp;
    private String otp;
    private String profilePicture;
}
