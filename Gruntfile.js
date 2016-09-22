module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        gProj: appConfig,

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            libs: {
                files: {
                    'dist/js/vendor.js': [ 'bower_components/angular/angular.js', 'bower_components/cropperjs/dist/cropper.js' ],
                    'dist/js/app.js': [ 'app/js/*.js' ]
                }
            },
            styles: {
                files: {
                    'dist/css/vendor.css': [ 'bower_components/bootstrap-css-only/css/bootstrap.css', 'bower_components/cropperjs/dist/cropper.css' ],
                    'dist/css/styles.css': [ 'app/css/*.css' ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/vendor.js': [ 'dist/js/vendor.js' ],
                    'dist/js/app.js': [ 'dist/js/app.js' ],
                }
            }
        }
    });

    grunt.registerTask('default', ['concat', 'uglify']);

};
