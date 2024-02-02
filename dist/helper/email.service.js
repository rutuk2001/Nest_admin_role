"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer = require("nodemailer");
const crypto_1 = require("crypto");
class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "iamusernest@gmail.com",
                pass: "uzie fjfk zkke pkas",
            },
        });
    }
    async sendOtpEmail(userEmail, otp) {
        console.log(userEmail, "/////////////");
        const mailOptions = {
            from: "iamusernest@gmail.com",
            to: userEmail,
            subject: "Reset Password",
            text: `Your OTP for password reset is: ${otp}`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Reset password email sent to ${userEmail}`);
        }
        catch (error) {
            console.error("Error sending reset password email:", error);
        }
    }
    generateOtp() {
        const otp = (0, crypto_1.randomBytes)(3).toString("hex");
        return otp.slice(0, 6);
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map