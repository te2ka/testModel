$.index.open();

$.index.addEventListener('focus', function(e){
  library.fetch();
});

$.add.addEventListener('click', function(e){
  var newUser = Alloy.createModel('user', {
    name:  $.userName.value,
    age:   $.userAge.value,
    email: $.userEmail.value,
  });

  /* validate */
  if(newUser.isValid()){
    newUser.save();
    alert('success');
    $.userName.setValue('');
    $.userAge.setValue('');
    $.userEmail.setValue('');
  } else{
    alert(newUser.errorMsg.join("\n"));
  }
});

/* これ重要 */
function transFormFunction(model){
  var transform = model.toJSON();
  return transform;
}

function doClick(e){
  Ti.API.debug(e);
  alert('name: ' + e.row.title);
}

/* これ重要 */
var library = Alloy.Collections.user;
library.fetch();
