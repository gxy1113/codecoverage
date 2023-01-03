const USER_MODE = "";
const DATA_FOLDER = process.argv[2] + "/";
let text_array = [];
const loadfile = function (name, user=USER_MODE) {
    const fs = require('fs');
        try {
            if(fs.existsSync(DATA_FOLDER+name)){
                //console.log(`file ${DATA_FOLDER + name} detected.`);
                return fs.readFileSync(DATA_FOLDER+name, "utf8");
            }    
        } catch (err) {
            console.log(`error loading file - ${DATA_FOLDER + name}`)
            console.log(err);
        }   
        //console.error(`${user+'_'+name} not found`);
        return false
}

const traverseChildNodes = function(childNodes, parentTagName){
    childNodes.forEach(node => {
        if(node.hasChildNodes && node.childNodes.length != 0){
            let tagName = node.tagName;
            let childNodes = node.childNodes;
            for(let i = 0; i < node.attributes.length; i++){
                let item = node.attributes.item(i);
            }
            traverseChildNodes(childNodes, tagName);
        }
        else{
            if(parentTagName != 'SCRIPT' && node["textContent"] != undefined)
            {
                let textContent = node.textContent;
                //console.log(textContent);
                textContent = textContent.split('\\t').join('').split('\\n').join('').split('\\r').join('').split('\n').join('');
                textContent = textContent.replace(/\s/g, '');
                if(textContent != ''){
                    text_array.push(textContent);
                }
            }
        }
    })
}

const appendtoFile = function(obj=""){
    const fs = require('fs');
    const logStream = fs.createWriteStream("data.txt", {flags: 'a'});
    logStream.write(obj + ' ');
    logStream.end();
}

const parse_HTML = function(HTML=""){
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const {document} = new JSDOM(HTML).window;
    const node = document.body;
    const childNodes = document.childNodes;
    traverseChildNodes(childNodes, node.tagName);

}

const HTML = loadfile("index.html")
parse_HTML(HTML);
for(let i = 0; i < text_array.length; i++){
    if(text_array[i] == "Total"){
        //console.log(text_array[i + 3]);
        let value = text_array[i + 3].split("/")[0];
        appendtoFile(value);
    }
}
