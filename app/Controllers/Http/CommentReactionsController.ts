// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import CommentReaction from 'App/Models/CommentReaction';

export default class CommentReactionsController {
    public async index({ response }) {
        const reactions = await CommentReaction.all();
        return response.ok(reactions);
      }
    
      public async store({ request, response }) {
        const reactionSchema = schema.create({
          user_id: schema.number(),
          post_id: schema.number(),
          comment_id: schema.number(),
          comment_reaction: schema.string({ trim: true }, [rules.maxLength(255)]),
        });
    
        const payload: any = await request.validate({ schema: reactionSchema });
        let { user_id, post_id, comment_id, comment_reaction } = payload;

        // const reaction: Reaction = await Reaction.create(payload)
    
        let existingReaction: CommentReaction | null = await CommentReaction.query()
          .where('user_id', user_id)
          .where('post_id', post_id)
          .where('comment_id', comment_id)
          .first();
    
        if (existingReaction) {
          existingReaction.comment_reaction === 'like'
            ? (existingReaction.comment_reaction = 'dislike')
            : (existingReaction.comment_reaction = 'like');
    
    
          await existingReaction.save();
    
          return response.ok(existingReaction);
        }
        // } else {
        //   reaction = await Reaction.create(payload)
        // }
    
        const newReaction: CommentReaction = await CommentReaction.create(payload);
        
        return response.ok(newReaction);
    
        // return response.ok(reaction);
      }
    
      public async show({ params, response }) {
        const { id }: { id: Number } = params;
    
        const reaction: any = await CommentReaction.find(id);
        if (!reaction) {
          return response.notFound({ message: 'Comment Reaction not found' });
        }
    
        return response.ok(reaction);
      }
    
      public async update({ request, params, response }) {
        const reactionSchema = schema.create({
            user_id: schema.number(),
            post_id: schema.number(),
            comment_id: schema.number(),
            reaction: schema.string({ trim: true }, [rules.maxLength(255)]),
          });
      
          const payload: any = await request.validate({ schema: reactionSchema });
    
        const { id }: { id: Number } = params;
    
        const reaction: any = await CommentReaction.find(id);
        if (!reaction) {
          return response.notFound({ message: 'Comment Reaction not found' });
        }
    
        reaction.user_id = payload.user_id;
        reaction.post_id = payload.post_id;
        reaction.comment_id = payload.comment_id;
        reaction.reaction = payload.reaction;
    
        await reaction.save();
    
        return response.ok(reaction);
      }
    
      public async destroy({ params, response }) {
        const { id }: { id: Number } = params;
    
        const reaction: any = await CommentReaction.find(id);
    
        if (!reaction) {
          return response.notFound({ message: 'Comment Reaction not found' });
        }
    
        await reaction.delete();
    
        return response.ok({ message: 'Comment Reaction deleted successfully' });
      }
}
