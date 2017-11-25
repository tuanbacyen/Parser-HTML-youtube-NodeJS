var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(8009);


var tools = require("./tools");
var request = require("request");
var cheerio = require("cheerio");

// $('div[id="list"]')

app.get("/", function(req, res) {
	//https://www.youtube.com
  request('https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ/?gl=RU&hl=zh-TW', function(err, response, body) {
    if (err) {
      var er = {
        status: 2,
        messesge: 'Lỗi'
      }
      res.json(er);
    } else {
      $ = cheerio.load(body);
      var list = [];
      $(body).find('ul[id=browse-items-primary] > li').each(function(index, element) {
        list.push(tools.getPlayList(element));
      });
      var homeList = {
        channelName: 'Âm nhạc',
        country: 'RU - Russia',
        PlayList: list
      };
      res.json(homeList);
    }
  });
});

app.get("/videos", function(req, res) {
  request('https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ/videos', function(err, response, body) {
    if (err) {
      var er = {
        status: 2,
        messesge: 'Lỗi'
      }
      res.json(er);
    } else {
      $ = cheerio.load(body);
      var leng = $(body).find('ul[id=browse-items-primary] > li').length;
      res.send(body)
      // res.json(homeList);
    }
  });
});

app.get("/videos1", function(req, res) {
  request('https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ/videos/browse_ajax?action_continuation=1&continuation=4qmFsgJMEhhVQy05LWt5VFc4WmtaTkRIUUo2Rmdwd1EaMEVnWjJhV1JsYjNNZ05qZ0JZQUZxQUhvS01UVXdPVFkzTmpJME03Z0JBQSUzRCUzRA%253D%253D&direct_render=1', function(err, response, body) {
    if (err) {
      var er = {
        status: 2,
        messesge: 'Lỗi'
      }
      res.json(er);
    } else {
      $ = cheerio.load(body);
      var leng = $(body).find('ul[id=browse-items-primary] > li').length;
      res.send(body)
      // res.json(homeList);
    }
  });
});
