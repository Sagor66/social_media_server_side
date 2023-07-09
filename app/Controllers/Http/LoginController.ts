// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';
// import { JwtTokenContract } from '@ioc:Adonis/Addons/Auth'
// import auth from '@ioc:Adonis/Addons/Auth'

export default class LoginController {
  public async loggedUser({ request, response }) {
    const loggedUserSchema = schema.create({
      email: schema.string({ trim: true }, [rules.maxLength(255)]),
      password: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: loggedUserSchema });

    // Check if email exists in the database
    const user = await User.query()
      .where({ email: payload.email, password: payload.password })
      .first();

    if (!user) {
      return response.status(404).send({ error: 'User not found' });
    }

    // console.log({ JSON.parse(JSON) });

    // const token = await auth.use('jwt').attempt(payload.email, payload.password, {
    //     expiresIn: '7 days',
    //   })

    // Send the user as the response
    return response.send(user);
  }
}
