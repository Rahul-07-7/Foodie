const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this if using Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderEmail(to, username, items, total) {
  const itemList = items
    .map((item) => `${item.title} (x${item.quantity}) - ₹${item.price}`)
    .join("<br>");

  const html = `
    <h2>Hello ${username},</h2>
    <p>Thank you for placing an order. Here's your order summary:</p>
    <p>${itemList}</p>
    <p><strong>Total: ₹${total}</strong></p>
    <hr>
    <p style="color: red;"><strong>Note:</strong> This is a dummy project. No actual food was ordered.</p>
  `;

  try {
    await transporter.sendMail({
      from: `"FoodApp Demo" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Order Summary (Demo)",
      html,
    });
    console.log("✅ Email sent to", to);
    console.log("🧾 Order summary:", items);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
}
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter failed:", error);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

module.exports = sendOrderEmail;
