import { getPayload } from "payload";
import config from "@/payload.config";
import { JSX } from "react";

interface TestimonialItem {
    quote: string;
    author: string;
    role?: string;
}

interface TestimonialsBlockData {
    badge?: string;
    title?: string;
    subtitle?: string;
    items?: TestimonialItem[];
}

export default async function Testimonials(): Promise<JSX.Element | null> {
    const payload = await getPayload({ config });

    // Fetch from Payload CMS
    const res = await payload.find({
        collection: "testimonialsBlock",
        limit: 1,
    });

    const data = res.docs[0] as TestimonialsBlockData;

    if (!data) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Top Section */}
                {data.badge && (
                    <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                        {data.badge}
                    </span>
                )}
                {data.title && (
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {data.title}
                    </h2>
                )}
                {data.subtitle && (
                    <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
                        {data.subtitle}
                    </p>
                )}

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {data.items?.map((item: TestimonialItem, index: number) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-lg p-6 text-left shadow-sm relative"
                        >
                            {/* Quote Icon - Fixed syntax */}
                            <div className="absolute top-6 left-6 text-6xl text-blue-200 font-serif leading-none">
                                &ldquo;
                            </div>

                            {/* Quote Text */}
                            <div className="pt-8 mb-4">
                                <p className="text-gray-700 text-base leading-relaxed">
                                    {item.quote}
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className=" border-blue-100 pt-4">
                                <p className="font-bold text-gray-900">{item.author}</p>
                                {item.role && (
                                    <p className="text-sm text-gray-500 mt-1">{item.role}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}