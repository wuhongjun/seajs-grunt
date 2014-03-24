module.exports = function(grunt) {

    "use strict";

    var fs = require('fs'), pkginfo = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
    pkg: pkginfo,
    banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> | (c) 2014 DBPOO | MIT License */ ',

    // sass生成css
    sass: {
        dist: {
            options: {
                banner: '<%= banner %>',
                style: 'nested'
            },
            files: {
                'dist/css/uiqr.css' : 'src/sass/uiqr.scss'
            }
        },
        distmin: {
            options: {
                banner: '<%= banner %>',
                style: 'compressed',
                sourcemap: true
            },
            files: {
                'dist/css/uiqr.min.css' : 'src/sass/uiqr.scss'
            }
        }
    },

    // 压缩样式
    // cssmin: {
    //     minify: {
    //         options: {
    //           banner: '<%= banner %>'
    //         },
    //         files: {
    //           'dist/css/uiqr.min.css': ['dist/css/uiqr.css']
    //         }
    //     }
    // },

    transport: {
            options: {
                paths: ['.'],
                debug: false
            },
            dist: {
                options: {
                    idleading: 'js/'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '*.js',
                        dest: '.build/js'
                    }
                ]
            },
            jquery: {
                options: {
                    idleading: 'modules/jquery/'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/modules/jquery',
                        src: '*.js',
                        dest: '.build/modules/jquery'
                    }
                ]
            }
        },

    concat: {
        options: {
            include: 'self'
        },
        dist: {
            files: {
                'dist/js/main.js': ['.build/js/main.js','.build/js/spinning.js'],
                'dist/modules/jquery/jquery.js': ['.build/modules/jquery/jquery.js']
            }
        }
    },

    uglify: {
        dist : {
            options: {
                banner: '<%= banner %>\n'
            },
            files: {
                'dist/js/main.js' : ['dist/js/main.js']
            }
        },
        jquery : {
            options: {
                banner: '<%= banner %>\n'
            },
            files: {
                'dist/modules/jquery/jquery.js' : ['dist/modules/jquery/jquery.js']
            }
        }
    },

    compress: {
        dist: {
            options: {
                archive: ( 'zip/' + pkginfo.name + '-' + pkginfo.version + '.zip')
            },
            files: [
                { expand: true, src: ['app/*', 'dist/**'], dest: ''}
            ]
        }
    },

    watch: {
        sass: {
            files: ['src/scss/**/*.scss'],
            tasks: ['sass'],
            options: {
                livereload: true,
            }
        },
        js: {
            files: ['src/js/**/*.js'],
            tasks: ['transport','concat','uglify'],
            options: {
                livereload: true,
            }
        }
    }

    });

  // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cmd-transport');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    //grunt.loadNpmTasks('grunt-banner');

    // Default task(s).
    grunt.registerTask('js', ['transport','concat','uglify']);
    grunt.registerTask('build', ['sass','js']);
    grunt.registerTask('zip', ['compress']);
    grunt.registerTask('default', ['build','watch']);

};