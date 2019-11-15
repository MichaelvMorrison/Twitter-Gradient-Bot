var Twit = require('twit');
var config = require('./config');
var exec = require('child_process').exec;
var fs = require('fs');
var T = new Twit(config);

function post(){
  var executable = 'processing-java --sketch="C:\\Users\\Michael Morrison\\Desktop\\Twitter Bot\\node\\sketch" --run';
  console.log(executable);
  exec('processing-java --sketch="C:\\Users\\Michael Morrison\\Desktop\\Twitter Bot\\node\\sketch" --run', processed);

  function processed(){
    var fn = 'sketch/gradient.png';
    var params = {
      encoding : 'base64'
    }
    var img = fs.readFileSync(fn,params);

    T.post('media/upload', {media_data: img}, uploaded);

    function uploaded(err, data, response){
      var id = data.media_id_string;
      var content = {
        status: '',
        media_ids: [id]
      }
      T.post('statuses/update', content, callback);
    }
  }

  function callback(err, data, response){
    if (err){
      console.log('Something went wrong');
    }else{
      console.log('New gradient posted');
    }
  }
}

post();
setInterval(post, 1000*60*60);
