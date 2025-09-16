import type { IntegratedTool } from "../types";
import Image from "next/image";

export default function IntegratedTool({ heading, items = [] }: IntegratedTool) {
  if (!items || items.length === 0) return null;

  // Function to create rows with proper distribution
  const createRows = (items: any[]) => {
    if (items.length <= 3) {
      return [items]; // Single row for 3 or fewer items
    }
    
    const rows = [];
    
    // If total items is divisible by 3, use 3 items per row
    if (items.length % 3 === 0) {
      for (let i = 0; i < items.length; i += 3) {
        rows.push(items.slice(i, i + 3));
      }
      return rows;
    }
    
    // For 4-5 items: 3 in first row, remaining in second row (centered)
    if (items.length <= 5) {
      const firstRow = items.slice(0, 3); // First 3 items
      const remainingItems = items.slice(3);
      
      rows.push(firstRow);
      if (remainingItems.length > 0) {
        rows.push(remainingItems);
      }
      return rows;
    }
    
    // For more complex cases, try to balance rows
    const firstRow = items.slice(0, 3); // First 3 items
    const remainingItems = items.slice(3);
    
    rows.push(firstRow);
    
    // Split remaining items into rows of 2
    for (let i = 0; i < remainingItems.length; i += 2) {
      rows.push(remainingItems.slice(i, i + 2));
    }
    
    return rows;
  };

  const rows = createRows(items);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {heading && (
          <h2 className="max-w-4xl mx-auto text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-14">
            {heading}
          </h2>
        )}

        <div className="max-w-7xl mx-auto">
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className={`
                flex flex-wrap gap-y-16 gap-x-10 mb-16 last:mb-0
                ${row.length === 1 ? 'justify-center' : ''}
                ${row.length === 2 ? 'justify-center' : ''}
                ${row.length === 3 ? 'justify-center lg:justify-between' : ''}
              `}
            >
              {row.map((item, itemIndex) => {
                const originalIndex = rowIndex === 0 ? itemIndex : 3 + (rowIndex - 1) * 2 + itemIndex;
                const imageUrl =
                  item.image?.cloudinary?.secure_url ||
                  item.image?.url ||
                  item.image?.thumbnailURL ||
                  "";
                const imgWidth = item.image?.cloudinary?.width || 64;
                const imgHeight = item.image?.cloudinary?.height || 64;

                return (
                  <article 
                    key={originalIndex} 
                    className={`
                      text-left flex flex-col
                      ${row.length === 3 ? 'w-full md:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)]' : ''}
                      ${row.length === 2 ? 'w-full md:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)]' : ''}
                      ${row.length === 1 ? 'w-full md:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)]' : ''}
                    `}
                  >
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={item.image?.alt || item.title}
                          width={imgWidth}
                          height={imgHeight}
                          className="object-cover max-w-[64px] h-[64px]"
                        />
                      )}
                    </div>
                    <h3 className="text-[18px] md:text-[22px] leading-[110%] text-start font-medium mb-4 text-[#565656]">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-[#565656] w-full max-w-[322px] text-start mb-0 leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}