import Image from "next/image";
import { ContactBlockData, CloudinaryImage, LogoItem } from "../types";


export default function ContactBlock(block: ContactBlockData) {


  const logos: LogoItem[] = block.logos || [];

  return (
    <div className="min-h-screen bg-gray-50 mt-[50px] mb-14 ">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-12 min-h-screen mx-auto">
          <div className="bg-white p-8 lg:p-12 xl:p-13 flex flex-col justify-center lg:col-span-4 border border-gray-200 rounded-xl">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-xl font-medium text-gray-900 mb-2">{block?.leftTitle}</h1>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">{block?.leftDescription}</p>

              <form className="space-y-4">
                <div>
                  <input type="email" placeholder={block.emailPlaceholder} className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={block.firstNamePlaceholder} className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm" />
                  <input type="text" placeholder={block.lastNamePlaceholder} className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm" />
                </div>
                <div>
                  <input type="text" placeholder={block.companyPlaceholder} className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm" />
                </div>
                <div>
                  <select className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm appearance-none">
                    <option value="">{block.countryLabel}</option>
                    {block.countryOptions?.map((o, i) => (
                      <option key={i} value={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{block.topicLabel}</label>
                  <select className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm appearance-none">
                    <option value="">Select...</option>
                    {block.topicOptions?.map((o, i) => (
                      <option key={i} value={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{block.planningLabel}</label>
                  <select className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm appearance-none">
                    <option value="">Select...</option>
                    {block.planningOptions?.map((o, i) => (
                      <option key={i} value={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3 pt-4">
                  <label className="flex items-start gap-3 text-xs text-gray-600">
                    <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    <span className="leading-relaxed">{block.consentNewsText}</span>
                  </label>
                  <label className="flex items-start gap-3 text-xs text-gray-600">
                    <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    <span className="leading-relaxed">{block.consentPrivacyText} <a href={block.privacyUrl} className="text-blue-600 underline hover:text-blue-700">Privacy Policy</a>.</span>
                  </label>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200 mt-6">{block.submitLabel}</button>
              </form>
            </div>
          </div>


          {/* right section */}
          <div className="bg-gray-50 ml-12 flex justify-center lg:col-span-8">
            <div className="max-w-xxl">
              <h1 className="text-4xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-8">{block.rightHeading}</h1>
              <div className="space-y-6 mb-12">
                {block.features?.map((f, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-lg font-bold text-[#565656]">{f.title}</h3>
                    <p className="text-gray-600 text-md leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl text-gray-900 mb-8">{block.trustHeading}</h1>
                {logos && logos.length > 0 && (
                  <div className="grid grid-cols-3 gap-12 items-center">
                    {logos.map((logo, i) => (
                      <div key={i} className="h-12 flex items-center justify-center transition-opacity">
                        {logo.logo?.cloudinary?.secure_url || logo.logo?.url ? (
                          <Image src={logo.logo?.cloudinary?.secure_url || logo.logo?.url || ""} alt={logo.alt || "logo"} width={150} height={42} className="h-12 w-auto " />
                        ) : (
                          <div className="text-xs font-medium px-3 py-1 border border-gray-300 rounded text-gray-500">{logo.alt || "Logo"}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


