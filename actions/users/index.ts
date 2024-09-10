"use server"
import User from "@/lib/models/user"
import Account from "@/lib/models/account"
import { connectToDB } from "@/lib/mongoDB"
export const getUserById = async(_id: string)=>{
   try {
    const existingUser = await User.findById(_id)
    return existingUser
   } catch (error) {
    return {error: "Can't get user by Id"}
   }
}

export const getUserByEmail = async(email: string)=>{
  try {
     await connectToDB()
    const existingUser = await User.findOne({email: email})
    return existingUser
   } catch (error) {
    console.log('get user by email error: ', error)
    return {error: "Can't get user by Email"}
   }
}

export const UpdateFieldUser = async(user: any, account: any)=>{
   try {
    await connectToDB()
    const existingUser = await User.findOne({ email: user.email })

    if (existingUser) {
      // Nếu người dùng đã tồn tại, cập nhật các trường cần thiết
      // Tìm hoặc tạo mới tài khoản trong collection Account
      let existingAccount = await Account.findOne({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      })
      if (!existingAccount) {
        existingAccount = new Account({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          access_token: account.access_token,
          scope: account.scope,
          token_type: account.token_type,
          userId: existingUser._id,
        })
        await existingAccount.save()
      }
      // Cập nhật mảng accounts với ID của Account
      if (!existingUser.accounts.includes(existingAccount._id)) {
        existingUser.accounts.push(existingAccount._id)
      }
      await existingUser.save()
    } else {
      // Nếu người dùng chưa tồn tại, tạo mới người dùng
      const newUser = new User({
        email: user.email,
        name: user.name,
        image: user.image,
        role: 'CLIENT',
        accounts: [],
      })
 
      // Tạo mới tài khoản trong collection Account
      const newAccount = new Account({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: account.type,
        access_token: account.access_token,
        scope: account.scope,
        token_type: account.token_type,
        userId: newUser._id,
      })
      await newAccount.save()
 
      // Thêm ID của Account vào mảng accounts của User
      newUser.accounts.push(newAccount._id)
      await newUser.save()
    }
  } catch (error) {
    console.log("Callback signIn error: ", error)
    return false
  }
 
}