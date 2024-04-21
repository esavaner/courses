import { redirect } from 'next/navigation';

import { ChangeProductQuantity } from './IcrementProductQuntity';
import { getCartFromCookies } from '@/api/cart';
import { formatPrice } from '@/utils';
import { RemoveButton } from './RemoveProduct';
import { handlePayment } from './actions';

export default async function CartPage() {
  const cart = await getCartFromCookies();

  if (!cart) {
    redirect('/');
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.orderItems.map(
            (item) =>
              item.product && (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>
                    <ChangeProductQuantity quantity={item.quantity} itemId={item.id} />
                  </td>
                  <td>{formatPrice(item.product.price)}</td>
                  <td>
                    <RemoveButton itemId={item.id} />
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>
      <form>
        <button type="submit" formAction={handlePayment}>
          Checkout
        </button>
      </form>
    </div>
  );
}
