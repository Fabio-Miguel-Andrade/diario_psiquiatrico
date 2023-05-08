var idUser = localStorage.getItem("id");
var arrayIdsPacientes = [];
var flag = -1;
var refPacientesMedico;

function carregarPacientes(){
    refPacientesMedico = firebase.database().ref('usuarios/' + idUser + '/pacientes');
    refPacientesMedico.on('value', (snapshot) => {
        if(snapshot.exists()){
            const idPacientes = snapshot.val();

            for(var Id in idPacientes) {
                arrayIdsPacientes.push(Id);
                            
                refPaciente = firebase.database().ref('usuarios/' + Id);
                refPaciente.on('value', (snapshot) => {
                    if(snapshot.exists()){
                        flag++;
                        const DadosPacientes = snapshot.val();
                        let divPaciente = document.createElement('div');
                        divPaciente.classList.add('selecaoPaciente');
                        divPaciente.id = flag;
                                        
                        var conteudoNomePaciente = document.createTextNode("Nome Paciente: " + DadosPacientes.nome);
                        var conteudoCpfPaciente = document.createTextNode(" CPF Paciente: " + DadosPacientes.cpf);
                        var conteudoEmailPaciente = document.createTextNode(" Email Paciente: " + DadosPacientes.email);
                        var conteudoTelefonePaciente = document.createTextNode(" Telefone Paciente: " + DadosPacientes.telefone);                                    

                        var elementoAnterior = document.getElementById("tituloPagina");
                                        
                        divPaciente.addEventListener('click', function(event) {
                            abrirPaginaDados(this.id);
                        });
                                        
                        divPaciente.innerHTML += '<p>' + conteudoNomePaciente.textContent + '<p>';
                        divPaciente.innerHTML += '<p>' + conteudoCpfPaciente.textContent + '<p>';
                        divPaciente.innerHTML += '<p>' + conteudoEmailPaciente.textContent + '<p>';
                        divPaciente.innerHTML += '<p>' + conteudoTelefonePaciente.textContent + '<p>';

                        document.body.appendChild(divPaciente, elementoAnterior);
                        let pularLinha = document.createElement('br');
                        document.body.appendChild(pularLinha, elementoAnterior);
                    }     
                });
            }
        }
    });   
}

function abrirPaginaDados(idDivSelecionada){
    localStorage.setItem('idPaciente', arrayIdsPacientes[idDivSelecionada]);
    localStorage.setItem('tempoGrafico', 7);
    window.location.href = "telaMostrarDadosPaciente.html";
}
