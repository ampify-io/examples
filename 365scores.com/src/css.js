import $ from '@ampify/aQuery';

export const loadCss = () => {
  $.injectCss(`
    /* menu */
    .menu-active { color: #FFF !important; }
    .menu-inactive { color: #7f97ab !important; }

    /* autocomplete */
    .search-widget-component form,
    .search-widget-component amp-autocomplete {
      width: 100%;
    }

    .autocomplete-item {
      position: relative;
      height: 28px;
      display: flex;
      overflow: hidden;
      align-items: center;
    }

      .autocomplete-item .text-component {
        margin: 0 8px;
      }

    /* ajax list */
    ._1fopc40 {
      margin-bottom: 8px;
    }

    ._1f12olq {
      position: relative;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      border-left: none;
    }

    ._1yrob35 {
      color: rgb(80, 80, 80);
      text-decoration: none;
    }

    ._rmuslo {
      -webkit-box-pack: center;
      height: 17px;
      box-sizing: border-box;
      padding-top: 5px;
      margin-bottom: -5px;
      color: rgb(127, 151, 171);
      font-size: 11px;
      font-weight: 400;
      display: flex;
      direction: ltr;
      justify-content: center;
    }
  `);
}