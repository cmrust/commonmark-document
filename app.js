var http = require("http");
var url = require("url");
var fs = require('fs');
var path = require('path');
var log = require('./lib/logger.js');
var commonmark = require('commonmark');

var PORT = 3000;
var FILENAME = 'index.md';
var FILEPATH = path.join(__dirname, 'public/md');
var PATH_TO_FILE = path.join(FILEPATH, FILENAME);

// joinHTML wraps the HTML skeleton around the parsed markdown
function joinHTML(html) {
    var TOP_HTML = '<html><head><link rel="stylesheet" type="text/css" href="css/style.css"><title>commonmark-document</title></head><body><div id="wrapper"><div id="document">';
    var BOTTOM_HTML = '</div></div></body></html>';
    return TOP_HTML+html+BOTTOM_HTML;
}

// initialize our HTML document with a dummy message,
// in case the document can't be read
var renderedHTML = joinHTML('The application is still starting up!');

// renderHTML() populates the global renderedHTML var
function renderHTML(filepath) {
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) {
            renderedHTML = joinHTML('The document cannot be found!');
            return log.error('Error ('+err.code+') reading file',filepath);
        }
        var reader = new commonmark.DocParser();
        var writer = new commonmark.HtmlRenderer();
        // parse the data from our file using commonmark
        renderedHTML = joinHTML(writer.render(reader.parse(data)));
        log.info('Markdown file parsed and loaded into memory');
    });
};

log.info('Loading', PATH_TO_FILE);

// watch the filesystem for modifications to our document
try {
    var fsTimeout = true;
    fs.watch(PATH_TO_FILE, function (event) {
        // the watch API throws multiple notifications per event, differing
        // per platform, setting a 1ms timeout to catch them as a single event
        if (fsTimeout === true) {
            fsTimeout = false;
            // the file is parsed again, also only after the timeout,
            // to avoid a race condition on Windows
            setTimeout(function() {
                log.info('Change to file has been detected');
                renderHTML(PATH_TO_FILE);
                fsTimeout = true;
            }, 1);
        }
    });
} catch (err) {
    log.fatal('Failed to watch', PATH_TO_FILE, 'with', err.message);
    process.exit(1);
}

// load our document for the first time
renderHTML(PATH_TO_FILE);

// fire up the http server
http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname
    var filename = path.join(__dirname, 'public', pathname);

    log.info('Received request for', pathname);

    if (pathname === '/') {
        log.info('Responding with (200) rendered markdown');
        res.writeHead(200);
        res.write(renderedHTML);
        res.end();
        return;
    }

    fs.exists(filename, function(exists) {
        if(!exists) {
            log.info('Responding with (404) file not found');
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not Found\n");
            res.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                log.error('Responding with (500) because reading file failed with:', err.message);
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write('Reading ' + path.join(pathname, 'index.html') + ' failed');
                res.end();
                return;
            }
            log.info('Responding with (200) for file', filename);
            res.writeHead(200);
            res.write(file, "binary");
            res.end();
        });
    });
}).listen(PORT);

log.info('Server is listening at http://localhost:' + PORT, '[CTRL + C to shutdown]');