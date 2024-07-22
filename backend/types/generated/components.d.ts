import type { Schema, Attribute } from '@strapi/strapi';

export interface LayoutHeaderLogo extends Schema.Component {
  collectionName: 'components_layout_header_logos';
  info: {
    displayName: 'HeaderLogo';
    description: '';
  };
  attributes: {
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.header-logo': LayoutHeaderLogo;
    }
  }
}
