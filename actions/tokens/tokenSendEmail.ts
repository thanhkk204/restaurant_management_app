import nodemailer from 'nodemailer';

export const tokenSendEmail = async (email: string, token: string) => {

   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD
        }
      });
    try {
        await transporter.sendMail({
        from: 'example.com', 
        to: email,
        subject: 'Verification Email', 
        html: `<h1>It seems like you'v entered approciate email</h1>
        <span>
        In order to verify your mail
        <a href="${process.env.BASE_URL}/verificationToken?token=${token}">Click </a>
        here
        </span>
        ` , 
      });
      return true
    } catch (error) {
        console.log("Error from tokenSendEmail: ", error)
        return null
    }
}