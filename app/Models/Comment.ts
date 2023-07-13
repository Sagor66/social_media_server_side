import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CommentReaction from './CommentReaction';

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number;

  @column()
  public post_id: number;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasMany(() => CommentReaction, {
    foreignKey: "comment_id"
  })
  public comment_reaction: HasMany<typeof CommentReaction>

  public serializeExtras() {
    return {
      like: this.$extras.like
    }
  }

}
