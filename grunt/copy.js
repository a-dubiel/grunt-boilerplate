exports.task = {
  bowerjs: {       
    expand: true,
    flatten: true,
    cwd: '<%= path.source %>/<%= path.components %>',
    src: '**/*.js',
    dest: '<%= path.build %>/<%= path.scripts %>/<%= path.components %>/', 
    filter: 'isFile'   
  },
  misc: {       
    expand: true,
    cwd: '<%= path.source %>/<%= path.misc %>',
    src: '**/*',
    dest: '<%= path.build %>', 
    dot: true 
  }
};