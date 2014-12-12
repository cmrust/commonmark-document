commonmark-document
===================

This application, written on Node.js, serves [Commonmark-compliant](http://commonmark.org/) markdown files in a plain and simple "document" format.

![commonmark-document-promo](https://raw.githubusercontent.com/raptastics/commonmark-document/master/commonmark-document-promo.png)

The goals of this project are simple:

* `live editing` - changes can be made to the file without restarting the server
* `document look and feel` - page renders quickly and with minimal styling
* `markdown` - also allow users to view the raw markdown file
* `printing` - print physical copies without obvious web mark up showing
* `syntax` - code syntax highlighting
* `responsive` - should scale nicely to any device

Note: `printing`, `syntax` and `responsive` still need to be worked on.

Usage
-----

Download the program

    git clone https://github.com/raptastics/commonmark-document.git

Download the `commonmark` dependency:

    cd commonmark-document
    npm install

Run the server:

    node app.js

Edit the markdown document at:

    ./public/md/index.md

The server log should inform you that your page is now visible at [http://localhost:3000](http://localhost:3000)

Bugs
----

* Watching the file on *linux* doesn't usually work more than once because of the way most user applications work. In most cases, the file link that is being watched by the kernel gets tossed when files are edited, because underneath a temp file is actually created and then moved in to place.
