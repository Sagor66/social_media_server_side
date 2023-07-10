// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class PostsController {
  public async index({ response }) {
    const posts: any = await Post.query().preload('comments').withCount('comments', query => {
      query.count("*").as("number_of_comments")
    })
    return response.ok(posts);
  }

  public async store({ request, response }) {
    const postSchema = schema.create({
      user_id: schema.number(),
      description: schema.string({ escape: true }, [rules.maxLength(1000)]),
    });

    const payload: any = await request.validate({ schema: postSchema });
    const posts: Post = await Post.create(payload);

    return response.ok(posts);
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;

    const posts: any = await Post.query().where('id', id).preload('comments').withCount('comments', query => {
      query.count("*").as("number_of_comments")
    })
    // const posts: any = await Post.find(id);
    // const posts: any = await Post.query().where('id', id).preload('user');
    if (!posts) {
      return response.notFound({ message: 'Post not found' });
    }

    return response.ok(posts);
  }

  public async update({ request, params, response }) {
    const postSchema = schema.create({
      user_id: schema.number(),
      description: schema.string({ escape: true }, [rules.maxLength(1000)]),
    });

    const payload: any = await request.validate({ schema: postSchema });

    console.log({ userId: payload.user_id, description: payload.description })

    const { id }: { id: Number } = params;

    const posts: any = await Post.find(id);
    if (!posts) {
      return response.notFound({ message: 'Post not found' });
    }

    posts.user_id = payload.user_id;
    posts.description = payload.description;
    
    await posts.save();

    return response.ok(posts);
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;

    const posts: any = await Post.find(id);

    if (!posts) {
      return response.notFound({ message: 'Post not found' });
    }

    await posts.delete();

    return response.ok({ message: 'Post deleted successfully' });
  }

}
