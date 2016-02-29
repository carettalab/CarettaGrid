module.exports = function(grunt) {

  //Grunt config nesnesi
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    // Task ayarları
    less: {
      development: {
        options: {
              compress: true,  //sıkıştırma açık?
            },
            files: {
              //project.less dosyası ve içeriğini (değişkenler ve ana bootstrap öğelerini içerir) site.css dosyasına yaz
              "../assets/css/<%= pkg.name %>.css":"../_source/css/project.less",
            }
          }
        },
        concat: {
          options: {
            separator: ';',
          },
          js_frontend: {
            src: [
          // Bootstrap içerisindeki kullanılan kütüphaneler ve project.js yi birleştir
          // Kullanılmayan bootstrap dosyaları commentlenebilir
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap/js/transition.js',
          './bower_components/bootstrap/js/alert.js',
          './bower_components/bootstrap/js/button.js',
          './bower_components/bootstrap/js/carousel.js',
          './bower_components/bootstrap/js/collapse.js',
          './bower_components/bootstrap/js/dropdown.js',
          './bower_components/bootstrap/js/modal.js',
          './bower_components/bootstrap/js/tooltip.js',
          './bower_components/bootstrap/js/popover.js',
          './bower_components/bootstrap/js/scrollspy.js',
          './bower_components/bootstrap/js/tab.js',
          './bower_components/bootstrap/js/affix.js',
          '../_source/js/plugins/nicescroll.js',
          '../_source/js/project.js'
          ],
          dest: '../assets/js/<%= pkg.name %>.js',
        },

      },
      watch: {
        less: {
          files: ['../_source/css/project.less','../_source/css/include.less'],
          tasks: ['less'],
          options: {
            interrupt: true,
          },
        },
         concat: {
          files: ['../_source/js/project.js'],
          tasks: ['concat'],
          options: {
            interrupt: true,
          },
        }
      },
      copy: {
      bootstrapfonts: { //bootstrap içindeki fonts dosyasını otomatik olarak assets e taşı
        expand: true,
        src: '*',
        cwd: './bower_components/bootstrap/fonts/',
        dest: '../assets/fonts/'
      },
      fonts: { //bootstrap içindeki fonts dosyasını otomatik olarak assets e taşı
        expand: true,
        src: '*',
        cwd: '../_source/fonts/',
        dest: '../assets/fonts/'
      },
      holderjs:{
        expand: true,
        src: 'holder.js',
        cwd: './bower_components/holderjs/',
        dest: '../assets/js/'
      },
      fafonts: { //bootstrap içindeki fonts dosyasını otomatik olarak assets e taşı
        expand: true,
        src: '*',
        cwd: 'bower_components/components-font-awesome/fonts/',
        dest: '../assets/fonts/'
      },
      html:{
        expand: true,
        src: '*',
        cwd: '../_source/html/',
        dest: '../'
      }
    },
    uglify: {
      options: {
        mangle: false  // fonksiyon adları ve değişkenler saçmalasın mı?
      },
      frontend: { //concat:js_frontend fonksiyonu tarafından derlenmiş project.js dosyasını sıkıştır
        files: {
          '../assets/js/<%= pkg.name %>.js': '../js/<%= pkg.name %>.js',
        }
      },

    },
      notify: {
          less:{
              options:{
                  title: "CSS Files built",
                  message: "Less task complete"
              }
          },
          js:{
              options:{
                  title: "JS Files built",
                  message: "Js task complete"
              }
          }
      }
    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Task tanımlamaları özel olarak gerçekleştirilebilir
  grunt.registerTask('default', ['less', 'concat:js_frontend', 'copy:bootstrapfonts', 'copy:fonts', 'uglify','watch']);

};
