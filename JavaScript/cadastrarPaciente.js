var database;
var idMedico = localStorage.getItem("id");
var txt_nome_paciente;
var txt_cpf_paciente;
var txt_email_paciente;
var txt_telefone_paciente;
var txt_senha_paciente;
var txt_copia_senha;
var val_dados;

function cadastrarPaciente(){
    txt_nome_paciente =  document.getElementById("nomePaciente").value;
    txt_cpf_paciente = document.getElementById("cpfPaciente").value;
    txt_email_paciente = document.getElementById("emailPaciente").value;
    txt_telefone_paciente = document.getElementById("telefonePaciente").value;
    txt_senha_paciente = document.getElementById("senhaPaciente").value;
    txt_copia_senha = document.getElementById("copiaSenhaPaciente").value;

    val_dados = validarDadosCadastro(txt_cpf_paciente, txt_email_paciente, txt_telefone_paciente, txt_senha_paciente, txt_copia_senha);

    if(val_dados) {
        firebase
        .auth()
        .createUserWithEmailAndPassword(txt_email_paciente, txt_senha_paciente)
        .then((userCredential) => {
            var user = userCredential.user;
            var IdUserCriado = user.uid;

            //salvar no realtime database
            database.ref("usuarios/" + user.uid).set({
                nome            :txt_nome_paciente,
                cpf             :txt_cpf_paciente,   
                email           :txt_email_paciente,
                telefone        :txt_telefone_paciente,
                senha  	        :txt_copia_senha,
                estado          :"Paciente",
            });

            database.ref("usuarios/" + idMedico + "/pacientes/" + IdUserCriado).set({
                id: IdUserCriado,
            }, (error) => {
                if (error) {
                    alert("Erro ao cadastrar paciente!");
                } 
                else {
                    salvarCPF(txt_cpf_paciente);
                }
            });
        })
        .catch((error) => {
            alert("Erro!! Não foi possível realizar o cadastro!");
            var errorCode = error.code;
            var errorMessage = error.message;
        });            
    }  
}
