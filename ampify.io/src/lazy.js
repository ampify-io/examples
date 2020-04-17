import $ from '@ampify/aquery';

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export default async () => {
  console.log('lazylo ad');
  $('a[href*="#elementor-action"]').first().get(0).click();
  
  await delay(100);

  const form = $('#elementor-popup-modal-334');

  console.log(form.get(0));

  form.clone().hide().insertAfter(form);
  form.remove();
}