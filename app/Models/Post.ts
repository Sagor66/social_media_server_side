import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment';
import Reaction from './Reaction';
import CommentReaction from './CommentReaction';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Comment, {
    foreignKey: "post_id"
  })
  public comments: HasMany<typeof Comment>

  @hasMany(() => Reaction, {
    foreignKey: "post_id"
  })
  public reactions: HasMany<typeof Reaction>

  @hasMany(() => CommentReaction, {
    foreignKey: "comment_id"
  })
  public comment_reaction: HasMany<typeof CommentReaction>

  // public total_likes: HasMany<typeof Reaction>

  public serializeExtras() {
    return {
      number_of_comments: this.$extras.number_of_comments,
      number_of_reactions: this.$extras.number_of_reactions,
      like: this.$extras.like,
      comment_like: this.$extras.comment_like
    }
  }
}
