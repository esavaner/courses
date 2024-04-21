import NextImage from 'next/image';

type Props = {
  url: string;
  alt: string;
};

export const ImageContainer = ({ url, alt }: Props) => {
  return (
    <div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
      <NextImage
        height={320}
        width={320}
        alt={alt}
        src={url}
        className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
      />
    </div>
  );
};
