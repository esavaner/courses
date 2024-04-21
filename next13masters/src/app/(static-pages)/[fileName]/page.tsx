import { notFound } from 'next/navigation';
import { type ComponentType } from 'react';

type Props = {
  params: {
    fileName: string;
  };
};

export default async function StaticPage({ params: { fileName } }: Props) {
  const Page = await import(`./${fileName}.mdx`).then(
    (module: { default: ComponentType }) => module.default,
    () => notFound(),
  );
  return (
    <article className="prose prose-lg">
      <Page />
    </article>
  );
}
