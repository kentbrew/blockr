var listUrl = 'https://raw.githubusercontent.com/freebsdgirl/ggautoblocker/master/block_names.txt';

var block = function (blockStart, blockEnd) {

  var token = '';
  var accountList = [];

  var blockAccount = function (id) {
    console.log('blocking: ' + id);
    var http = new XMLHttpRequest();
    var params = 'authenticity_token=' + token + '&block_user=true&screen_name=' + id;
    http.open('POST', 'https://twitter.com/i/user/report_spam', true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    http.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    http.onreadystatechange = function() {
      if (http.readyState == 4 && (http.status == 200 || http.status == 403)) {
        console.log('blocked ' + id); 
      }
    }
    http.send(params);
  };

  var startBlocking = function() {
    console.log(accountList.length + ' accounts found.');
    var i = blockStart;
    var block = function () {
      blockAccount(accountList[i]);
      i = i + 1;
      if (i < blockEnd + 1) {
        window.setTimeout(function () {
          block();
        }, 1000);
      }
    }
    block();
  };

  var getList = function () {
    console.log('got token: ' + token);
    var list = new XMLHttpRequest();
    list.open('GET', listUrl, true);
    list.onreadystatechange = function() {
      if (list.readyState == 4 && list.status == 200) {
        accountList = list.responseText.split('\n');
        startBlocking();
      }
    };
    list.send();
  };

  var auth = new XMLHttpRequest();
  auth.open('GET', 'https://twitter.com/intent/tweet', true);
  auth.onreadystatechange = function() {
    if (auth.readyState == 4 && auth.status == 200) {
      var t = auth.responseText.split('twttr.form_authenticity_token = \'');
      if (t[1]) {
        token = t[1].split(/'/)[0];
        getList();
      }
    }
  };

  auth.send();

};