import type { VideoSection, Media } from "../types";

export default function VideoSection(props: VideoSection) {
  const { heading, description1, description2, image } = props;

  const media = image as Media | undefined;
  const imageUrl = media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";

  return (
    <section className="relative bg-[#0d1f91] min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 mb-18">
      {/* Text Content */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-5xl text-white mb-8 leading-tight">
          {heading}
        </h1>

        <p className="text-xl sm:text-2xl lg:text-xl text-white max-w-4xl mx-auto font-normal">
          {description1}
        </p>

        <p className="text-xl sm:text-2xl lg:text-xl text-white max-w-5xl mx-auto font-normal">
          {description2}
        </p>
      </div>

      {/* Visual Section */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="relative aspect-video  rounded-xl overflow-hidden shadow-2xl">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${imageUrl})`,

              }}
            >
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
