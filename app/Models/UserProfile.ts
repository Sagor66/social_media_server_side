import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number;

  @column()
  public address: string;

  @column()
  public gender: string;

  @column()
  public nationality: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
