// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UsersController {
  public async index({ response }) {
    const users = await User.all();

    return response.ok(users);
  }

  // public async index( ctx:HttpContextContract ) {
  //   // const users = await User.all();
  //   const users = ctx.auth.use('web').authenticate()
  //   console.log({ ctx: ctx.session })

  //   // return response.ok(users);
  //   return users
  // }

  public async store({ request, response }) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      email: schema.string({ trim: true }, [rules.maxLength(255)]),
      password: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: userSchema });
    const user: User = await User.create(payload);

    return response.ok(user);
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;

    // const user: any = await User.query()
    //   .where('id', id)
    //   .preload('userProfile')
    //   .preload('post')
    //   .withCount('post', (query) => {
    //     query.count('*').as('number_of_posts');
    //   });

    const user: any = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' });
    }

    // const postCount = user.post_count;

    // console.log(postCount)

    // const userWithPostCount = { ...user, postCount }

    return response.ok(user);
  }

  public async update({ request, params, response }) {
    const userSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      email: schema.string({ trim: true }, [rules.maxLength(255)]),
      password: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: userSchema });

    const { id }: { id: Number } = params;

    const user: any = await User.find(id);
    if (!user) {
      return response.notFound({ message: 'User not found' });
    }

    user.name = payload.name;
    user.email = payload.email;
    user.password = payload.password;

    await user.save();

    return response.ok(user);
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;

    const user: any = await User.find(id);

    if (!user) {
      return response.notFound({ message: 'User not found' });
    }

    await user.delete();

    return response.ok({ message: 'User deleted successfully' });
  }
}
