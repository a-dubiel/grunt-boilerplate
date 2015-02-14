module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.config.init({

    connect: {
      server: {
        options: {
          port: 8000,
          base: './build/'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['source/scripts/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['source/less/*.less'],
        tasks: ['less', 'autoprefixer'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['images/**/*.{png,jpg,gif,svg}', 'images/*.{png,jpg,gif,svg}'],
        tasks: ['imagemin', 'svgmin'],
        options: {
          spawn: false,
        }
      },
      html:{
        files: ['./**/*.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false
        }
      }
    },
    concat: {
      build: {
        src: [
        'source/scripts/libs/*.js',
        'source/scripts/global.js'
        ],
        dest: 'build/scripts/app.js'
      }
    },
    uglify: {
      build: {
        src: 'build/scripts/app.js',
        dest: 'build/scripts/app.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'source/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images/'
        }]
      }
    },
    svgmin: {
      images: {
        expand: true,
        cwd: 'source/images/',
        src: ['**/*.svg'],
        dest: 'build/images/'
      }
    },
    less: {
      build: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'build/styles/app.min.css': 'source/less/app.less'
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
        src: 'build/styles/*.css',
        dest: 'build/styles/'
      }
    },
    htmlmin: {                                     
      build: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          'build/index.html': 'source/views/index.html',    
        }
      }
    }
});

grunt.registerTask('default', ['concat', 'uglify', 'less', 'imagemin', 'svgmin', 'autoprefixer', 'htmlmin']);
grunt.registerTask('dev', ['connect', 'watch']);  


};