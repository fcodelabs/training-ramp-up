import User from '../entity/User'
import UserModel, { LoginUserModel } from '../models/userModel'
import DatabaseService from './DatabaseService'
import bcrypt from 'bcrypt'

const checkUserValid = async (userEmail: string) => {
  const founduser = await DatabaseService.getRepository(User).findOneBy({
    email: userEmail
  })
  if (founduser === null) {
    return true
  }
  return false
}

export const getUserService = async (user: LoginUserModel) => {
  try {
    const useremail = user.email
    const founduser: UserModel | null = await DatabaseService.getRepository(User).findOneBy({
      email: useremail
    })

    if (founduser !== null) {
      const pwValid = await bcrypt.compare(user.password, founduser.password)
      if (pwValid) return founduser
      return null
    }
    return null
  } catch (err) {
    return err
  }
}

export const addUserService = async (user: UserModel) => {
  try {
    if (await checkUserValid(user.email)) {
      const salt = await bcrypt.genSalt(10)
      const hashpw = await bcrypt.hash(user.password, salt)

      const newUser = new User()
      newUser.userName = user.userName
      newUser.email = user.email
      newUser.password = hashpw
      newUser.role = user.role
      const result = await DatabaseService.getRepository(User).save(newUser)
      return result
    } else {
      return false
    }
  } catch (err) {
    return err
  }
}
