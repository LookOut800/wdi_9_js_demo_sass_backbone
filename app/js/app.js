/*global $:false */
'use strict';

function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}};

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'comments': 'comments',
    'new-submission': 'newSubmission',
    'submissions/:id': 'submissions'
  },

  home: function(){
    $.ajax({
      url: 'http://jwhacker.herokuapp.com/submissions'
    }).done(function(response){
      var template = Handlebars.compile($('#homeTemplate').html());
      $('#container').html(template({
        submissions: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrow){
      trace(jqXHR, textStatus, errorThrow);
    })
  },

  comments: function(){
    $('#container').empty();
    $.ajax({
      url: 'http://jwhacker.herokuapp.com/submissions'
    }).done(function(response){
      var template = Handlebars.compile($('#commentsTemplate').html());
      $('#container').html(template({
        submissions: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrow){
      trace(jqXHR, textStatus, errorThrow);
    });
  },

  newSubmission: function(){
    $('#container').empty().load('partials/submission-form.html', function(response,status,xhr){
      var $form = $('#new-submission-form');
      $form.on('submit', function(event){
        Submission.processForm(event,$form,router);
      });
    });
  },

  submissions: function(id){
    $('#container').empty();
    $.ajax({
      url: 'http://jwhacker.herokuapp.com/submissions/' + id,
      type: 'GET',
    }).done(function(response) {
      var template = Handlebars.compile($('#submissionTemplate').html());
      $('#container').html(template({
        submission: response
      }));
    }).fail(function() {
      console.log("error");
    }).always(function() {
      console.log("complete");
    });
  }
});

var router = new Router();
Backbone.history.start();

$(document).ajaxStart(function(e){
  trace(e, "starting an ajax request");
  $('section#ajax-preloader').fadeIn();
  $('section#container').fadeOut();
});

$(document).ajaxComplete(function(event, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});
