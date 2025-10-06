import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable announcement bar',
      defaultValue: true,
    },
    {
      name: 'message',
      type: 'text',
      label: 'Message',
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      label: 'Allow dismiss',
      defaultValue: true,
    },
  ],
}

export default Header


