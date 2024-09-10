import mongoose from "mongoose";
let isConnected: boolean =false
export const connectToDB= async (): Promise<void> =>{
  if(isConnected) return
  if(!process.env.MONGODB_URL) return
  try {
    mongoose.connect(process.env.MONGODB_URL,{})
    console.log("Connected to database")
    isConnected =true
  } catch (error) {
    console.log("Connection to db error :", error)
    throw new Error("Can't connect to db")
  }
}