module.exports = function(grunt) {
    var QueryLoader2Banner = '' +
        '/*\n' +
        ' * QueryLoader v2 - A simple script to create a preloader for images\n' +
        ' *\n' +
        ' * For instructions read the original post:\n' +
        ' * http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/\n' +
        ' *\n' +
        ' * Copyright (c) 2011 - Gaya Kessler\n' +
        ' *\n' +
        ' * Licensed under the MIT license:\n' +
        ' *   http://www.opensource.org/licenses/mit-license.php\n' +
        ' *\n' +
        ' * Version:  <%= pkg.version %>\n' +
        ' * Last update: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' */\n';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n',
                banner: QueryLoader2Banner + "(function($){",
                footer: "})(jQuery);"
            },
            dist: {
                // the files to concatenate
                src: [
                    //load imagesloaded
                    'bower_components/eventie/eventie.js',
                    'bower_components/eventEmitter/EventEmitter.js',
                    'bower_components/imagesloaded/imagesloaded.js',

                    //own classes and files
                    'src/!(base).js',

                    //Finally the QueryLoader jQuery function binder
                    'src/base.js'
                ],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        removelogging: {
            dist: {
                src: "dist/<%= pkg.name %>.js",
                dest: "build/<%= pkg.name %>.js"
            },
			generate: {
				src: "dist/<%= pkg.name %>.js",
				dest: "<%= pkg.name %>.js"
			}
        },
        uglify: {
            options: {
                banner: QueryLoader2Banner
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            },
			generate: {
				src: 'build/<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['dev-watching'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-remove-logging");

    //register the task
    grunt.registerTask('build', ['concat', 'removelogging', 'uglify']);
    grunt.registerTask('dev-watching', ['concat:dist']);
};