import $ from '@ampify/aQuery';
import { lazyLoadMenu, lazyLoadSearch, lazyLoadHeaderDropdown, lazyLoadFlagsDropdown, lazyLoadImages } from './lazyload';
import { loadCss } from './css';

//const base = '//localhost:10300';
const base = 'https://proxy.ampify.io';
//const base = 'https://proxy.staging.ampify.io';

const json = {
  'autocomplete': base + '/scores365/autocomplete',
  'games': base + '/scores365/games'
};

const langIds = {"he":"2","en-us":"9","en-uk":"10","it":"12","es":"14","fr":"15","de":"16","ru":"21","ar":"27","es-mx":"29","pt":"30","pt-br":"31","tr":"33","id":"34","pl":"35","nl":"37","da":"42","jp":"57","th":"88","zh":"141","fa":"158","de-at":"193","fi":"194","no":"195","ms":"196","nl-be":"197","sv":"198","zh-tw":"199","fil-ph":"209","hi":"216","vi":"210","mm":"219","lo":"217"};

const getLangId = () => {
  const rx = new RegExp(`^\\/(${Object.keys(langIds).join('|')})\\/`);

  if (rx.test(location.pathname) && langIds[RegExp.$1]) {
    return langIds[RegExp.$1];
  }

  return 1;
}

const getBaseUrl = () => {
  return location.origin + location.pathname.replace(/\/league\/.*/, '');
}

const getRequest = () => {
  if (/\/league\/\d+\/results/.test(location.pathname)) return 'web/games/results';
  if (/\/league\/\d+\/fixtures/.test(location.pathname)) return 'web/games/fixtures';
  
  return 'web/games/current';
}

const getLeageId = () => {
  return /\/league\/(\d+)/.test(location.pathname) && RegExp.$1;
}

const initMenu = () => {
  const btnOpen = $('.open-menu-btn');
  const btnClose = $('.close-menu-btn');
  const btnCompetitons = $('#competitons');
  const btnAbout = $('#about');
  const menu = $('.drawer-module-component:first').parent();
  const menuAbout = $('#menu-about');
  const menuCompetitons = $('#menu-competitions');
  const dir = $('div[data-365-scores-settings]').attr('dir');

  btnOpen.on('click', () => {
    dir === 'rtl' ? menu.slideToggle({ direction: 'left' }) : menu.slideToggle({ direction: 'right' });
    
    btnOpen.hide();
    btnClose.show();
    $(':root').addClass('menu-open');
  });

  btnClose.on('click', () => {
    dir === 'rtl' ? menu.slideToggle({ direction: 'left' }) : menu.slideToggle({ direction: 'right' });
    
    btnOpen.show();
    btnClose.hide();
    $(':root').removeClass('menu-open');
  });

  btnAbout.on('click', () => {
    btnCompetitons.removeClass('menu-active').addClass('menu-inactive');
    
    menuAbout.show();
    menuCompetitons.hide();

    btnAbout.removeClass('menu-inactive').addClass('menu-active');
  });

  btnCompetitons.on('click', () => {
    btnCompetitons.removeClass('menu-inactive').addClass('menu-active');

    menuAbout.hide();
    menuCompetitons.show();

    btnAbout.removeClass('menu-active').addClass('menu-inactive');
  });
}

const initNotSupported = () => {
  //hide add to favorites star + settings button + outbarin (for now)
  $('#competitons + div, img[src*="star-unactive"], #outbrain-placeholder').remove();
  
  //remove gdpr bottom message (no cookies at amp version at the moment)
  $('.gdpr-small-view').parent().remove();
}

const initHeaderDropdown = async () => {
  const dropdownOpened = $('#dropdown-opened'); 
  const dropdownClosed = $('#dropdown-closed'); 
  
  const btnOpen = dropdownClosed.find('.dropdown-header-component');
  const btnClose = dropdownOpened.find('.dropdown-header-component');

  const open = () => {
    dropdownClosed.hide();
    dropdownOpened.show();
  };

  const close = () => {
    dropdownClosed.show();
    dropdownOpened.hide();
  }

  btnOpen.on('click', open);
  btnClose.on('click', close);
}

const initFlagsDropdown = () => {
  const btnOpen = $('#lang-closed .dropdown-header-component .lang-picker-item-component');
  const btnClose = $('#lang-opened .dropdown-header-component .lang-picker-item-component');

  btnOpen.on('click', () => {
    $('#lang-closed').hide();
    $('#lang-opened').show();
  });

  btnClose.on('click', () => {
    $('#lang-closed').show();
    $('#lang-opened').hide();
  });
}

const initSearchAutoComplete = () => {
  const url = json.autocomplete +'/?url=' + encodeURIComponent(`web/competitions?langId=${getLangId()}&timezoneName=TIMEZONE_CODE&userCountryId=-1&appTypeId=5&sports=1`);
  const inp = document.querySelector('#search-field');
  const template = `
    <div class="autocomplete-item" data-value="https://${location.hostname}/{{sportId}}/{{countryId}}/{{nameForURL}}/league/{{id}}">
      <img width="20" height="20" src="https://imagecache.365scores.com/image/upload/f_auto,w_60,h_60,c_limit,q_auto:eco,d_Countries:Round:4.png/Competitions/Light/{{id}}">
      <div class="text-component">{{name}}</div>
    </div>`;

  $(inp).autocomplete({
    source: url,
    minLength: 3,
    template,
    select: function(e) {
      $(window).open(e.value);
    }
  });
}

const initGames = () => {
  const url = json.games + `/?langId=${getLangId()}&url=` + encodeURIComponent(`${getRequest()}?langId=${getLangId()}&timezoneName=TIMEZONE_CODE&userCountryId=-1&appTypeId=5&competitions=${getLeageId()}`);
  const container = $('.competition-scores-widget-group-matches-component').first().parent();
  
  const template = `
    <div class="competition-scores-widget-group-matches-component _1fopc40">
      <div style="display: flex; justify-content: space-between; margin: 1px 0px; flex: 1 1 0%; background-color: white; height: 36px;">
        <div style="flex: 1 1 0%; display: flex; align-items: center; margin-left: 16px; font-size: 14px; font-weight: 400;"></div>
        <div style="flex: 1 1 0%; display: flex; align-items: center; margin: 0px 8px; justify-content: flex-end; font-size: 12px; font-weight: 400;">{{date}}</div>
      </div>
      
      {{#games}}
      <div class="component _1f12olq">
        <a class="_1yrob35 game-card  game-card-small-view" href="${getBaseUrl()}/game/{{#homeCompetitor}}{{nameForURL}}{{/homeCompetitor}}-{{#awayCompetitor}}{{nameForURL}}{{/awayCompetitor}}/{{id}}">
          <div class="component _rmuslo ">
            <div class="game-card-status-badge">{{displayStatus}}</div>
          </div>
          <div class="game-card-content">
            
            {{#homeCompetitor}}
            <div class="game-card-competitor-container">
              <div class="game-card-competitor-logo-wrap"><img class="game-card-competitor-logo" width="24" height="24" style="visibility: visible;" src="https://imagecache.365scores.com/image/upload/f_auto,w_72,h_72,c_limit,q_auto:eco,d_Competitors:default1.png/Competitors/{{id}}"><img class="game-card-competitor-logo hide hide" style="visibility: visible;" src="https://res.365scores.com/static/media/scores-placeholder.933f095e.svg"></div>
              <div class="ellipsis game-card-competitor-qualified-name text-component {{#isQualified}}game-card-competitor-qualified-name-qualified{{/isQualified}}">
                {{#shortName}}{{shortName}}{{/shortName}}
                {{^shortName}}{{name}}{{/shortName}}
              </div>
              {{#redCards}}
              <div class="game-card-red-cards game-card-red-cards-home">
                <div class="game-card-red-cards-label game-card-red-cards-label-home"></div>
              </div>
              {{/redCards}}
            </div>
            {{/homeCompetitor}}
            
            <div class="game-card-content-score">
              {{#isEnded}}
                {{#homeCompetitor}}{{score}}{{/homeCompetitor}} - {{#awayCompetitor}}{{score}}{{/awayCompetitor}}
              {{/isEnded}}
              {{^isEnded}}
                {{time}}
              {{/isEnded}}
            </div>
            
            {{#awayCompetitor}}
            <div class="game-card-competitor-container game-card-competitor-container-away">
              <div class="game-card-competitor-logo-wrap"><img class="game-card-competitor-logo" width="24" height="24" style="visibility: visible;" src="https://imagecache.365scores.com/image/upload/f_auto,w_72,h_72,c_limit,q_auto:eco,d_Competitors:default1.png/Competitors/{{id}}"><img class="game-card-competitor-logo hide hide" style="visibility: visible;" src="https://res.365scores.com/static/media/scores-placeholder.933f095e.svg"></div>
              <div class="ellipsis game-card-competitor-qualified-name text-component {{#isQualified}}game-card-competitor-qualified-name-qualified{{/isQualified}}">
                {{#shortName}}{{shortName}}{{/shortName}}
                {{^shortName}}{{name}}{{/shortName}}
              </div>
              {{#redCards}}
              <div class="game-card-red-cards game-card-red-cards-away">
                <div class="game-card-red-cards-label game-card-red-cards-label-away"></div>
              </div>
              {{/redCards}}
            </div>
            {{/awayCompetitor}}
            
          </div>
        </a>
      </div>
      {{/games}}

    </div>
  `;

  //remove spinner, ajax list have its own
  container.next().find('.sk-circle').parent().remove();

  container.ajaxList({
    url,
    template,
    height: 600,
    infinite: true
  });
}

export default async () => {
  document.body.setAttribute('data-ampify-plugin-verion', 'v3.3');

  loadCss();

  await lazyLoadMenu();
  await lazyLoadSearch();
  await lazyLoadHeaderDropdown();
  await lazyLoadFlagsDropdown();
  await lazyLoadImages();

  initHeaderDropdown();
  initFlagsDropdown();
  initGames();
  initMenu();
  initNotSupported();
  initSearchAutoComplete();

  return { cssIgnore: $.cssIgnore() };
};