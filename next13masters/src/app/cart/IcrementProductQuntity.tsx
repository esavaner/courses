'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import { changeItemQuantity } from './actions';

type Props = {
  quantity: number;
  itemId: string;
};

export const ChangeProductQuantity = ({ quantity, itemId }: Props) => {
  const [opQuantity, setOpQuantity] = useOptimistic(quantity);
  return (
    <form>
      <button
        data-testid="decrement"
        formAction={async () => {
          setOpQuantity(opQuantity - 1);
          await changeItemQuantity(itemId, opQuantity - 1);
        }}
      >
        -
      </button>
      <div data-testid="quantity">{opQuantity}</div>
      <button
        data-testid="increment"
        formAction={async () => {
          setOpQuantity(opQuantity + 1);
          await changeItemQuantity(itemId, opQuantity + 1);
        }}
      >
        +
      </button>
    </form>
  );
};
