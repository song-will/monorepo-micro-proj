const path = require('path');
const fs = require('fs-extra');
const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');
let Components = require('../../components.json');

Components = Object.keys(Components);

function compileStyle(filePath, distPath) {
  const css = sass.renderSync({ file: filePath, importer: packageImporter() });
  // distPath.replace(/\.\w+$/, '.css')
  fs.writeFileSync(distPath, css.css);
}

// 构建组件css
Components.forEach(key => {
  const srcPath = path.resolve(__dirname, `../../src/packages/${key}/index.scss`);
  const distDir = path.resolve(__dirname, `../../lib/${key}`);
  const distCssPath = `${distDir}/index.css`;
  const distScssPath = `${distDir}/index.scss`;
  const distStylePath = `${distDir}/style`;
  const distStyleCssPath = `${distStylePath}/index.js`;
  const distStyleScssPath = `${distStylePath}/scss.js`;

  if (fs.existsSync(srcPath)) {
    fs.ensureDirSync(distStylePath);

    // css
    compileStyle(srcPath, distCssPath);

    // scss
    fs.copySync(srcPath, distScssPath);

    // style css
    fs.writeFileSync(distStyleCssPath, `import '../index.css';`);

    // style css
    fs.writeFileSync(distStyleScssPath, `import '../index.scss';`);
  }
});

// 构建css主文件
const cssEntryFilePath = path.resolve(__dirname, '../../src/theme/index.scss');
const distPath = path.resolve(__dirname, '../../lib/index.css');
compileStyle(cssEntryFilePath, distPath);
// exports.compileStyle = compileStyle;
