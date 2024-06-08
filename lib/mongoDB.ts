import mongoose from "mongoose";
let isConnected: boolean =false
export const connectToDB= async (): Promise<void> =>{
  if(isConnected) return
  
  if(!process.env.MONGODB_URL) return
  try {
    mongoose.connect(process.env.MONGODB_URL)
    isConnected =true
  } catch (error) {
    throw new Error("Can't connect to db")
    console.log(error)
  }
}