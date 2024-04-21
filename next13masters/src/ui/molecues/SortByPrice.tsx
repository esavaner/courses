'use client';

type Props = {
  handleSort: (value: string) => void;
};

type OptionArray = {
  label: string;
  value?: string;
  testId?: string;
};

export const SortByPrice = ({ handleSort }: Props) => {
  const options: OptionArray[] = [
    {
      label: 'Sort by price',
    },
    {
      value: 'price_ASC',
      label: 'Price ascending',
      testId: 'sort-by-price',
    },
    {
      value: 'price_DESC',
      label: 'Price descending',
      testId: 'sort-by-price',
    },
  ];

  return (
    <select onChange={(e) => handleSort(e.target.value)}>
      {options.map((option) => (
        <option value={option.value} key={option.label} data-testid={option.testId}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
