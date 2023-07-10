import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment';

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

  public serializeExtras() {
    return {
      number_of_comments: this.$extras.number_of_comments
    }
  }
}
