const fs = require('fs');

exports.deleteFile = file => {
    if (fs.existsSync(`public${file}`)) {
        fs.unlink(`public${file}`, err => console.log(err));
    }
}