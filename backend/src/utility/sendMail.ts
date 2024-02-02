import nodemailer from "nodemailer";
import crypto from "crypto";

export const sendEmail = async (to: string) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const token = crypto.randomBytes(20).toString("hex");

  const passwordCreationLink = `${process.env.CLIENT_URL}/create-password/${token}`;

  const subject = "Account Registration - Password Creation Link";
  const text = `Dear [Name], 

  You have been added as an admin/observer to our system. Please click the following link to create your password and access your account: 
  
  ${passwordCreationLink} 
  
  Please note that the password creation link is valid for one-time use only. Ensure that you use it promptly to set up your password. 
  
  Best regards, 
  
  [Company Name]`;

  // Set up email data
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return token;
  } catch (error) {
    console.error("Error occurred while sending email: %s", error);
  }
};
