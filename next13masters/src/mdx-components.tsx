import { type MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => <h1 style={{ fontSize: '100px' }}>{children}</h1>,
  };
}
