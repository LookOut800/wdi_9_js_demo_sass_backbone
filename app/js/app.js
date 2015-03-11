'use strict';
function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'submissions/:id': 'submissions',
    'comments': 'comments',
    'new-submission': 'newSubmission'
  },

  home: function(){
    $('#container').empty();
    $.ajax({
      url: 'http://jwhacker.herokuapp.com/submissions',
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#homeTemplate').html());
      $('#container').html(template({
        submission: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace('always doing something',response);
    });
  },

  submissions: function(id){
    $('#container').empty();
    $.ajax({
      url: 'http://jwhacker.herokuapp.com/submissions/' + id,
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#submissionTemplate').html());
      $('#container').html(template({
        submission: response
      }));
    }).fail(function(jqXHR,textStatus,errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

  comments: function(){
    $('#container').empty();
    $.ajax({
      url: 'http://jwhacker.herokuapp.com/comments.json',
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#commentTemplate').html());
      $('#container').html(template({
        comment: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace('always doing something',response);
    });
  },

  newSubmission: function(){
    $('#container').empty().load('partials/submission-form.html', function(response,status,xhr){
      var $form = $('#new-submission-form');
      $form.on('submit', function(e){
        Submission.processForm(e,$form,router);
      });
    });
  }
});

var router = new Router();
Backbone.history.start();

$(document).ajaxStart(function(e){
  trace(e, 'starting an ajax request');
  $('section#ajax-preloader').fadeIn();
  $('section#container').fadeOut();
});

$(document).ajaxComplete(function(event, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});















