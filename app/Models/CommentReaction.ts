import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CommentReaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number;

  @column()
  public post_id: number;

  @column()
  public comment_id: number;

  @column()
  public comment_reaction: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
