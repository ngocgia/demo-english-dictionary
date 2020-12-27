const englishDictionary = require('./dictionary.json');
const express = require('express');
const app = express();
const params = require('params');
const fse = require('fs-extra');

app.use(express.static('public'));


function onPrintWord(req, res){
    const routeParams = req.params;
    const word = routeParams.word;

    const key = word.toLowerCase();
    const definition = englishDictionary[key];

    res.send(`The definition of ${word} is ${definition}`);

}
app.get('/print/:word', onPrintWord);
app.get('/', function(req, res){
    const response ={
        greting: 'Hello Word',
        awesome: true,
    }
    res.json(response);
});
function onLookupWord(req, res){
    const routeParams = req.params;
    const word = routeParams.word;

    const key = word.toLowerCase();
    const definition = englishDictionary[key];

    res.json({
        word: word,
        definition: definition,
    });
}
app.get('/lookup/:word', onLookupWord);
async function onSetWord(req, res){
    const routeParams = req.params;
    const word = routeParams.word;
    const definition = req.body.definition;
    const key = word.toLowerCase();

    const jsonParser = JSON.parse();

    englishDictionary[key] = definition;
    await fse.writeJSON('./dictionary.json', englishDictionary);
    res.json({
        success: true,
    });
}
app.post('/set/:word',jsonParser, onSetWord);
app.listen(3000, function(req, res){
    console.log(`Example app listening on port: 3000!`);
})