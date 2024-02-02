import * as nodemailer from "nodemailer";
import { randomBytes } from "crypto";
export class EmailService {
  private transporter: any;

  constructor() {
    // Initialize nodemailer transporter with your email service provider's configuration
    this.transporter = nodemailer.createTransport({
      service: "gmail", // Update with your email service provider
      auth: {
        user: "iamusernest@gmail.com",
        pass: "uzie fjfk zkke pkas",
      },
    });
  }

  async sendOtpEmail(userEmail: string, otp: string) {
    console.log(userEmail, "/////////////");
    // Setup email data
    const mailOptions = {
      from: "iamusernest@gmail.com",
      to: userEmail,
      subject: "Reset Password",
      text: `Your OTP for password reset is: ${otp}`,
    };

    // Send email
    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Reset password email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending reset password email:", error);
    }
  }

  generateOtp(): string {
    const otp = randomBytes(3).toString("hex"); // Assuming a 6-digit numeric OTP
    return otp.slice(0, 6);
  }
}
