import resetPasswordToken from "@/lib/models/resetPasswordToken"
import verificationToken from "@/lib/models/verificationToken"

/**
 * for verify email
 */
export const getVerificationTokenByEmail = async (email: string)=>{
    try {
        const existingToken = await verificationToken.findOne({email: email})
        if(!existingToken) return null
        return existingToken
    } catch (error) {
        console.log('Get verification token by email error:', error)
        return null
    }
}
export const getVerificationTokenByToken = async (token: string)=>{
    try {
        const existingToken = await verificationToken.findOne({token: token})
        if(!existingToken) return null
        return existingToken
    } catch (error) {
        console.log('Get verification token by token error:', error)
        return null
    }
}
/**
 * for reset password
 */
export const getResetPasswordTokenbyToken = async (token: string)=>{
    try {
        const existingToken = await resetPasswordToken.findOne({token: token})
        if(!existingToken) return null
        return existingToken
    } catch (error) {
        console.log('Get reset token by token error:', error)
        return null
    }
}
export const getResetPasswordTokenbyEmail = async (email: string)=>{
    try {
        const existingToken = await resetPasswordToken.findOne({email: email})
        if(!existingToken) return null
        return existingToken
    } catch (error) {
        console.log('Get reset token by email error:', error)
        return null
    }
}