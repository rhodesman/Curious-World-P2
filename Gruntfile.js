module.exports = function (grunt) {
    "use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'css/build/app.css': 'scss/app.scss'
				}
			}
		},

		autoprefixer: {
            options: {
                browsers: ['last 2 version', '> 1%', 'ie 8', 'ie 9']
            },
			dist: {
				files: {
                    'css/app.css': 'css/build/app.css'
                }
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},

			sass: {
				files: [
					'scss/**/*.scss',
					'*/*.scss'
				],
				tasks: ['sass']
			},

			autoprefixer: {
				files: ['css/build/app.css'],
				tasks: ['autoprefixer']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('heroku', ['sass', 'autoprefixer']);
	grunt.registerTask('build', ['sass', 'autoprefixer']);
	grunt.registerTask('default', ['build', 'watch']);

};
