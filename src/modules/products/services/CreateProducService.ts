import { getCustomRepository } from "typeorm";
import { ProductRepository } from "@shared/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
  name: string,
  price: number,
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product>{
    const productsRespository = getCustomRepository(ProductRepository);
    const productExicts = await productsRespository.findByName(name);

    if (productExicts) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRespository.create({
      name,
      price,
      quantity
    });

    await productsRespository.save(product);

    return product;
  }
}

export default CreateProductService;
