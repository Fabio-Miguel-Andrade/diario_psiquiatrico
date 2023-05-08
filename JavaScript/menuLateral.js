

function abrirMenuLateral() {
    document.getElementById("Menu").style.width = "350px";
    document.getElementById("tituloHeader").style.marginLeft = "350px";
}
  
function fecharMenuLateral() {
    document.getElementById("Menu").style.width = "0px";
    document.getElementById("tituloHeader").style.marginLeft = "0px";
}

function sair(){
    localStorage.clear();
    window.location.href = "Login.html";
}

function situacaoPesquisa(){
    var idUser = localStorage.getItem("id");
    var data = new Date();
    var dia = String(data.getDate());
    var mes = String(data.getMonth() + 1);
    var ano = data.getFullYear();

    if(dia < 10){
        dia = "0" + dia;
    }

    if(mes < 10){
        mes = "0" + mes;
    }

    dataAtual = ano + '-' + mes + '-' + dia;
    var pesquisa = database.ref("usuarios/" + idUser + "/diarioHumor/" + dataAtual);
    pesquisa.on('value', (snapshot) => {
        if (snapshot.exists()) {
            alert("Pesquisa já realizada hoje!");
            document.getElementById("Menu").style.width = "0px";
            document.getElementById("tituloHeader").style.marginLeft = "0px";
        }else{
            window.location.href = "telaPesquisaAnsiedade.html";
        }
    })
}
