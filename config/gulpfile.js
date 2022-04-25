// development or production
const devBuild =
  (process.env.NODE_ENV || "development").trim().toLowerCase() ===
  "development";

// modules
const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const sourcemaps = devBuild ? require("gulp-sourcemaps") : null;
const cleanCSS = devBuild ? null : require("gulp-clean-css");
const browserSync = devBuild ? require("browser-sync") : null;
const sass = require("gulp-sass");
const dependents = require("gulp-dependents");
const cached = require("gulp-cached");
const postcss = require("gulp-postcss");
const postcssAssets = require("postcss-assets");
const gutil = require("gulp-util");
const noop = require("gulp-noop");
const newer = require("gulp-newer");
const size = require("gulp-size");
const imagemin = require("gulp-imagemin");
const { gifsicle, mozjpeg, optipng, svgo } = imagemin;
const fs = require("fs");
const fileinclude = require("gulp-file-include");
const webpack = require("webpack");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const webpackDevConfig = require("./webpack.dev");
const webpackProdConfig = require("./webpack.prod");

// File paths
const dir = {
  buildFolder: devBuild ? "../public" : "../dist",
  src: `../src`,
  public: `../public`,
  nodeModules: `../node_modules`,
  get buildFolderAssets() {
    return `${this.buildFolder}/assets/`;
  },
  get htmlSrc() {
    return `${this.src}/html/`;
  },
  get imagesSrc() {
    return `${this.src}/assets/imgs/`;
  },
  get scssSrc() {
    return `${this.src}/assets/scss/`;
  },
  get cssSrc() {
    return `${this.src}/assets/css/`;
  },
  get minifyCSSSrc() {
    return `${this.public}/assets/css/`;
  },
  get bootstrapIconsSrc() {
    return `${this.nodeModules}/bootstrap-icons/bootstrap-icons.svg`;
  },
  get fontsSrc() {
    return `${this.src}/assets/fonts/`;
  },
  get jsSrc() {
    return `${this.src}/assets/js/`;
  },
  get tailwindConfigSrc() {
    return "../tailwind.config.js";
  },
};

// JS Config
const jsConfig = {
  src: `${dir.jsSrc}**/*`,
  buildFolder: `${dir.buildFolderAssets}js/`,
};

// Webpack Dev Task
function webpackDevAssets(done) {
  return webpack(webpackDevConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    } else {
      //gutil.log("[webpackDevAssets]", stats.toString());
    }
    done();
  });
}

// Webpack Dev Task
function webpackProdAssets(done) {
  return webpack(webpackProdConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    } else {
      //gutil.log("[webpackProdAssets]", stats.toString());
    }
    done();
  });
}

// Images Config
const imgConfig = {
  src: `${dir.imagesSrc}**/*`,
  buildFolder: `${dir.buildFolderAssets}imgs/`,
  minOpts: [
    gifsicle({ interlaced: true }),
    mozjpeg({ quality: 75, progressive: true }),
    optipng({ optimizationLevel: 5 }),
    svgo({
      plugins: [
        { removeViewBox: false },
        { cleanupIDs: true },
        { cleanupListOfValues: false },
        { cleanupNumericValues: false },
      ],
    }),
  ],
};

// Images Task
function images() {
  return src(imgConfig.src)
    .pipe(newer(imgConfig.buildFolder))
    .pipe(imagemin(imgConfig.minOpts))
    .pipe(size({ showFiles: true }))
    .pipe(dest(imgConfig.buildFolder));
}

// CSS Config
const cssConfig = {
  srcFolder: dir.cssSrc,
  src: [`${dir.scssSrc}*.scss`, `${dir.scssSrc}**/*.scss`],
  buildFolder: `${dir.buildFolderAssets}css/`,
  sassOpts: {
    sourceMap: devBuild,
    imagePath: "/imgs/",
    precision: 3,
    errLogToConsole: true,
  },

  postCSS: [
    postcssAssets({
      loadPaths: ["imgs/"],
      basePath: dir.buildFolder,
    }),
  ],
};

// CSS Task
function css(cb) {
  return (
    src(cssConfig.src)
      //.pipe(cached("css"))
      //.pipe(dependents())
      .pipe(sourcemaps ? sourcemaps.init() : noop())
      .pipe(sass(cssConfig.sassOpts).on("error", sass.logError))
      .pipe(sourcemaps ? sourcemaps.write() : noop())
      .pipe(noop())
      .pipe(dest(cssConfig.srcFolder))
      .pipe(postcss([tailwindcss("../tailwind.config.js"), autoprefixer]))
      .pipe(dest(cssConfig.buildFolder))
      .pipe(browserSync ? browserSync.reload({ stream: true }) : noop())
      .on("end", cb)
  );
}

// CSS Minify Config
const cssMinifyConfig = {
  src: [`${dir.minifyCSSSrc}*.css`, `${dir.minifyCSSSrc}**/*.css`],
  build: `${dir.buildFolderAssets}css/`,
};

// CSS Minify Task
function minifyCSS() {
  return src(cssMinifyConfig.src)
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(dest(cssMinifyConfig.build));
}

// Fonts Config
const fontsConfig = {
  src: `${dir.fontsSrc}**/*`,
  build: `${dir.buildFolderAssets}fonts/`,
};

// Fonts Task
function fonts() {
  return src(fontsConfig.src).pipe(dest(fontsConfig.build));
}

// HTML Config
const htmlConfig = {
  src: `${dir.htmlSrc}`,
  buildFolder: `${dir.buildFolder}/`,
};

// HTML Task
function html(done) {
  const dirents = fs.readdirSync(htmlConfig.src, {
    withFileTypes: true,
  });

  const getTemplateFileNames = () => {
    dirents.forEach((dirent) => {
      if (!dirent.isDirectory()) {
        return src(`${htmlConfig.src}${dirent.name}`)
          .pipe(
            fileinclude({
              prefix: "@@",
              basepath: "@file",
            })
          )
          .pipe(dest(htmlConfig.buildFolder));
      } else {
        if (dirent.name !== "partials") {
          let subfolderPathSrc = `${htmlConfig.src}${dirent.name}/`,
            subfolderPathbuildFolder = `${htmlConfig.buildFolder}${dirent.name}/`;

          let subfiles = fs.readdirSync(subfolderPathSrc, {
            withFileTypes: true,
          });
          subfiles.forEach((subfile) => {
            return src(`${subfolderPathSrc}${subfile.name}`)
              .pipe(
                fileinclude({
                  prefix: "@@",
                  basepath: "@file",
                })
              )
              .pipe(dest(`${subfolderPathbuildFolder}`));
          });
        }
      }
    });
  };

  getTemplateFileNames();

  done();
}

// Bootstrap SVGs
const bootstrapSvgConfig = {
  src: `${dir.bootstrapIconsSrc}`,
  buildFolder: `${dir.buildFolderAssets}imgs/svgs`,
};

// Bootstrap SVGs Task
function bootstrapSvg() {
  return src(bootstrapSvgConfig.src)
    .pipe(newer(bootstrapSvgConfig.buildFolder))
    .pipe(dest(bootstrapSvgConfig.buildFolder));
}

// Dev Server
const syncConfig = {
  server: {
    baseDir: htmlConfig.buildFolder,
  },
  port: 7005,
  open: true,
};

function browserSyncCall(done) {
  if (browserSync) browserSync.init(syncConfig, done);
}

// Browser Reload
function serverReload(done) {
  browserSync.reload();
  done();
}

function watchChanges(done) {
  // JS Watch
  watch(jsConfig.src, series(webpackDevAssets, serverReload));

  // Images Watch
  watch(imgConfig.src, series(images, serverReload));

  // CSS Gulp Watch
  watch(cssConfig.src, series(css, serverReload));

  // HTML Watch
  watch(htmlConfig.src, series(html, css, serverReload));

  // Tailwind Config Watch
  watch(dir.tailwindConfigSrc, series(css, serverReload));

  done();
}

exports.develop = series(
  fonts,
  images,
  bootstrapSvg,
  html,
  css,
  webpackDevAssets,
  browserSyncCall,
  watchChanges
);

exports.production = series(
  fonts,
  images,
  bootstrapSvg,
  minifyCSS,
  html,
  webpackProdAssets
);
