var idUser = localStorage.getItem("idPaciente");
localStorage.setItem('tempoGrafico', 7);
var id;
var starCountRef;
var pNome;
var pEmail;
var pCPF;

function pegarDados(){
    id = localStorage.getItem('id');
    starCountRef = firebase.database().ref("usuarios/" + id);
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        pNome = document.getElementById("pNome");
        pNome.innerHTML = data.nome;
        pEmail = document.getElementById("pEmail");
        pEmail.innerHTML = data.email;
        pCPF = document.getElementById("pCPF");
        pCPF.innerHTML = data.cpf;
    })
}
