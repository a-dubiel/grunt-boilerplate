exports.task = {
  bowerjs: {       
    expand: true,
    flatten: true,
    src: '<%= path.source %>/<%= path.components %>/**/*.js',
    dest: '<%= path.build %>/<%= path.scripts %>/<%= path.components %>/', 
    filter: 'isFile'   
  }
};