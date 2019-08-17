var nombreUsuario = $('#user')
var pass = $('#pass')
$('.loginButton').on('click', function(event) {
    if (nombreUsuario.val() != "" && pass.val() != "") {
        $.post('/login',{user: nombreUsuario.val(), pass: pass.val()}, function(response) {
            if (response == "Validado") {
                window.location.href = "http://localhost:3000/main.html"
            }else{
                alert("Usuario o Contraseña incorrecto, por favor verifique de nuevo")
            }
        })
    } else {
        alert("Complete todos los campos")
    }                                                                           
}) 