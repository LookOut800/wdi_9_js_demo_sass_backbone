var Submission = {}

Submission.processForm = function(e,form,router){
  if(e.preventDefault) e.preventDefault();
  var title = $(form).find("input[name='sub-title']").val();
  var url = $(form).find("input[name='sub-url']").val();
  var text = $(form).find("input[name='sub-text']").val();
  var user_id = $(form).find("select[name='users']").val();

  Submission.postParams(title,url,text, router);
};

Submission.postParams = function(title, url, text, router){
  $.ajax({
    url: 'http://jwhacker.herokuapp.com/submissions',
    type: 'POST',
    data: {
      submission: {
        title: title,
        url: url,
        body: text
      }
    },
    complete: function(jqXHR,textStatus){
      trace(jqXHR, textStatus, "complete post!!");
    },
    success: function(data, textStatus, jqXHR){
      router.navigate("home",{trigger: true});
      trace(data,textStatus, jqXHR, "successful post!!");
    },
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "done ajax!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("home",{trigger: true});
  });
};
