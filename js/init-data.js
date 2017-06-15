$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/api/service/info',
    //data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(data) {
      init(data);
    },
    error: function(err) {
      console.log(err);
    },
  });

  function init(data) {
    var explorer = window.navigator.userAgent;
    data = JSON.parse(data);
    var curr_url = window.location.href;

    if (explorer.indexOf("Chrome") >= 0 && curr_url.indexOf('https://') < 0) {
    	//if explorer is chrome, Redirection to https
      var http_url = window.location.href;
     var web_https_url = data.web_https_url;
     
    	var url_path = http_url.substr(http_url.indexOf('://')+3);;
    	if(url_path.indexOf('/') > 0)
    	{
    		url_path = url_path.substr(url_path.indexOf('/'));
    	}
    	else
    	{
    		url_path = "";
    	}

      var https_url = web_https_url + url_path;
      window.location.href = https_url;

      return;
    }
    console.log('************************');

    if(explorer.indexOf("MSIE") >= 0 || explorer.indexOf("Edge") >= 0){
      console.log('ie');
      $(".popFix").show();
      return;
    };



    if (data && (data.ws_uri || data.wss_uri)) {
      var option = '';
      if (!(window.navigator.userAgent.indexOf('Chrome') >= 0) && data.ws_uri && curr_url.indexOf('https://') < 0) {
      	//not Chrome, not https
        option += '<option>' + data.ws_uri + '</option>';
      }
      if(data.wss_uri)
      {
      	option += '<option>' + data.wss_uri + '</option>';
    	}
      var ws_servers_select = $('#ws_servers_select');
      ws_servers_select.html(option);
      $('#ws_servers').val(ws_servers_select.val());
      ws_servers_select.on('change', function() {
        $('#ws_servers').val($(this).val());
      });
    }

  //sip_uri
    if (data && data.sip_server_domains && Array.isArray(data.sip_server_domains)) {
      var sip_option = '';
      data.sip_server_domains.map(function (data) {
        sip_option += '<option>' + data + '</option>';
      });
      var sip_select = $('#sip_uri_select');
      sip_select.html(sip_option);
      $('#sip_uri').val(sip_select.val());
      sip_select.on('change', function () {
        $('#sip_uri').val($(this).val());
      })
    }
  }


});