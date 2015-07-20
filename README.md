# Sterroo

Sterroo is an alarm clock that works by calling a users phone and requesting them to answer a mathematical question, currently questions are addition only and numbers are randomly generated from 0-10.

### How to develop

Run ./ngrok 3000 to start up an ngrok url, you need this to be able to use the Twilio features as Twilio will not use localhost as a callback.

Install nodemon `npm install -g nodemon` this is so you don't have to reload the server everytime you save a file.

Run `npm install` to install required packages, there aren't many but they are all required.

Install grunt-cli `npm install -g grunt-cli` so that we can use grunt to compile scss into css.

Run `grunt watch` to watch the scss files and compile them into css.

Run `nodemon -e js,jade` this will watch both js and jade files and will restart the server whenever any files with those types changes.