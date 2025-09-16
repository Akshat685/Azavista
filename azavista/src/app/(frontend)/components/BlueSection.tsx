import Link from "next/link";
import type { BlueSection } from "../types";

export default function BlueSection({
  heading,
  description,
  buttonText,
  buttonUrl,
  backgroundColor = "bg-blue-600"
}: BlueSection) {
  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-5xl text-white mb-6 leading-tight">
          {heading}
        </h2>
        <p className="text-lg md:text-xl text-white mb-10 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
        <Link
          href={buttonUrl}
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}