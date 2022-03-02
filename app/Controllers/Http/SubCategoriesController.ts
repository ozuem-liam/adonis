import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubCategory from 'App/Models/SubCategory'
import Category from 'App/Models/Category'

export default class SubCategoriesController {
  public async index({ params, response }) {
    const subCategories = await SubCategory.query().where('productCategoryId', params.id)
    if (subCategories) {
      return response.status(200).json({ data: subCategories })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }

  public async store({ params, request, response }: HttpContextContract) {
    try {
      const category = await Category.findOrFail(params.id)
      if (category) {
        const subCategory = await category.related('subCategories').create({
          name: request.input('name'),
          status: request.input('status'),
        })
        return response.status(201).json({ data: subCategory })
      } else {
        return response.status(404).json({ message: 'Not Found' })
      }
    } catch (error) {
      throw error
    }
  }

  public async getOne({ response, params }: HttpContextContract) {
    const subCategory = await SubCategory.findOrFail(params.id)
    if (subCategory) {
      return response.status(200).json({ data: subCategory })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const subCategory = await SubCategory.findOrFail(params.id)
    if (subCategory) {
      subCategory.name = request.input('name')
      subCategory.status = request.input('status')
      subCategory.save()
      return response.status(200).json({ data: subCategory })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }

  public async destroy({ params, response }) {
    const subCategory = await SubCategory.findOrFail(params.id)
    if (subCategory) {
      await subCategory.delete()
      return response.status(200).json({ message: 'Deleted successfully' })
    } else {
      return response.status(404).json({ message: 'Not Found' })
    }
  }
}
