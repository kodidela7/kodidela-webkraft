import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Send referral link email to referrer
 */
export async function sendReferralLinkEmail(
    to: string,
    name: string,
    referralCode: string,
    referralLink: string
): Promise<void> {
    const mailOptions = {
        from: process.env.SMTP_FROM || "noreply@kodidela-webkraft.com",
        to,
        subject: "Your Referral Link - Kodidela WebKraft",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Welcome to our Referral Program!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for joining our referral program! Here's your unique referral link:</p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Referral Code:</strong> ${referralCode}</p>
          <p style="margin: 10px 0 0 0;"><strong>Referral Link:</strong></p>
          <a href="${referralLink}" style="color: #3b82f6; word-break: break-all;">${referralLink}</a>
        </div>
        <p>Share this link with your friends and colleagues. When they submit a project request using your link, you'll earn a commission!</p>
        <p>Best regards,<br>Kodidela WebKraft Team</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

/**
 * Send lead notification email to admin
 */
export async function sendLeadNotificationEmail(
    leadData: {
        name: string;
        email: string;
        phone: string;
        company?: string;
        project_type?: string;
        budget?: string;
        details?: string;
        ref_code?: string;
    }
): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@kodidela-webkraft.com";

    const mailOptions = {
        from: process.env.SMTP_FROM || "noreply@kodidela-webkraft.com",
        to: adminEmail,
        subject: `New Lead: ${leadData.name} ${leadData.ref_code ? `(Referred by ${leadData.ref_code})` : ""}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">New Quote Request</h2>
        ${leadData.ref_code ? `<p style="background: #fef3c7; padding: 10px; border-radius: 5px;"><strong>⭐ Referral Code:</strong> ${leadData.ref_code}</p>` : ""}
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${leadData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${leadData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${leadData.phone}</td>
          </tr>
          ${leadData.company ? `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Company:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${leadData.company}</td>
          </tr>
          ` : ""}
          ${leadData.project_type ? `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Project Type:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${leadData.project_type}</td>
          </tr>
          ` : ""}
          ${leadData.budget ? `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Budget:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${leadData.budget}</td>
          </tr>
          ` : ""}
        </table>
        ${leadData.details ? `
        <div style="margin-top: 20px;">
          <strong>Project Details:</strong>
          <p style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px;">${leadData.details}</p>
        </div>
        ` : ""}
        <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">Login to your admin panel to manage this lead.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

/**
 * Verify email configuration
 */
export async function verifyEmailConfig(): Promise<boolean> {
    try {
        await transporter.verify();
        return true;
    } catch (error) {
        console.error("Email configuration error:", error);
        return false;
    }
}
