var fs = require('fs');
var path = require('path');
var test = require('tape');
var markdown = require('..');

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

markdown.Formatter.prototype.prettifyError = function (assertion) {
  var lines = assertion.error.raw.split('\n');
  lines.pop();
  return lines.join('\n');
};

function tapTest(fixture) {
  test(fixture, function (t) {
    fs.createReadStream(fixtures(fixture + '.tap'))
      .pipe(markdown({duration: false}));
		t.end();
  });
}

['summary', 'fail', 'comment'].forEach(tapTest);
