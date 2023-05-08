var app;
var database;
var cpfs = null;
var txt_nome_medico;
var txt_cpf_medico;
var txt_crm_medico;
var txt_email_medico;
var txt_senha_medico;
var txt_copia_senha;
 var val_dados;

function cadastrarMedico() {
    //variaveis que recebem os dados do formulario
    txt_nome_medico = document.getElementById("nomeMedico").value;
    txt_cpf_medico = document.getElementById("cpfMedico").value;
    txt_crm_medico = document.getElementById("crmMedico").value;
    txt_email_medico = document.getElementById("emailMedico").value;
    txt_senha_medico = document.getElementById("senhaMedico").value;
    txt_copia_senha = document.getElementById("copiaSenhaMedico").value;
        
    val_dados = validarDadosCadastro(txt_cpf_medico, txt_email_medico, "(11)11111111", txt_senha_medico, txt_copia_senha);

    if(val_dados) {
        //cria no authentication no firebase
        firebase
        .auth()
        .createUserWithEmailAndPassword(txt_email_medico, txt_senha_medico)
        .then((userCredential) => {
            var user = userCredential.user;

            //salvar no realtime database
            database.ref("usuarios/" + user.uid).set({
                nome: txt_nome_medico,
                cpf: txt_cpf_medico,
                crm: txt_crm_medico,
                email: txt_email_medico,
                senha: txt_senha_medico,
                estado: "Medico",
            }, (error) => {
                if (error) 
                    alert("Erro ao salvar dados do Médico!");
                else 
                    salvarCPF(txt_cpf_medico, "medico");
            });
        })
        .catch((error) => {
            alert("Erro ao salvar dados do Médico!");
        });
    }
}
