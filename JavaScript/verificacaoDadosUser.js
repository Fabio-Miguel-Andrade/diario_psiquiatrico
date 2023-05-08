var app;
var database;
var cpfs = null;
var padraoEmail;
var verificacao;
var padraoTelefone;
var refPacientesMedico;
var str;
var array;
var pdv;
var sdv;

function validarDadosCadastro(cpf, email, telefone, senha, copia_senha){

  //Verifica todos os dados
  if(validarCPF(cpf) && verificarCpfReptido(cpf) && verificarEmail(email) && verificarTelefone(telefone) && verificarSenha(senha, copia_senha)){
    return true;
  }
  else{ 
    return false;
  }
}

function verificarEmail(email){
  padraoEmail = /\S+@\S+\.\S+/;
  verificacao = padraoEmail.test(email);

  if(!verificacao){
    alert("Email inválido!");
  }

  return verificacao;
}

function verificarTelefone(telefone){
  padraoTelefone = /\(\d{2}\)\d{8,9}/g;
  verificacao = padraoTelefone.test(telefone);

  if(!verificacao){
    alert("Numero de telefone fora do formato padrão!");
  }

  return verificacao;
}

function verificarSenha(senha, copiaSenha) {
  if (senha == copiaSenha && senha != "") {
    return true;
  } 
  else {
    alert("Senhas digitadas inválidas!");
    return false;
  }
}

function retornarCpfsCadastrados() {
  refPacientesMedico = firebase.database().ref('cpfCadastrados/');
  refPacientesMedico.on('value', (snapshot) => {
    if (snapshot.exists()) {
      cpfs = snapshot.val();
    } 
  });
}

function verificarCpfReptido(cpfCadastro) {
  flag = 0;
  for(cpf in cpfs){
    if(cpf == cpfCadastro){
      flag++;
    }
  }

  if(flag >= 1){
    alert("CPF já cadastrado!");
    return false;
  }
  else{
    return true;
  }
}

function validarCPF(valCPF) {
  //valCPF = variavel que recebe o valor digitado no campo de CPF.

  str = valCPF
  array = [...str]
  
  if (array.length == 11) {
      var soma1 = 0;

      for(c = 0; c <= 8; c++){
        soma1 += parseInt(array[c]) * (c + 1);
      }

      var divPDV = soma1 % 11

      if (divPDV == 10) {
          pdv = 0
      } else {
          pdv = divPDV
      }

      var soma2 = 0;

      for(c = 0; c <= 8; c++){
        soma2 += parseInt(array[c]) * (c);
      }

      soma2 += pdv * 9;

      var divSDV = soma2 % 11

      if (divSDV == 10) {
          sdv = 0
      } else {
          sdv = divSDV
      }

      //*******************************VERIFICAR*******************************

      if (array[9] == pdv && array[10] == sdv) {
          return true;
      } else {
          alert("CPF inválido");
          return false;
      }
  } else {
      alert("CPF inválido");
      return false;
  }
}
