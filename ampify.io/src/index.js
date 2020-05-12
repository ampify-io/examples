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

  $('form.elementor-form').form({
    url: `${location.origin}/wp-admin/admin-ajax.php`,
    error: '<div class="elementor-message elementor-message-danger" role="alert">{{#data}}{{message}}{{/data}}</div>',
    fields: [{
      name: 'action',
      value: 'elementor_pro_forms_send_form'
    }]
  });
}

const share = () => {
  $('.elementor-share-btn_facebook').on('click', () => {
    $(window).open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href), '_blank');
  });

  $('.elementor-share-btn_twitter').on('click', () => {
    $(window).open('https://twitter.com/intent/tweet?text=' + location.href, '_blank');
  });

  $('.elementor-share-btn_linkedin').on('click', () => {
    $(window).open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(location.href), '_blank');
  });

  $('.elementor-share-btn_reddit').on('click', () => {
    $(window).open(`https://www.reddit.com/submit?url=${encodeURIComponent(location.href)}&title=${document.title}`, '_blank');
  });
}

const addCss = () => {
  $.injectCss(`
    .elementor-swiper-button {
      display: none !important;
    }

    .elementor-motion-effects-element {
      transform: translateY(0px) !important;
    }

    .elementor-post__thumbnail img {
      width: 144% !important;
    }

    .elementor-sticky {
      width: 100vw !important;
    }
  `);

  //ampify convert form
  $.injectCss(`
    .convert-to-amp form.amp-form-submitting .elementor-field-type-html {
      display: flex !important;
    }

    .convert-to-amp form div[submitting] {
      display: none !important;
    }

    .convert-to-amp form div[submit-success] {
      display: none;
    }
  `);

  $.cssIgnore('.amp-form-submitting');
}

export default async () => {
  await initLazyLoad();

  addCss();
  menu();
  form();
  share();

  return { 
    cssIgnore: $.cssIgnore(),
    debug: {
      minify: true,
      convert: true
    }
  };
};