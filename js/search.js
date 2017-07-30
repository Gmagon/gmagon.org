/* global instantsearch */

(function(){
var search = instantsearch({
  appId: window.AlgoliaConfig.appId,
  apiKey: window.AlgoliaConfig.apiKey,
  indexName: window.AlgoliaConfig.indexName,
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
      '</a>'
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

 /**
  * 
author:"Gmagon Inc"
categories:[]
content:"<p>The downloader installs a banking Trojan into your PC the moment your mouse pointer hovers over it.</p>↵<p><img src="https://o.aolcdn.com/images/dims?quality=100&amp;image_uri=http%3A%2F%2Fo.aolcdn.com%2Fdims-shared%2Fdims3%2FGLOB%2Fcrop%2F5656x3744%2B0%2B0%2Fresize%2F1600x1059%21%2Fformat%2Fjpg%2Fquality%2F85%2Fhttp%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F2938118e33f0e37c828171941a41d88e%2F205362959%2Finternet-virus-picture-id101377891&amp;client=cbc79c14efcebee57402&amp;signature=27a09c8410ec298ef3e9f9ca4a72ca9a8b061f6a" alt=""></p>↵<p>Joerg Habermeier via Getty Images</p>↵<p>You think you’re safe from malware since you never click suspicious-looking links, then somebody finds a way to infect your PC anyway. Security researchers have<a href="http://blog.trendmicro.com/trendlabs-security-intelligence/mouseover-otlard-gootkit/" target="_blank" rel="external">discovered</a>that cybercriminals have recently started using a malware downloader that installs a<a href="https://www.engadget.com/2013/04/16/watch-out-most-game-hacks-are-actually-malware/" target="_blank" rel="external">banking Trojan</a>to your computer even if you don’t click anything. All it takes to trigger the download is to hover your mouse pointer over a hyperlink in a carrier PowerPoint file.</p>↵<p>According to researchers from Trend Micro and<a href="https://www.dodgethissecurity.com/2017/06/02/new-powerpoint-mouseover-based-downloader-analysis-results/" target="_blank" rel="external">Dodge This Security</a>the technique was used by a recent spam email campaign targeting companies and organizations in Europe, the Middle East and Africa. The emails’ subjects were mostly finance-related, such as “Invoice” and “Order #,” with an attached PowerPoint presentation.</p>↵<p><img src="https://s.aolcdn.com/hss/storage/midas/cb4d93a4905500a6e4fdaa2847e1ae8d/205363154/powerpoint-downloader02.jpg" alt=""></p>↵<p>[Image credit: Trend Micro]</p>↵<p>The PowerPoint file has a single hyperlink in the center that says “Loading… please wait” that has an embedded malicious PowerShell script. When you hover your mouse pointer over the link, it executes the script. If you’re running a newer version of Microsoft Office, though, you’ll still need to approve the malware’s download before it infects your PC.</p>↵<p>That’s because the more modern versions of the suite has Protected View, which will show a prompt warning you about a “potential security concern” when the script starts running. Just click Disable, and you’ll be fine. However, older versions of the suite don’t have that extra layer of security. The downloader can install a Trojan virus into your system to steal your credentials and bank account information the moment your mouse pointer hovers over the link.</p>↵<p><img src="https://s.aolcdn.com/hss/storage/midas/1530e0c39e52788a796980e61b13f057/205363172/powerpoint-downloader01.jpg" alt=""></p>↵<p>[Image credit: Trend Micro]</p>↵<p>The good news is that the spam emails died down back on May 29th after peaking on the 25th with 1,444 detections by Trend Micro. Still, it’s better to steer clear of similar emails, since it’s always possible that the campaign in May was just a test run for a bigger one.</p>↵<p>Via:</p>↵<p><a href="https://arstechnica.com/security/2017/06/malicious-powerpoint-files-can-infect-targets-when-hovering-over-hyperlinks/" target="_blank" rel="external">Ars Technica</a></p>↵<p>Source:</p>↵<p><a href="http://blog.trendmicro.com/trendlabs-security-intelligence/mouseover-otlard-gootkit/" target="_blank" rel="external">Trend Micro</a>,</p>↵<p><a href="https://www.dodgethissecurity.com/2017/06/02/new-powerpoint-mouseover-based-downloader-analysis-results/" target="_blank" rel="external">Dodge This Security</a></p>↵"
date:"2017-06-12T00:00:00.000Z"
date_as_int:
1497225600
excerpt:""
objectID:"d81f6380b08b499b201c6525244ad6e722a4772e"
permalink:"https://gmagon.com/blog/2017/06/12/malware-downloader-infects-your-pc-without-a-mouse-click/"
slug:"malware-downloader-infects-your-pc-without-a-mouse-click"
stars:(5) [false, false, false, false, false]
tags:[]
title:"Malware downloader infects your PC without a mouse click"
__hitIndex:14
_highlightResult:{title: {…}, date: {…}, slug: {…}, content: {…}, excerpt: {…}, …}
__proto__:Object
  */ 
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


