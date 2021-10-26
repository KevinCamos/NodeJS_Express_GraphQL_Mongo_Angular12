import { Product, User } from '.';

export interface Order {
  id_product: Product;
  id_user_seller: User;
  id_user_buyer: User;
  total_price: string;

  valoration: number;
  buy_date: Date;
}
