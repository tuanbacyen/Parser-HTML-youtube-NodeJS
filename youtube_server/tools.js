var Duration = require('js-joda').Duration;

var getMultiLinkImages = function(url) {

  var url = url.substring(0, url.lastIndexOf("/"));
  var data = {
    "default": {
      "url": url + "/default.jpg",
      "width": 120,
      "height": 90
    },
    "medium": {
      "url": url + "/mqdefault.jpg",
      "width": 320,
      "height": 180
    },
    "high": {
      "url": url + "/hqdefault.jpg",
      "width": 480,
      "height": 360
    },
    "standard": {
      "url": url + "/sddefault.jpg",
      "width": 640,
      "height": 480
    },
    "maxres": {
      "url": url + "/maxresdefault.jpg",
      "width": 1280,
      "height": 720
    }
  };

  return data;
}

function getItem(element) {
  var subStringId = "/watch?v=",
    urlImg = $(element).find('div > span > a > span > span > span > img').first().attr('data-thumb'),
    idd = $(element).find('div > span > a').first().attr('href'),
    title = $(element).find('div.yt-lockup-content > h3 > a').first().text().replace("\"", ''),
    channelName = $(element).find('div.yt-lockup-content > div > a').first().text(),
    channelId = $(element).find('div.yt-lockup-content > div > a').first().attr('href'),
    duration = $(element).find('div > span > span > span').first().text(),
    view = $(element).find('div.yt-lockup-content > div > ul > li').first().text(),
    timeAgo = $(element).find('div.yt-lockup-content > div > ul > li').next().text();

  if (duration != "") {

    urlImg = urlImg.split('?')[0];


    if (idd.indexOf(subStringId) != -1) {
      idd = idd.replace(subStringId, '');
    }

    var arrDuration = duration.split(":");
    var dtion = "";

    if (arrDuration.length == 1) {
      dtion = Duration.ofSeconds(parseInt(arrDuration[0])).toString();
    } else if (arrDuration.length == 2) {
      dtion = Duration.ofMinutes(parseInt(arrDuration[0])).plusSeconds(parseInt(arrDuration[1])).toString();
    } else if (arrDuration.length == 3) {
      dtion = Duration.ofHours(parseInt(arrDuration[0])).plusMinutes(parseInt(arrDuration[1])).plusSeconds(parseInt(arrDuration[2])).toString();
    } else if (arrDuration.length == 4) {
      dtion = Duration.ofDays(parseInt(arrDuration[0])).plusHours(parseInt(arrDuration[1])).plusMinutes(parseInt(arrDuration[2])).plusSeconds(parseInt(arrDuration[3])).toString();
    }

    if (view.indexOf('&nbsp;') != -1) {
      view = view.replace('&nbsp;', ':');
    }

    var item = {
      id: idd,
      thumbnails: getMultiLinkImages(urlImg),
      title: title,
      channelId: channelId,
      channelTitle: channelName,
      duration: dtion,
      view: view,
      timeAgo: timeAgo
    };

    return item;
  }
}

module.exports = {
  getPlayList: function(element) {
    var list = [];
    var titleList = $(element).find('h2.branded-page-module-title').first();
    var id = $(titleList).find('a').first().attr('href'),
      title = $(titleList).find('a > span > span').first().text().replace("\"", ''),
      items = $(element).find('div.yt-lockup-dismissable'),
      listItems = [];

    items.each(function(index, element) {
      listItems.push(getItem(element));
    });
    var ls = {
      id: id,
      title: title,
      itemCount: items.length,
      items: listItems
    }
    return ls;
  }
}
