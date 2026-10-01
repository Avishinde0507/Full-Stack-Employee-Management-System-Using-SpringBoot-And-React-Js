package net.javaguides.Ems.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javaguides.Ems.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.mail.from-name:EMS Admin Portal}")
    private String fromName;

    @Async
    @Override
    public void sendOtp(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(new InternetAddress(fromEmail, fromName));
            helper.setTo(toEmail);
            helper.setSubject("🔐 Your EMS Login OTP Code");
            helper.setText(buildEmailHtml(otp), true); // true = HTML

            mailSender.send(message);
            log.info("OTP email sent successfully to {}", toEmail);

        } catch (MessagingException | java.io.UnsupportedEncodingException e) {
            log.error("Failed to send OTP email to {}: {}", toEmail, e.getMessage());
            // Do NOT throw — login flow should still work even if mail fails
        }
    }

    @Async
    @Override
    public void sendPasswordChangeOtp(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(new InternetAddress(fromEmail, fromName));
            helper.setTo(toEmail);
            helper.setSubject("🔑 Your EMS Password Change OTP Code");
            helper.setText(buildPasswordChangeEmailHtml(otp), true);

            mailSender.send(message);
            log.info("Password change OTP email sent successfully to {}", toEmail);

        } catch (MessagingException | java.io.UnsupportedEncodingException e) {
            log.error("Failed to send password change OTP email to {}: {}", toEmail, e.getMessage());
        }
    }

    private String buildPasswordChangeEmailHtml(String otp) {
        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8"/>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>EMS Password Change Verification</title>
                </head>
                <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
                  <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
                    <tr>
                      <td align="center">
                        <table width="480" cellpadding="0" cellspacing="0"
                               style="background:#ffffff;border-radius:16px;overflow:hidden;
                                      box-shadow:0 4px 24px rgba(20,33,61,0.10);">

                          <!-- Header -->
                          <tr>
                            <td style="background:linear-gradient(135deg,#14213d 0%%,#1f2f52 100%%);
                                       padding:32px 40px;text-align:center;">
                              <div style="width:56px;height:56px;background:#e8a33d;border-radius:14px;
                                          margin:0 auto 16px;display:flex;align-items:center;justify-content:center;
                                          font-size:26px;line-height:56px;text-align:center;">🔑</div>
                              <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;letter-spacing:-0.3px;">
                                Password Change Request
                              </h1>
                              <p style="color:#a8b4cc;font-size:13px;margin:6px 0 0;">
                                EMS Admin Security Center
                              </p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="padding:36px 40px 28px;">
                              <p style="color:#14213d;font-size:16px;font-weight:600;margin:0 0 8px;">
                                Hello, Administrator 👋
                              </p>
                              <p style="color:#647087;font-size:14px;line-height:1.6;margin:0 0 28px;">
                                We received a request to update the password for your
                                <strong style="color:#14213d;">EMS Administrator Account</strong>.
                                Enter the verification code below to authorize this change:
                              </p>

                              <!-- OTP Box -->
                              <div style="background:#f4f6f8;border:2px dashed #e8a33d;border-radius:12px;
                                          padding:24px;text-align:center;margin-bottom:28px;">
                                <p style="color:#647087;font-size:12px;text-transform:uppercase;
                                          letter-spacing:1px;margin:0 0 10px;">Password Change Code</p>
                                <span style="font-size:40px;font-weight:800;letter-spacing:10px;
                                             color:#14213d;font-family:'Courier New',monospace;">
                                  %s
                                </span>
                                <p style="color:#9aa4b5;font-size:12px;margin:12px 0 0;">
                                  ⏱ This code expires in <strong>10 minutes</strong>
                                </p>
                              </div>

                              <div style="background:#fff8ec;border-left:4px solid #e8a33d;
                                          border-radius:6px;padding:14px 16px;margin-bottom:24px;">
                                <p style="color:#6b430c;font-size:13px;margin:0;">
                                  ⚠️ <strong>Security Notice:</strong> If you did not initiate this password change,
                                  please contact your system administrator immediately.
                                </p>
                              </div>

                              <p style="color:#9aa4b5;font-size:13px;line-height:1.6;margin:0;">
                                Never share this verification code with anyone.
                              </p>
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background:#f8f9fb;border-top:1px solid #e3e7ed;
                                       padding:20px 40px;text-align:center;">
                              <p style="color:#9aa4b5;font-size:12px;margin:0;">
                                © 2025 EMS Admin Portal &bull; Automated Security Email &bull; Do not reply
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(otp);
    }

    private String buildEmailHtml(String otp) {
        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8"/>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>EMS OTP Verification</title>
                </head>
                <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
                  <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
                    <tr>
                      <td align="center">
                        <table width="480" cellpadding="0" cellspacing="0"
                               style="background:#ffffff;border-radius:16px;overflow:hidden;
                                      box-shadow:0 4px 24px rgba(20,33,61,0.10);">

                          <!-- Header -->
                          <tr>
                            <td style="background:linear-gradient(135deg,#14213d 0%%,#1f2f52 100%%);
                                       padding:32px 40px;text-align:center;">
                              <div style="width:56px;height:56px;background:#e8a33d;border-radius:14px;
                                          margin:0 auto 16px;display:flex;align-items:center;justify-content:center;
                                          font-size:26px;line-height:56px;text-align:center;">🔐</div>
                              <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;letter-spacing:-0.3px;">
                                EMS Admin Portal
                              </h1>
                              <p style="color:#a8b4cc;font-size:13px;margin:6px 0 0;">
                                Employee Management System
                              </p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="padding:36px 40px 28px;">
                              <p style="color:#14213d;font-size:16px;font-weight:600;margin:0 0 8px;">
                                Hello, Administrator 👋
                              </p>
                              <p style="color:#647087;font-size:14px;line-height:1.6;margin:0 0 28px;">
                                You requested a login verification code for the
                                <strong style="color:#14213d;">EMS Admin Portal</strong>.
                                Use the OTP below to complete your sign-in.
                              </p>

                              <!-- OTP Box -->
                              <div style="background:#f4f6f8;border:2px dashed #e8a33d;border-radius:12px;
                                          padding:24px;text-align:center;margin-bottom:28px;">
                                <p style="color:#647087;font-size:12px;text-transform:uppercase;
                                          letter-spacing:1px;margin:0 0 10px;">Your verification code</p>
                                <span style="font-size:40px;font-weight:800;letter-spacing:10px;
                                             color:#14213d;font-family:'Courier New',monospace;">
                                  %s
                                </span>
                                <p style="color:#9aa4b5;font-size:12px;margin:12px 0 0;">
                                  ⏱ This code expires in <strong>10 minutes</strong>
                                </p>
                              </div>

                              <div style="background:#fff8ec;border-left:4px solid #e8a33d;
                                          border-radius:6px;padding:14px 16px;margin-bottom:24px;">
                                <p style="color:#6b430c;font-size:13px;margin:0;">
                                  ⚠️ <strong>Security Notice:</strong> Never share this OTP with anyone.
                                  EMS team will never ask for your OTP code.
                                </p>
                              </div>

                              <p style="color:#9aa4b5;font-size:13px;line-height:1.6;margin:0;">
                                If you did not request this code, please ignore this email.
                                Your account remains secure.
                              </p>
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background:#f8f9fb;border-top:1px solid #e3e7ed;
                                       padding:20px 40px;text-align:center;">
                              <p style="color:#9aa4b5;font-size:12px;margin:0;">
                                © 2025 EMS Admin Portal &bull; Automated Security Email &bull; Do not reply
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(otp);
    }
}
