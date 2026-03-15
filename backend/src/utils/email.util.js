// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.BREVO_USER,
//     pass: process.env.BREVO_PASS,
//   },
// });

// export const sendOtpEmail = async (toEmail, otp) => {
//   await transporter.sendMail({
//     from: '"A1 Classes Centre of Knowledge" <manishsinghbora7115@gmail.com>',
//     to: toEmail,
//     subject: "Your Password Reset OTP",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e0e0e0; border-radius: 8px;">
//         <h2 style="color: #333;">Password Reset Request</h2>
//         <p style="color: #555;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
//         <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 24px; background: #f5f5f5; border-radius: 8px; margin: 24px 0;">
//           ${otp}
//         </div>
//         <p style="color: #999; font-size: 13px;">If you didn't request this, please ignore this email.</p>
//       </div>
//     `,
//   });
// };



export const sendOtpEmail = async (toEmail, otp) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "A1 Classes Centre of Knowledge", email: "manishsinghbora7115@gmail.com" },
      to: [{ email: toEmail }],
      subject: "Your Password Reset OTP",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="color: #555;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 24px; background: #f5f5f5; border-radius: 8px; margin: 24px 0;">
            ${otp}
          </div>
          <p style="color: #999; font-size: 13px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Brevo API error: ${err.message}`);
  }
};