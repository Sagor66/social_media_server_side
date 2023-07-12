// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from 'App/Models/Comment';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class CommentsController {
  public async index({ response }) {
    const comments = await Comment.all();
    return response.ok(comments);
  }

  public async store({ request, response }) {
    const commentSchema = schema.create({
      user_id: schema.number(),
      post_id: schema.number(),
      description: schema.string({ escape: true }, [rules.maxLength(1000)]),
    });

    const payload: any = await request.validate({ schema: commentSchema });
    const comments: Comment = await Comment.create(payload);

    return response.ok(comments);
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;

    const comments: any = await Comment.find(id);
    // const posts: any = await Post.query().where('id', id).preload('user');
    if (!comments) {
      return response.notFound({ message: 'Comment not found' });
    }

    return response.ok(comments);
  }

  public async update({ request, params, response }) {
    const commentSchema = schema.create({
      user_id: schema.number(),
      post_id: schema.number(),
      description: schema.string({ escape: true }, [rules.maxLength(1000)]),
    });

    const payload: any = await request.validate({ schema: commentSchema });

    const { id }: { id: Number } = params;

    const comments: any = await Comment.find(id);
    if (!comments) {
      return response.notFound({ message: 'Comment not found' });
    }

    comments.user_id = payload.user_id;
    comments.post_id = payload.post_id;
    comments.description = payload.description;

    await comments.save();

    return response.ok(comments);
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;

    const comments: any = await Comment.find(id);

    if (!comments) {
      return response.notFound({ message: 'Comment not found' });
    }

    await comments.delete();

    return response.ok(comments);
  }
}
