var app;
var database;
var idUser = localStorage.getItem("id");
var dados_formulario;
var txt_ansiedade_paciente;
var txt_emocional_paciente;

function salvarPesquisaAnsiedade(){
    dados_formulario = document.getElementsByName("ansiedade");
    txt_ansiedade_paciente = "";
    var data = new Date();

    for(c = 0; c < dados_formulario.length; c++){
        if(dados_formulario[c].checked){
            txt_ansiedade_paciente = dados_formulario[c].id;
        }
    }

    if(txt_ansiedade_paciente != ""){
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
                
        //salvar no realtime database
        database.ref("usuarios/" + idUser + "/diarioHumor/" + dataAtual).set({
            ansiedade: txt_ansiedade_paciente,              
        }, (error) => {
            if (error) {
                alert("Erro ao salvar dado da pesquisa!");
            } else {
                window.location.href = "telaPesquisaHumor.html";
            }
        });
    }
    else{
        alert("Responda o questionário primeiro!");
    }
}

function salvarPesquisaHumor(){
    dados_formulario = document.getElementsByName("emocional");
    txt_emocional_paciente = "";
    var data = new Date();

    for(c = 0; c < dados_formulario.length; c++){
        if(dados_formulario[c].checked){
            txt_emocional_paciente = dados_formulario[c].id;
        }
    }

    if(txt_emocional_paciente != ""){
        var dia = String(data.getDate());
        var mes = String(data.getMonth() + 1);
        var ano = data.getFullYear();
        dataAtual = ano + '-' + mes + '-' + dia;
                
        //salvar no realtime database
        database.ref("usuarios/" + idUser + "/diarioHumor/" + dataAtual).update({
            emocional: txt_emocional_paciente,              
        }, (error) => {
            if (error) {
                alert("Erro ao realizar pesquisa!");
            } else {
                alert("Pesquisa realizada com sucesso!");
                window.location.href = "telaInicialPaciente.html";
            }
        });
    }
    else{
        alert("Responda o questionário primeiro!");
    }
}
