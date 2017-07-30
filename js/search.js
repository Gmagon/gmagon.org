/* global instantsearch */

(function(){
var search = instantsearch({
  appId: 'YFVFXQYV4P' || window.AlgoliaConfig.appId,
  apiKey:'ede94096e56eee547284bc9562eb740e' || window.AlgoliaConfig.apiKey,
  indexName: 'gmagon_index' || window.AlgoliaConfig.indexName,
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox-q'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate =
  '<div class="hit media">' +
    '<div class="media-left">' +
      '<div class="media-object" style="background-image: url(\'{{image}}\');"></div>' +
    '</div>' +
    '<div class="media-body">' +
      '<a href={{ permalink }} target="_blank" rel="nofollow me noopener noreferrer" >' +
      '<h4 class="media-heading">{{{_highlightResult.title.value}}} {{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</h4>' +
      '<p class="year">{{year}}</p><p class="genre">{{#genre}}<span class="badge">{{.}}</span> {{/genre}}</p>' +
      '</a>' +
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      console.dir(hit)
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);
/** 
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#genres',
    attributeName: 'genre',
    operator: 'and',
    limit: 10,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.starRating({
    container: '#ratings',
    attributeName: 'rating',
    cssClasses: {
      list: 'nav',
      count: 'badge pull-right'
    }
  })
);

**/
search.start();
})();


