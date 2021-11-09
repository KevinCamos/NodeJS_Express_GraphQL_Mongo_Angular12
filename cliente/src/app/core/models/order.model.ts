import { Product, User } from '.';

export interface Order {
  id: string;
  id_product: Product;
  id_user_seller: User;
  id_user_buyer: User;
  total_price: string;
  valoration: number | boolean;
  buy_date: Date;
}
