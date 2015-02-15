exports.task = {
  options: {
    separator: '\n'
  },
  build: {
    options: {
      banner: '<%= banner.exapanded %>'
    },
    files: {
      '<%= path.build %>/<%= path.scripts %>/app.js': '<%= path.source %>/<%= path.scripts %>/*.js',
    }
  }
};