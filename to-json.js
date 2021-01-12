const fs = require('fs');

module.exports.toJson = (file, data) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
        if(err) throw err;
    });
};