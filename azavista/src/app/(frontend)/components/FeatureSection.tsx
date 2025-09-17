import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { FeatureSection, CloudinaryImage } from "../types";

export default function FeatureSection(props: FeatureSection) {
  const {
    title,
    heading,
    description,
    cta,
    image,
    imageOnRight = true,
    backgroundVariant = 'none',
  } = props;

  const media = image as CloudinaryImage | undefined;

  const imageUrl =
    media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";

  const width = media?.cloudinary?.width || 600;
  const height = media?.cloudinary?.height || 400;

  const Text = (
    <div className="flex-1 py-16">
      {title && <div className="text-gray-600 text-xl font-semibold mb-4">{title}</div>}
      <h2 className="text-4xl md:text-5xl tracking-tight text-gray-900 mb-6">{heading}</h2>
      {description && (
        <div className="text-lg text-gray-600 mb-10 leading-relaxed max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_li::marker]:text-[#1e61f0]">
          <RichText data={description} />
        </div>
      )}
      {cta?.label && cta?.url && (
        <Link
          href={cta.url}
          className={
            cta.variant === 'secondary'
              ? 'inline-flex items-center px-6 py-3 border border-blue-300 text-blue-700 rounded-full hover:bg-gray-100'
              : 'inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700'
          }
        >
          {cta.label}
        </Link>
      )}
    </div>
  );

  const Visual = (
    <div className="">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={media?.alt || heading || "Feature image"}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      )}
    </div>
  );

  const sectionBgClass = backgroundVariant === 'light' ? 'bg-gray-200' : '';

  return (
    <section className={`py-8 md:py-16 ${sectionBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {imageOnRight ? <>
          {Text}
          {Visual}
        </> : <>
          {Visual}
          {Text}
        </>}
      </div>
    </section>
  );
}


