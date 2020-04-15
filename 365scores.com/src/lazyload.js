import $ from '@ampify/aQuery';
import delay from '@ampify/toolbox/delay';

export const lazyLoadMenu = async () => {
  //open menu
  const btn = $('.button-component:first').addClass('open-menu-btn');

  btn.click();

  await delay(100);

  //duplicate close menu btn
  btn.clone().toggleClass('open-menu-btn close-menu-btn').insertAfter(btn).hide();
  
  //about
  const btnAbout = $('.drawer-module-component > div > div:last-child').first();
  btnAbout.attr('id', 'about');

  btnAbout.click();

  await delay(250);

  const about = $('.drawer-module-component .drawer-module-component :first-child').first();
  const aboutClone = about.clone().attr('id', 'menu-about').hide();

  aboutClone.appendTo(about.parent());

  //competitions
  const btnCompetitons = $('.drawer-module-component > div > div:nth-child(2)').first();
  btnCompetitons.attr('id', 'competitons');

  btnCompetitons.click();

  await delay(250);

  const competitions = aboutClone.next();
  competitions.attr('id', 'menu-competitions');

  await delay(100);

  btn.click();

  await delay(500);
}

export const lazyLoadHeaderDropdown = async () => {
  const dropdown = $('.dropdown-component:first'); 
  const btn = $('.dropdown-header-component:first');
  
  dropdown.attr('id', 'dropdown-closed');

  btn.click();

  await delay(10);

  const expanded = dropdown.clone();
  
  expanded.attr('id', 'dropdown-opened').hide();

  btn.click();

  await delay(10);

  dropdown.parent().append(expanded);
}

export const lazyLoadFlagsDropdown = async () => {
  const btn = $('.dropdown-header-component > .lang-picker-item-component');
  const langs = btn.parent().parent();

  langs.attr('id', 'lang-closed');

  btn.get(0).scrollIntoView();

  await delay(100);

  btn.click();

  await delay(250);

  const langsClone = langs.clone().attr('id', 'lang-opened').hide();

  btn.click();

  await delay(100);

  //langs menu opened version
  langsClone.insertAfter(langs);

  await delay(10);
}

export const lazyLoadSearch = async () => {
  $('#search-field').wrap('<form />');
}

export const lazyLoadImages = async () => {
  for (const img of $('img[data-src]:not([src])')) { 
    $(img)
      .attr('src', $(img).attr('data-src'))
      .css({ visibility: 'visible' });
  }
}