import resetPasswordToken from "@/lib/models/resetPasswordToken";
import { getResetPasswordTokenbyEmail } from ".";
import crypto from 'crypto'
export const generationResetPasswordToken = async (email: string) =>{
    try {
        const token = crypto.randomInt(100_000 , 1_000_000).toString();
        const expire = new Date().getTime() + 60 * 60 * 1000
        const existingResetPasswordToken = await getResetPasswordTokenbyEmail(email)
        if(existingResetPasswordToken){
          await resetPasswordToken.findByIdAndDelete(existingResetPasswordToken._id)
        }
       const ResetPasswordToken =  await resetPasswordToken.create({
            token,
            email,
            expire
        })
        return ResetPasswordToken
    } catch (error) {
        console.log("Error from generationResetPasswordToken: ", error)
        return null
    }
}