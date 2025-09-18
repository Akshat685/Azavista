import Image from "next/image";
import type { GalleryMarqueeData, Media } from "../types";

export default function GalleryMarquee(props: GalleryMarqueeData) {
  const { images = [] } = props;

  const mediaItems: (Media | number | undefined)[] = images.map((i) => i.image);

  const resolveUrl = (m?: Media | number) => {
    const media = m as Media | undefined;
    return (
      media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || ""
    );
  };

  // Duplicate the list to enable seamless loop
  const loopItems = [...mediaItems, ...mediaItems];

  return (
    <section className="w-full py-8">
      <div className="relative overflow-hidden h-[250px]">
        <div className="flex items-center gap-6 w-max animate-marquee" style={{ animationDuration: '25s' }}>
          {loopItems.map((img, idx) => {
            const url = resolveUrl(img);
            if (!url) return null;
            return (
              <div key={idx} className="flex-shrink-0 relative h-[250px]">
                <Image
                  src={url}
                  alt="gallery image"
                  width={200}
                  height={250}
                  className="w-[357px] h-[270px] object-cover rounded-md"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


