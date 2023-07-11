
// import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import { hasOne } from '@ioc:Adonis/Lucid/Orm'
import UserProfile from './UserProfile'
import Reaction from './Reaction'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public remember_me_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @beforeSave()
  // public static async hashPassword(user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await Hash.make(user.password)
  //   }
  // }

  @hasOne(() => UserProfile, {
    foreignKey: "user_id"
  })
  public userProfiles: HasOne<typeof UserProfile>

  @hasMany(() => Post, {
    foreignKey: "user_id"
  })
  public post: HasMany<typeof Post>
  
  @hasMany(() => Reaction, {
    foreignKey: "user_id"
  })
  public reactions: HasMany<typeof Reaction>
  

  public serializeExtras() {
    return {
      number_of_posts: this.$extras.number_of_posts
    }
  }
}
