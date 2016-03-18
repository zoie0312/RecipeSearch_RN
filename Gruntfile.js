module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sync: {
      main: {
        files: [
          {cwd: 'src/' ,src: ['**/*.js'], dest: '../../../home/vagrant/temp/testReact3/src', filter: 'isFile'}, // includes files in path and its subdirs
          {cwd: './', src: ['*.js'], dest: '../../../home/vagrant/temp/testReact3', filter: 'isFile'}
        ],
        verbose: true, // Default: false
        //pretend: true, // Don't do any disk operations - just write log. Default: false
        failOnError: true, // Fail the task when copying is not possible. Default: false
        //ignoreInDest: "**/*.js", // Never remove js files from destination. Default: none
        //updateAndDelete: true, // Remove all files from dest that are not found in src. Default: false
        compareUsing: "md5" // compares via md5 hash of file contents, instead of file modification time. Default: "mtime"

      }
    },
    watch: {
      scripts: {
        files: ['*.js', 'src/**/*.js'],
        tasks: ['sync']
        // options: {
        //   event: ['added', 'deleted'],
        // },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sync', 'watch']);

};