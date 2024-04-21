// import { getCartFromCookies } from '@/api/cart';
import { ActiveLink } from '@/ui/atoms/ActiveLink';
import { SearchBar } from '../molecues/SearchBar';

export const Navbar = async () => {
  // const cart = await getCartFromCookies();
  // const quantity = cart?.orderItems.reduce((acc, val) => acc + val.quantity, 0) ?? 0;

  return (
    <div>
      <nav>
        <ul>
          <li>
            <ActiveLink href="/">Home</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/products">All products</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/categories">Categories</ActiveLink>
          </li>
        </ul>
      </nav>
      <SearchBar />
      <ActiveLink href="/cart">Cart</ActiveLink>
      {/* <ActiveLink href="/cart">Qt: {quantity}</ActiveLink> */}
    </div>
  );
};
