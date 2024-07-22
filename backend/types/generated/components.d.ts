import type { Schema, Attribute } from '@strapi/strapi';

export interface LayoutNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    url: Attribute.String;
    text: Attribute.String;
  };
}

export interface LayoutHeaderLogo extends Schema.Component {
  collectionName: 'components_layout_header_logos';
  info: {
    displayName: 'LogoImg';
    description: '';
  };
  attributes: {
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    links: Attribute.Component<'layout.navbar', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.navbar': LayoutNavbar;
      'layout.header-logo': LayoutHeaderLogo;
    }
  }
}
