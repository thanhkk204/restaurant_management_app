import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail, getVerificationTokenByToken } from '.';
import VerificationToken from '@/lib/models/verificationToken';
import User from '@/lib/models/user';

export const generationVerificationToken = async (email: string) =>{
    try {
        const token = uuidv4();
        const expire = new Date().getTime() + 60 * 60 * 1000
        const existingVerificationToken = await getVerificationTokenByEmail(email)

        if(existingVerificationToken){
          await VerificationToken.findByIdAndDelete(existingVerificationToken._id)
        }
       const verificationtoken =  await VerificationToken.create({
            token,
            email,
            expire
        })
        return verificationtoken
    } catch (error) {
        console.log("Error from generationVerificationToken: ", error)
        return null
    }
}

export const checkOutVarificationToken = async (token: string)=> {
      try {
        const existingToken = await getVerificationTokenByToken(token)
        if(!existingToken) return {error: "There is no token in database"}
        const expired = new Date().getTime() > new Date(existingToken.expire).getTime()
        if(!expired) return {error: "Token was expired"}

        await User.findOneAndUpdate({email: existingToken.email}, {emailVerified: new Date()})
        await VerificationToken.findByIdAndDelete(existingToken._id)
        return {success: "Verify Successfully!"}
      } catch (error) {
        console.log("Error from checkOutVerificationToken: ", error)
        return {error: "Something went wrong"}
      }
}