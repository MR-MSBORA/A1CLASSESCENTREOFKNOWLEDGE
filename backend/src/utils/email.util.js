// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // true for 465, false for 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendOtpEmail = async (toEmail, otp) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: toEmail,
//     subject: "Your Password Reset OTP",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e0e0e0; border-radius: 8px;">
//         <h2 style="color: #333;">Password Reset Request</h2>
//         <p style="color: #555;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
//         <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 24px; background: #f5f5f5; border-radius: 8px; margin: 24px 0;">
//           ${otp}
//         </div>
//         <p style="color: #999; font-size: 13px;">If you didn't request this, please ignore this email. Do not share this OTP with anyone.</p>
//       </div>
//     `,
//   });
// };



import nodemailer from "nodemailer";

// Create transporter (Gmail - Production Safe)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// Optional: Verify connection on startup (helps debugging)
transporter.verify((error, success) => {
  if (error) {
    console.log("Email service error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const sendOtpEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"A1 Classes" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555;">
          Use the OTP below to reset your password. It expires in 
          <strong>10 minutes</strong>.
        </p>

        <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 20px; background: #f5f5f5; border-radius: 8px; margin: 24px 0;">
          ${otp}
        </div>

        <p style="color: #999; font-size: 13px;">
          If you didn't request this, please ignore this email.
          Do not share this OTP with anyone.
        </p>
      </div>
    `,
  });
};