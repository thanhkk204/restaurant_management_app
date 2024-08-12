"use server"
import user from "@/lib/models/user"

export const getUserById = async(_id: string)=>{
   try {
    const User = await user.findById(_id)
    return User
   } catch (error) {
    return {error: "Can't get user by Id"}
   }
}

export const getUserByEmail = async(email: string)=>{
   try {
    const User = await user.findOne({email: email})
    return User
   } catch (error) {
    return {error: "Can't get user by Email"}
   }
}
