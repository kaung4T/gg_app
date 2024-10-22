const json2xls = require('json2xls');
const path = require('path');
const fs = require('fs');
const getPathInfo = p => path.parse(p);

function autoLoadFile(
  directory,
  useSubdirectories = false,
  extList = ['.ts', '.yaml']
) {
  const filesList = [];
  function readFileList(directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory);
    files.forEach(item => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList);
      } else {
        const info = getPathInfo(fullPath);
        extList.includes(info.ext) && filesList.push(fullPath);
      }
    });
  }
  readFileList(directory, useSubdirectories, extList);

  const res = filesList.map(item => ({
    path: item,
    data: require(item),
    ...getPathInfo(item)
  }));

  return res;
}

const fileList = autoLoadFile(path.join(__dirname, './json'), true, ['.json']);

const data = [];
fileList.forEach((_, i) => {
  for (const [key, val] of Object.entries(_.data)) {
    if (i === 0) {
      data.push({ 键名: key, [_.name]: val });
    } else {
      data.forEach(e => {
        if (e['键名'] === key) {
          e[_.name] = val;
        }
      });
    }
  }
});

fs.writeFileSync('./locales/i18n.xlsx', json2xls(data), 'binary');
