var options = process.argv;
var stroke = require('./chinese-stroke');

var fs = require('fs');
var readline = require('readline');

var filePath = '/get_chinese_name/data/stoke.dat';
var outFilePath = '/get_chinese_name/data/stoke_new.dat';

function readFileToArr(filePath, callback) {
    var readStream = fs.createReadStream(filePath);
    var readLineFacade = readline.createInterface({
        input: readStream
    });
    var resultHolder = new Array();
    readLineFacade.on('line', function (line) {
        let value = line.split("|")[1];
        resultHolder.push(value + "|" + stroke.get(value) + "\r\n");
    });
    readLineFacade.on('close', function () {
        callback(resultHolder);
    });
}

readFileToArr(filePath, (array) => {
    let fileWriter = fs.createWriteStream(outFilePath);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        fileWriter.write(element);
    }
})
