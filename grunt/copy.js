exports.task = {
  bowerjs: {       
    expand: true,
    flatten: true,
    src: '<%= path.source %>/<%= path.components %>/<%= path.scripts %>/**/*.js',
    dest: '<%= path.build %>/<%= path.scripts %>/<%= path.components %>/', 
    filter: 'isFile'   
  }
};