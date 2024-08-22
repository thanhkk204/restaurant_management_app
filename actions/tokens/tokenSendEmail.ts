import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
},
})
export const verificationTokenSendEmail = async (email: string, token: string) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Verification Email",
      html: `<h1>It seems like you'v entered approciate email</h1>
        <span>
        In order to verify your mail
        <a href="${process.env.BASE_URL}/verificationToken?token=${token}">Click </a>
        here
        </span>
        `,
    })
    return true
  } catch (error) {
    console.log("Error from tokenSendEmail: ", error)
    return null
  }
}
export const resetPasswordTokenSendEmail = async (email: string, token: string) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Reset Pasword",
      html: `<p>Your code to reset pasword: <h1>${token}</h1></p>
        `,
    })
    return true
  } catch (error) {
    console.log("Error from tokenSendEmail: ", error)
    return null
  }
}
