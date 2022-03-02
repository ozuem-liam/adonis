import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const userSchema = schema.create({
        username: schema.string({ trim: true }, [
          rules.unique({ table: 'users', column: 'username' }),
        ]),
        email: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
        password: schema.string({}, [rules.confirmed()]),
        status: schema.enum(['Admin']),
      })
      const data = await request.validate({ schema: userSchema })
      const user = await User.create(data)
      return response.created(user)
    } catch (error) {
      throw error
    }
  }

  public async login({ request, auth }: HttpContextContract) {
    try {
      const email = request.input('email')
      const password = request.input('password')
      const token = await auth.attempt(email, password)

      return token.toJSON()
    } catch (error) {
      throw error
    }
  }
}
