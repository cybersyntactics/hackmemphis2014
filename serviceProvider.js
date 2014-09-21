var OAuth = require('oauth');
var util = require('util');

function serviceProvider(request_token_url, access_token_url, consumer_key, consumer_secret, default_get_url, user_token, user_secret) {
  var oauth = new OAuth.OAuth(
    request_token_url, 
    access_token_url, 
    consumer_key, 
    consumer_secret, 
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  this.get =  function(get_url, callback) {
    get_url = get_url || default_get_url;
    return oauth.get(
      get_url, 
      user_token, 
      user_secret, 
      callback);
  };
}

module.exports = exports = serviceProvider;