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

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= gProj.app %>/index.html'],
                exclude: [
                    '/wow/',
                    '/cropperjs/'
                ],
                ignorePath:  /\.\.\//
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= gProj.dist %>/{,*/}*',
                        '!<%= gProj.dist %>/.git{,*/}*'
                    ]
                }]
            }
        },

        concat: {
            scripts: {
                src: '<%= gProj.app %>/js/*.js',
                dest: '<%= gProj.dist %>/js/app.js'
            },
            styles: {
                src: '<%= gProj.app %>/css/*.css',
                dest: '<%= gProj.dist %>/css/styles.css'
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= gProj.dist %>/js/vendor.js': [ '<%= gProj.dist %>/js/vendor.js' ],
                    '<%= gProj.dist %>/js/app.js': [ '<%= gProj.dist %>/js/app.js' ],
                }
            }
        },


        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                  '<%= gProj.dist %>/js/{,*/}*.js',
                  '<%= gProj.dist %>/css/{,*/}*.css',
                  '<%= gProj.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                  '<%= gProj.dist %>/css/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= gProj.app %>/index.html',
            options: {
                dest: '<%= gProj.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglify']
                            //css: ['cssmin']
                        }
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= gProj.dist %>/{,*/}*.html'],
            css: ['<%= gProj.dist %>/css/{,*/}*.css'],
            options: {
                assetsDirs: [
                  '<%= gProj.dist %>',
                  '<%= gProj.dist %>/images',
                  '<%= gProj.dist %>/css'
                ]
            }
        }

    });

    grunt.registerTask('default', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concat',
        'uglify',
        'filerev',
        'usemin',
    ]);

};
