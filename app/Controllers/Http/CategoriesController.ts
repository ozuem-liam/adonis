import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from 'App/Models/Category'
import SubCategory from 'App/Models/SubCategory'
import Product from 'App/Models/Product'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const categories = await Category.all()
    if (categories) {
      return response.status(200).json({ data: categories })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const category = await Category.create({
        name: request.input('name'),
        status: request.input('status'),
      })
      return response.status(201).json({ data: category })
    } catch (error) {
      throw error
    }
  }

  public async getOne({ response, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    if (category) {
      return response.status(200).json({ data: category })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    if (category) {
      category.name = request.input('name')
      category.status = request.input('status')
      category.save()
      return response.status(200).json({ data: category })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }

  public async destroy({ params, response }) {
    const category = await Category.findOrFail(params.id)
    if (category) {
      await Product.query().where('productCategoryId', category.id).delete()
      await SubCategory.query().where('productCategoryId', category.id).delete()

      await category.delete()
      return response.status(200).json({ message: 'Deleted successfully' })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }
}
