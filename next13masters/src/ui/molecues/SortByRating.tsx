'use client';

type Props = {
  handleSort: (value: string) => void;
};

type OptionArray = {
  label: string;
  value?: string;
  testId?: string;
};

export const SortByRating = ({ handleSort }: Props) => {
  const options: OptionArray[] = [
    {
      label: 'Sort by rating',
    },
    {
      value: 'rating_ASC',
      label: 'Rating ascending',
      testId: 'sort-by-rating',
    },
    {
      value: 'rating_DESC',
      label: 'Rating descending',
      testId: 'sort-by-rating',
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
