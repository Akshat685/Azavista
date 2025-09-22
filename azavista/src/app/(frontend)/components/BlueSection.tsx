import Link from "next/link";
import type { BlueSection } from "../types";

export default function BlueSection({
  heading,
  description,
  buttonText,
  buttonUrl,
  backgroundColor = "bg-blue-600"
}: BlueSection) {
  // Determine text color and background styling based on selection
  const isGray = backgroundColor === "bg-gray-600";
  const textColor = isGray ? "text-black" : "text-white";
  const buttonColor = isGray ? "text-white" : "text-blue-600";
  const buttonBg = isGray ? "bg-blue-600" : "bg-white";
  const sectionBg = isGray ? "bg-gray-200" : backgroundColor; // Override to light gray for gray option
  const hoverClass = isGray ? "hover:bg-blue-800" : "hover:bg-gray-200";
  
  return (
    <section className={`py-20 mt-15 ${sectionBg}` } >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-3xl md:text-5xl lg:text-5xl ${textColor} mb-6 leading-tight`}>
          {heading}
        </h2>
        <p className={`text-lg md:text-xl ${textColor} mb-10 max-w-3xl mx-auto leading-relaxed`}>
          {description}
        </p>
        <Link
          href={buttonUrl}
          className={`inline-block ${buttonBg} ${buttonColor} ${hoverClass} px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg`}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}