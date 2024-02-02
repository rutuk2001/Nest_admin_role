export declare class EmailService {
    private transporter;
    constructor();
    sendOtpEmail(userEmail: string, otp: string): Promise<void>;
    generateOtp(): string;
}
