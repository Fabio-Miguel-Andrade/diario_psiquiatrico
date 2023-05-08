function salvarCPF(cpfCadastro, tipoUser){
    database.ref("cpfCadastrados/" + cpfCadastro).set({
        cpf: cpfCadastro,
    }, (error) => {
        if (error) 
            alert("Erro ao salvar dados do Usuário!");
        else {
            alert("Usuário cadastrado com sucesso!");
  
            if(tipoUser == "medico")
                window.location.href = "Login.html";
            else
                window.location.href = "telaInicialMedico.html";
        }    
    })
}