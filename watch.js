const nodemon = require('nodemon');
const ngrok = require('ngrok');

ngrok.connect(process.env.PORT || 3030, (err, url) => {

  if(!err) {

    nodemon({
      script: 'src/index.js',
      ignore: [
        '.git',
        'node_modules/**/node_modules',
        'client'
      ],
      env: {
        'SITE_URL': url
      },
      ext: 'js json'
    });

    nodemon.on('start', function () {
      console.log('App has started');
    }).on('quit', function () {
      console.log('App has quit');
      process.exit();
    }).on('restart', function (files) {
      console.log('App restarted due to: ', files);
    });

  } else {
    console.error(err);
  }

});
