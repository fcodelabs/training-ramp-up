const nodemailer = require("nodemailer");

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pasinduchan24@gmail.com",
    pass: "fcodetest@123",
  },
});

// Email template
const createEmailContent = (
  name: string,
  role: string,
  passwordCreationLink: string,
) => `
  Subject: Account Registration - Password Creation Link

  Dear ${name},

  You have been added as an ${role.toLowerCase()} to our system. 
  Please click the following link to create your password and access your account:

  ${passwordCreationLink}

  Please note that the password creation link is valid for one-time use only. 
  Ensure that you use it promptly to set up your password.

  Best regards,
  [Company Name]
`;

// Function to send the email
const sendEmail = async (
  name: string,
  email: string,
  role: string,
  passwordCreationLink: string,
) => {
  // Setup email data
  const mailOptions = {
    from: "pasinduchan24@gmail.com",
    to: email,
    subject: "Account Registration - Password Creation Link",
    text: createEmailContent(name, role, passwordCreationLink),
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true; // Indicate successful email sending
  } catch (error) {
    console.error(error);
    return false; // Indicate failure in email sending
  }
};

export default sendEmail;
