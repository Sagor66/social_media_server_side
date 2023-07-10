// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Reaction from 'App/Models/Reaction';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ReactionsController {
  public async index({ response }) {
    const reactions = await Reaction.all();
    return response.ok(reactions);
  }

  public async store({ request, response }) {
    const reactionSchema = schema.create({
      user_id: schema.number(),
      post_id: schema.number(),
      reaction: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: reactionSchema });
    let { user_id, post_id, reaction } = payload;
    // const reaction: Reaction = await Reaction.create(payload)

    let existingReaction: Reaction | null = await Reaction.query()
      .where('user_id', user_id)
      .where('post_id', post_id)
      .first();

    if (existingReaction) {
      existingReaction.reaction === 'like'
        ? (existingReaction.reaction = 'dislike')
        : (existingReaction.reaction = 'like');

      console.log(existingReaction);

      await existingReaction.save();

      return response.ok(existingReaction);
    }
    // } else {
    //   reaction = await Reaction.create(payload)
    // }

    const newReaction: Reaction = await Reaction.create(payload);
    
    return response.ok(newReaction);

    // return response.ok(reaction);
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;

    const reaction: any = await Reaction.find(id);
    if (!reaction) {
      return response.notFound({ message: 'User Reaction not found' });
    }

    return response.ok(reaction);
  }

  public async update({ request, params, response }) {
    const reactionSchema = schema.create({
      user_id: schema.number(),
      post_id: schema.number(),
      reaction: schema.string({ trim: true }, [rules.maxLength(255)]),
    });

    const payload: any = await request.validate({ schema: reactionSchema });

    const { id }: { id: Number } = params;

    const reaction: any = await Reaction.find(id);
    if (!reaction) {
      return response.notFound({ message: 'User Reaction not found' });
    }

    reaction.user_id = payload.user_id;
    reaction.post_id = payload.post_id;
    reaction.reaction = payload.reaction;

    await reaction.save();

    return response.ok(reaction);
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;

    const reaction: any = await Reaction.find(id);

    if (!reaction) {
      return response.notFound({ message: 'User Reaction not found' });
    }

    await reaction.delete();

    return response.ok({ message: 'User Reaction deleted successfully' });
  }
}
