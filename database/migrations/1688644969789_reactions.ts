import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable()
      table.integer('post_id').unsigned().notNullable()
      table.string('reaction', 255)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()

      // table.foreign('user_id').references('id').inTable('users')
      // table.foreign('post_id').references('id').inTable('posts')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
