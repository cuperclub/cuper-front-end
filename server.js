const express = require('express');
const path = require('path');
const app = express();
const srcBuild = 'dist/cuper-front-end';

app.use(express.static(path.join(__dirname, srcBuild)));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, srcBuild, 'index.html'));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
