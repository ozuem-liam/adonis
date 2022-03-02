import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import User from 'App/Models/User'

export default class ProductsController {
  public async index({ params, response }: HttpContextContract) {
    const products = await Product.query().where('userId', params.id)
    if (products) {
      return response.status(200).json({ data: products })
    } else {
      return response.status(500).json({ message: 'Not Found' })
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      const product = await user.related('products').create({
        productCategoryId: request.input('product_category_id'),
        productSubCategoryId: request.input('product_sub_category_id'),
        title: request.input('title'),
        description: request.input('description'),
        address: request.input('address'),
      })
      return response.status(201).json({ data: product })
    } catch (error) {
      throw error
    }
  }

  public async getOne({ response, params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    if (product) {
      return response.status(200).json({ data: product })
    } else {
      return response.status(500).json({ message: 'Not Found' })
    }
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    if (product) {
      if (auth.user?.id !== product.userId) {
        return 'You do not have permission to do this'
      }
      product.title = request.input('title')
      product.description = request.input('description')
      product.address = request.input('address')
      product.save()
      return response.status(200).json({ data: product })
    } else {
      return response.status(500).json({ message: 'Not Found' })
    }
  }

  public async destroy({ params, auth, response }) {
    const product = await Product.findOrFail(params.id)
    if (product) {
      if (auth.user?.id !== product.userId) {
        return 'You do not have permission to do this'
      }

      await product.delete()
      return response.status(200).json({ message: 'Deleted successfully' })
    } else {
      return response.status(500).json({ message: 'Not Found' })
    }
  }
}
