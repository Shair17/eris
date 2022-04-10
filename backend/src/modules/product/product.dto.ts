export interface GetProductsDto {}

export interface CreateProductDto {
	name: string;
	price: number;
	stock: number;
	image: string;
}

export interface GetProductByIdDto {
	id: string;
}
