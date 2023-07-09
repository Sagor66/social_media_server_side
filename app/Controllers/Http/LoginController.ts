// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class LoginController {
  public async loggedUser({ request, response }) {
    const loggedUserSchema = schema.create({
      email: schema.string({ trim: true }, [rules.maxLength(255)]),
      password: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: loggedUserSchema });

    // Check if email exists in the database
    const user = await User.findBy('email', payload.email);

    if (!user) {
      return response.status(404).send({ error: 'User not found' });
    }

    // Send the user as the response
    return response.send(user);
  }
}
