import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true, // Public access for frontend
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary URL will be populated automatically',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // 🔧 FIXED: Return Cloudinary secure_url instead of local path
            if (siblingData?.cloudinary?.secure_url) {
              return siblingData.cloudinary.secure_url;
            }
            return siblingData?.url || null;
          },
        ],
      },
    },
    {
      name: 'cloudinaryId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary public ID',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return siblingData?.cloudinary?.public_id || null;
          },
        ],
      },
    },
  ],
}