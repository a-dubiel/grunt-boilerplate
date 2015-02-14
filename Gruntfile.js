module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.config.init({

    pkg: grunt.file.readJSON('package.json'),

    path: {
      source   : 'source',
      build    : 'build',
      reports  : 'reports',
      images   : 'images',
      scripts  : 'scripts',
      styles   : 'styles',
      views    : 'views'
    },

    banner: {
      exapanded:
        '/**\n' +
        ' * <%= pkg.title %> v<%= pkg.version %>\n' +
        ' * <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>\n' +
        ' * \n' +
        ' * 2014 <%= pkg.author.name %> | <%= pkg.author.url %>\n' +
        ' */\n\n',
      compressed:
        '/*!<%= pkg.title %> v<%= pkg.version %> | <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> | 2014 <%= pkg.author.name %>*/'
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.<%= path.build %>'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: '<%= path.source %>/<%= path.scripts %>/**/*',
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['<%= path.source %>/<%= path.styles %>/**/*'],
        tasks: ['less', 'autoprefixer', 'csslint:styles'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: '<%= path.source %>/<%= path.images %>/**/*.{png,jpg,gif,svg}',
        tasks: ['imagemin', 'svgmin'],
        options: {
          spawn: false,
        }
      },
      html:{
        files: '<%= path.source %>/<%= path.views %>/**/*.html',
        tasks: 'htmlmin',
        options: {
          spawn: false
        }
      }
    },
    concat: {
      options: {
        separator: '\n'
      },
      scripts: {
        options: {
          banner: '<%= banner.exapanded %>'
        },
        files: {
          '<%= path.build %>/<%= path.scripts %>/app.js': '<%= path.source %>/<%= path.scripts %>/*.js'
        }
      }
    },
    uglify: {
      options: {
        report: 'min',
        banner: '<%= banner.compressed %>'
      },
      build: {
        src: '<%= path.build %>/<%= path.scripts %>/app.js',
        dest: '<%= path.build %>/<%= path.scripts %>/app.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= path.source %>/<%= path.images %>/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= path.build %>/<%= path.images %>/'
        }]
      }
    },
    svgmin: {
      images: {
        expand: true,
        cwd: '<%= path.source %>/<%= path.images %>/',
        src: '**/*.svg',
        dest: '<%= path.build %>/<%= path.images %>/'
      }
    },
    less: {
      build: {
        options: {
          compress: true,
          optimization: 2,
          banner: '<%= banner.compressed %>'
        },
        files: {
          '<%= path.build %>/<%= path.styles %>/app.min.css': '<%= path.source %>/<%= path.styles %>/app.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: '<%= path.build %>/<%= path.styles %>/*.css',
        dest: '<%= path.build %>/<%= path.styles %>/'
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc',
        formatters: [
          {
            id: 'csslint-xml',
            dest: 'reports/css-report.xml'
          }
        ]
      },
      styles: {
        src: '<%= path.build %>/<%= path.styles %>/*.css'
      }
    },
    htmlmin: {                                     
      build: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          '<%= path.build %>/index.html': '<%= path.source %>/<%= path.views %>/index.html',    
        }
      }
    }
});

grunt.registerTask('default', ['concat', 'uglify', 'less', 'imagemin', 'svgmin', 'autoprefixer', 'csslint', 'htmlmin']);
grunt.registerTask('dev', ['connect', 'watch']);  


};