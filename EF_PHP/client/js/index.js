$(function(){
  var l = new Login();
})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent(){
    $('form').submit((event)=>{
      event.preventDefault()
      this.sendForm()
    })
  }

  sendForm(){
    var user = $('#user').val()
    var pass = $('#password').val()
    $.ajax({
      url: '../server/check_login.php',
      data: {
        user : user,
        pass : pass
      },
      type: 'POST',
      success: function(php_response){
        if (php_response == "OK") {
          window.location.href = 'main.html';
        }else {
          alert("Contraseña / Usuario incorrecto, por favor verifique la información.");
        }
      },
      error: function(){
        alert("Error en la comunicación con el servidor");
      }
    })
  }
}
