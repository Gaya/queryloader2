module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ''
            },
            dist: {
                // the files to concatenate
                src: [
                    //own classes and files
                    'src/!(QueryLoader2).js',

                    //Finally the Configuro initor
                    'src/QueryLoader2.js'
                ],
                // the location of the resulting JS file
                dest: ['dist/<%= pkg.name %>.js', '<%= pkg.name %>.js']
            }
        },
        removelogging: {
            dist: {
                src: "dist/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>-clean.js"
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>-clean.js',
                dest: ['build/<%= pkg.name %>.min.js', '<%= pkg.name %>.min.js']
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
    grunt.registerTask('default', ['concat', 'removelogging', 'uglify']);
    grunt.registerTask('dev-watching', ['concat']);
};