import verificationToken from "@/lib/models/verificationToken"
export const getVerificationTokenByEmail = async (email: string)=>{
    try {
        const existingToken = await verificationToken.findOne({email: email})
        if(!existingToken) return null
        return existingToken
    } catch (error) {
        console.log('Get token by email error:', error)
        return null
    }
}
export const getVerificationTokenByToken = async (token: string)=>{
    try {
        const existingToken = await verificationToken.findOne({token: token})
        if(!existingToken) return null
        return existingToken
    } catch (error) {
        console.log('Get token by token error:', error)
        return null
    }
}
