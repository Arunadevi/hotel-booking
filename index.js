var express = require('express');
var oauth = require('oauth');
var mongo = require('mongodb');
var gcal = require('google-calendar');
var q = require('q');
var app = express();

var clientId = 'GOOGLE_CLIENT_ID';
var clientSecret = 'GOOGLE_CLIENT_SECRET';
var scopes = 'https://www.googleapis.com/auth/calendar';
var googleUserId;
var refreshToken;
var baseUrl;

// app.env('development',function(){
//   console.log('!! DEVELOPMENT MODE !!');

//   googleUserId = 'GOOGLE_EMAIL_ADDRESS';
//   refreshToken = 'GOOGLE_REFRESH_TOKEN';
//   baseUrl = 'DEV_API_URL';
// });

// app.env('production', function(){
//   console.log('!! PRODUCTION MODE !!');

//   googleUserId = 'GOOGLE_EMAIL_ADDRESS';
//   refreshToken = 'GOOGLE_REFRESH_TOKEN';
//   baseUrl = 'PRODUCTION_API_URL';
// });

// var mongoCollectionName = 'MONGO_COLLECTION_NAME';
// var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/default';
// var database;
// function connect(callback)
// {
//   var deferred = q.defer();

//   if(database === undefined)
//   {
//     mongo.Db.connect(mongoUri, function(err, db){
//       if(err) deferred.reject({error: err});

//       database = db;
//       deferred.resolve();
//     });
//   }
//   else
//   {
//     deferred.resolve();
//   }

//   return deferred.promise;
// }

// function authorize()
// {
//   var deferred = q.defer();

//   oa = new oauth.OAuth2(clientId,
//             clientSecret,
//             "https://accounts.google.com/o",
//             "/oauth2/auth",
//             "/oauth2/token");

//   if(refreshToken)
//   {
//     oa.getOAuthAccessToken(refreshToken, {grant_type:'refresh_token', client_id: clientId, client_secret: clientSecret}, function(err, access_token, refresh_token, res){

//       //lookup settings from database
//       connect().then(function(){
//         database.collection(mongoCollectionName).findOne({google_user_id: googleUserId}, function(findError, settings){

//           var expiresIn = parseInt(res.expires_in);
//           var accessTokenExpiration = new Date().getTime() + (expiresIn * 1000);

//           //add refresh token if it is returned
//           if(refresh_token != undefined) settings.google_refresh_token = refresh_token;

//           //update access token in database
//           settings.google_access_token = access_token;
//           settings.google_access_token_expiration = accessTokenExpiration;

//           database.collection(mongoCollectionName).save(settings);

//           deferred.resolve(access_token);
//         });
//       });

//     })
//   }
//   else
//   {
//     deferred.reject({error: 'Application needs authorization.'});
//   }

//   return deferred.promise;
// }

// function getAccessToken()
// {
//   var deferred = q.defer();
//   var accessToken;

//   connect().then(function(){

//     database.collection(mongoCollectionName).findOne({google_user_id: googleUserId}, function(findError, settings){
//       //check if access token is still valid
//       var today = new Date();
//       var currentTime = today.getTime();
//       if(currentTime < settings.google_access_token_expiration)
//       {
//         //use the current access token
//         accessToken = settings.google_access_token;
//         deferred.resolve(accessToken)
//       }
//       else
//       {
//         //refresh the access token
//         authorize().then(function(token){

//           accessToken = token;
//           deferred.resolve(accessToken);

//         }, function(error){

//           deferred.reject(error);

//         });
//       }
//     });

//   }, function(error){
//     deferred.reject(error);
//   });

//   return deferred.promise;
// }

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index',{users: [
 { name: 'Booking' }
 ]})});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


