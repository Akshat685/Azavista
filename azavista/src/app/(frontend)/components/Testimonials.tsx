import { TestimonialsBlockData } from "../types"; 

export default function TestimonialsBlock(props: TestimonialsBlockData) {
  const { badge, title, subtitle, items } = props;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {badge && (
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {badge}
          </span>
        )}
        {title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items?.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 text-left shadow-sm relative"
            >
              <div className="absolute top-6 left-6 text-6xl text-blue-200 font-serif leading-none">
                &ldquo;
              </div>
              <div className="pt-8 mb-4">
                <p className="text-gray-700 text-base leading-relaxed">
                  {item.quote}
                </p>
              </div>
              <div className="pt-4">
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