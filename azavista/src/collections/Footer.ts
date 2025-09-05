import { CollectionConfig } from 'payload';

export const Footer: CollectionConfig = {
  slug: 'footer',
  labels: { singular: 'Footer', plural: 'Footers' },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'headquarters',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'groupTitle', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
    },
  ],
};
