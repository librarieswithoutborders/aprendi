export const resourceTypeOptions = [
  {
    label: 'Video',
    value: 'video',
    icon: 'video'
  },
  {
    label: 'PDF',
    value: 'pdf',
    icon: 'document'
  },
  {
    label: 'Image',
    value: 'image',
    icon: 'image'
  },
  {
    label: 'Text Entry',
    value: 'rich_text',
    icon: 'text'
  },
  {
    label: 'External Website',
    value: 'website',
    icon: 'website'
  },
  {
    label: 'Embed',
    value: 'embed',
    icon: 'embed'
  }
]


export const richTextToolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'}
  ],
  BLOCK_TYPE_DROPDOWN: [
    {label: 'Normal', style: 'unstyled'},
    {label: 'Heading', style: 'header'}
  ],
  BLOCK_TYPE_BUTTONS: [
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'}
  ]
}

export const videoProviderOptions = [
  {
    label: 'YouTube',
    value: 'youtube'
  },
  {
    label: 'Vimeo',
    value: 'vimeo'
  }
]
