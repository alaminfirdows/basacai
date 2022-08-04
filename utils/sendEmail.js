const nodemailer = require("nodemailer")

const sendEmail = async (to, url, txt) => {
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
        from: process.env.SMPT_MAIL,
        to: to,
        Subject: "Vasha Chai",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Memories Site.</h2>
        <p>
            You can share your memorable days here.
        </p>
       
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
   
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
   
        <div>${url}</div>
        </div>
        `
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail

