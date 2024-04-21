'use client';

import { useState } from 'react';

export const ProductCouner = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button className="border border-slate-200 px-4" onClick={() => setCount((c) => c - 1)}>
        -
      </button>
      <input readOnly value={count} className="border border-slate-200" />
      <button className="border border-slate-200 px-4" onClick={() => setCount((c) => c + 1)}>
        +
      </button>
    </div>
  );
};
