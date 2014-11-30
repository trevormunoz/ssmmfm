module.exports = function(grunt) {

    'use strict';

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    //More later …

    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            compile: {
                options: {
                    outputSourceFiles: true
                },
                src: 'src/less/application.less',
                dest: 'dist/css/application.css'
            }
        },

        cssmin: {
            minify: {
                src: 'dist/css/application.css',
                dest: 'dist/css/application.min.css'
            }
        },

        jshint: {
            beforeopt: ['src/js/**/*.js']
        },

        watch: {
            css: {
                files: ['src/less/application.less'],
                tasks: ['less', 'cssmin']
            },
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint']
            }
        },

        connect: {
            server: {
                options: {
                    port: 5000,
                    base: '.',
                },
            },
        },

        mocha_phantomjs: {
            test: {
                options: {
                    urls: ['http://localhost:5000/test/test.html'],
                },
            }
        },

    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['connect', 'mocha_phantomjs']);
};