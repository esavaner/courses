import Link from 'next/link';

type Props = {
  pageCount: number;
  link: string;
};

export const Pagination = ({ pageCount, link }: Props) => {
  const links = [];
  for (let i = 1; i < pageCount + 1; i++) {
    links.push(
      <li key={i}>
        <Link
          href={`${link}/${i}`}
          className="flex h-7 w-7 items-center justify-center rounded border border-gray-900"
        >
          {i}
        </Link>
      </li>,
    );
  }
  return (
    <ul aria-label="pagination" className="flex justify-center gap-2">
      {links}
    </ul>
  );
};
