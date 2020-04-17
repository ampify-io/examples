import $ from '@ampify/aquery';
import initLazyLoad from './lazy';

const menu = () => {
  $('.elementor-menu-toggle').on('click', (e) => {
    $(e.target).toggleClass('elementor-active');
  });
}

const form = () => {
  const modal = $('#elementor-popup-modal-334');
  const close = $('.dialog-lightbox-close-button');

  $('a[href*="#elementor-action"]').on('click', () => {
    modal.show();
  });

  close.on('click', () => {
    modal.hide();
  });

  $('form').form({
    url: 'https://ampify.io/wp-admin/admin-ajax.php',
    success: '{{#data}}{{success}}{{/data}}'
  });
}

export default async () => {
  //aQuery code here
  $.injectCss(`
    .elementor-swiper-button {
      display: none !important;
    }

    .elementor-motion-effects-element {
      transform: translateY(0px) !important;
    }
  `);

  await initLazyLoad();

  menu();
  form();

  return { 
    cssIgnore: $.cssIgnore(),
    debug: {
      minify: false,
      convert: true
    }
  };
};