import User from '../entity/User'
import UserModel from '../models/userModel'
import DatabaseService from './DatabaseService'

DatabaseService.initialize().then(() => {
  console.log('Data Source has been initialized!')
})
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

export const getUserService = async (user: UserModel) => {
  try {
    const useremail = user.email
    const userpassword = user.password
    const founduser = await DatabaseService.getRepository(User).findOneBy({
      email: useremail,
      password: userpassword
    })
    if (founduser !== null) {
      return founduser
    }
  } catch (err) {
    return err
  }
}

export const addUserService = async (user: UserModel) => {
  try {
    const newUser = new User()
    newUser.userName = user.userName
    newUser.email = user.email
    newUser.password = user.password
    newUser.role = user.role
    const result = await DatabaseService.getRepository(User).save(newUser)
    return result
  } catch (err) {
    return err
  }
}
