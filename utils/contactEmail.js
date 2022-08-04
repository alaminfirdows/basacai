const nodemailer = require("nodemailer")

const contactEmail = async (to, name, message, subject) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from: to,
        to: process.env.SMPT_MAIL,
        Subject: subject,
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Name : ${name}</h2>
        <p>
            ${message}
        </p>
        </div>
        `
    }
    await transporter.sendMail(mailOptions)
}

module.exports = contactEmail

