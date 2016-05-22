const
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  sketch = require('gulp-sketch'),
  iconfont = require('gulp-iconfont'),
  imagemin = require('gulp-imagemin'),
  consolidate = require('gulp-consolidate')

/**
 * Font settings
 */
const
  // set name of your symbol font
  fontName = 'floating-top-link',
  // set class name in your CSS
  className = 'FloatingTopLink__icon',
  // you can also choose 'foundation-style'
  template = 'fontawesome-style',
  // you can also choose 'symbol-font-16px.sketch'
  skethcFileName = 'floating-top-link-font-14px.sketch'

/**
 * Recommended to get consistent builds when watching files
 * See https://github.com/nfroidure/gulp-iconfont
 */
const timestamp = Math.round(Date.now() / 1000)

gulp.task('symbols', () =>
  gulp.src(skethcFileName)
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg'
    }))
    .pipe(imagemin())
    .pipe(iconfont({
      fontName,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp,
      log: () => {} // suppress unnecessary logging
    }))
    .on('glyphs', (glyphs) => {
      const options = {
        className,
        fontName,
        fontPath: '../fonts/', // set path to font (from your CSS file if relative)
        glyphs: glyphs.map(mapGlyphs)
      }
      gulp.src(`templates/${ template }.css`)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: fontName }))
        .pipe(gulp.dest('./css/')) // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src(`templates/${ template }.html`)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: 'sample' }))
        .pipe(gulp.dest('./')) // set path to export your sample HTML
    })
    .pipe(gulp.dest('../fonts/')) // set path to export your fonts
)

gulp.task('watch', () => gulp.watch('*.sketch', ['symbols']))

/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
  return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}
