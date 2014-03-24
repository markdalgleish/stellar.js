module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: require('./package.json'),
		meta: {
			banner: '/*!\n' +
				' * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
				' * <%= pkg.homepage %>\n' +
				' *\n' +
				' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
				' * This content is released under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license<%= pkg.licenses.length === 1 ? "" : "s" %>\n' +
				' * <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
				' */\n\n',
			microbanner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> | <%= pkg.homepage %> | <%= _.pluck(pkg.licenses, "url").join(", ") %> */\n'
		},
		jshint: {
			files: ['Gruntfile.js', 'test/**/*.js', 'src/**/*.js'],
			options: {
				evil: true,
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				browser: true,
				node: true,
				predef: {
					jQuery: true
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8573
				}
			}
		},
		qunit: {
			all: {
				options: {
					urls: ['1.4.3', '1.10.1', '2.0.2'].map(function(version) {
						return 'http://localhost:<%= connect.server.options.port %>/test/jquery.stellar.html?jquery=' + version;
					})
				}
			}
		},
		concat: {
			options: {
				banner: '<%= meta.banner %>',
				stripBanners: true
			},
			dist: {
				src: ['src/<%= pkg.name %>.js'],
				dest: '<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.microbanner %>'
			},
			dist: {
				src: ['<%= concat.dist.dest %>'],
				dest: '<%= pkg.name %>.min.js'
			}
		},
		watch: {
			files: '<%= jshint.files %>',
			tasks: ['server', 'jshint', 'qunit']
		}
	});

	grunt.registerTask('default', ['connect', 'jshint', 'qunit', 'concat', 'uglify']);
	grunt.registerTask('test', ['connect', 'jshint', 'qunit']);

};
