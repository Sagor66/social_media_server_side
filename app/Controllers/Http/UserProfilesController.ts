// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserProfile from 'App/Models/UserProfile';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserProfilesController {
  public async index({ response }) {
    const userProfiles = await UserProfile.all();
    return response.ok(userProfiles);
  }

  public async store({ request, response }) {
    const userProfileSchema = schema.create({
      user_id: schema.number(),
      address: schema.string({ trim: true }, [rules.maxLength(255)]),
      gender: schema.string({ trim: true }, [rules.maxLength(255)]),
      nationality: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: userProfileSchema });
    const userProfile: UserProfile = await UserProfile.create(payload);

    return response.ok(userProfile);
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;

    const userProfile: any = await UserProfile.find(id);
    if (!userProfile) {
      return response.notFound({ message: 'User Profile not found' });
    }

    return response.ok(userProfile);
  }

  public async update({ request, params, response }) {
    const userProfileSchema = schema.create({
      user_id: schema.number(),
      address: schema.string({ trim: true }, [rules.maxLength(255)]),
      gender: schema.string({ trim: true }, [rules.maxLength(255)]),
      nationality: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: userProfileSchema });

    const { id }: { id: Number } = params;

    const userProfile: any = await UserProfile.find(id);
    if (!userProfile) {
      return response.notFound({ message: 'User Profile not found' });
    }

    userProfile.user_id = payload.user_id;
    userProfile.address = payload.address;
    userProfile.gender = payload.gender;
    userProfile.nationality = payload.nationality;

    await userProfile.save();

    return response.ok(userProfile);
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;

    const userProfile: any = await UserProfile.find(id);

    if (!userProfile) {
      return response.notFound({ message: 'User Profile not found' });
    }

    await userProfile.delete();

    return response.ok({ message: 'User Profile deleted successfully' });
  }
}
