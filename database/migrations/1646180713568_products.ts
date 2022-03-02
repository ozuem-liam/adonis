import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.integer('product_category_id')
      table
        .integer('product_sub_category_id')
        .unsigned()
        .references('sub_categories.id')
        .onDelete('CASCADE')
      table.string('title')
      table.string('description')
      table.string('address')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
