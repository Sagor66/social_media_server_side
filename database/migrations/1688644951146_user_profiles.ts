import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable()
      table.string('address', 255)
      table.string('gender', 255)
      table.string('nationality', 255)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()

      // table.foreign('user_id').references('id').inTable('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
