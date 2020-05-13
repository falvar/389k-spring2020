const PDFDocument = require('pdfkit');
const nodemailer = require("nodemailer");
const doc = new PDFDocument();

function initData(data) {
    // add your content to the document
    for( r in data){
        doc.fontSize(20)
        .text(r.title)
        .moveDown()
        .fontSize(14)
        .text('Calories: ' + r.calories)
        .text(r.instructions)
        .moveDown()
    }
    
    doc.end();
}

function download() {
    let buff;
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        buff = Buffer.concat(buffers);
    })
    return buff;
}

module.exports = {
    initData: initData,
    download: download
}
