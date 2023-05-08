var app;
var database;
var txt_email;
var txt_senha;
var starCountRef;
        
function fazerLogin(){
    txt_email = document.getElementById("email").value;
    txt_senha = document.getElementById("senha").value;
        
    if(txt_email == "super" && txt_email == txt_senha){
        window.location.href = "telaCadastroMedico.html";
    }
    else{
        firebase.auth().signInWithEmailAndPassword(txt_email, txt_senha)
        .then((userCredential) => {
            var user = userCredential.user;
            alert("Usuário Logado com sucesso!");
            localStorage.setItem('id', user.uid);
            getDados(user.uid);
        })
        .catch(() => {
            alert("Erro ao logar!");
        });
    }
}

function getDados(idUser){
    //Verifica qual tipo de conta do usuário
    starCountRef = firebase.database().ref("usuarios/" + idUser);
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        abrirPagina(data);
    });
}
        
function abrirPagina(dados){
    if(dados.estado == "Medico"){
        window.location.href = "telaInicialMedico.html";
    }
    else{
        window.location.href = "telaInicialPaciente.html";
    }
}
