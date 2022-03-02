import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'
import SubCategory from './SubCategory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public productCategoryId: number

  @column()
  public productSubCategoryId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public address: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Category, {
    localKey: 'productCategoryId',
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => SubCategory)
  public subCategory: BelongsTo<typeof SubCategory>

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toFormat('yyyy LLL dd'),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => value.toFormat('yyyy LLL dd'),
  })
  public updatedAt: DateTime
}
