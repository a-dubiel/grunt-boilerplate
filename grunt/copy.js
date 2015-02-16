exports.task = {
  bowerutils: {       
    expand: true,
    flatten: true,
    cwd: '<%= path.source %>/<%= path.components %>',
    src: ['**/modernizr.js', '**/jquery.js'],
    dest: '<%= path.build %>/<%= path.scripts %>/<%= path.components %>'
  },  
  misc: {       
    expand: true,
    cwd: '<%= path.source %>/<%= path.misc %>',
    src: '**/*',
    dest: '<%= path.build %>', 
    dot: true 
  }
};