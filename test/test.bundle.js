var testContext = require.context('.', true, /.+\.test\.jsx?$/);
testContext.keys().forEach(testContext);

var context = require.context('../src', true, /.+\.jsx?$/);
context.keys().forEach(function(fileName){
    if (fileName.match(/app\.js/)) {
        return;
    }
    context(fileName);
});

