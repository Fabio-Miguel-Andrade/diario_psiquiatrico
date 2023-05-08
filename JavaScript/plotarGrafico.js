var tempoPesquisa;
var idPaciente;
var count;
var refPaciente;

function selecionarDias(){
    tempoPesquisa = localStorage.getItem("tempoGrafico");
    var ansiedade = new Array();
    var humor = new Array();
    var labelX = new Array();
    var dataMinima = new Date();
    idPaciente = localStorage.getItem("idPaciente");
    count = 0;

    dataMinima.setDate(dataMinima.getDate() - tempoPesquisa);

    refPaciente = firebase.database().ref('usuarios/' + idPaciente + '/diarioHumor');
    refPaciente.on('value', (snapshot) => {
        if(snapshot.exists()){
            const diarioHumor = snapshot.val();
                        
            for(var dia in diarioHumor){
                var dataQuestionario = new Date(dia);

                if(dataQuestionario >= dataMinima){
                    var dadosPesquisa = selecionarPesquisa(idPaciente, dia);

                    if(dadosPesquisa.ansiedade != null && dadosPesquisa.humor != null){
                        ansiedade.push(dadosPesquisa.ansiedade);
                        humor.push(dadosPesquisa.humor);
                        var mes = dataQuestionario.getMonth() + 1;
                        if (mes >= 10) {
                            count++;
                        }else{
                            var dia = dataQuestionario.getUTCDate()
                            var ano = dataQuestionario.getFullYear();
                            var dataLabelX = dia + '/' + mes + '/' + ano;
                            labelX.push(dataLabelX);
                        }
                    }
                }
            }
            
            if (count != 0) {
                for(var dia in diarioHumor){
                    var dataQuestionario = new Date(dia);

                    if(dataQuestionario >= dataMinima){
                        var dadosPesquisa = selecionarPesquisa(idPaciente, dia);

                        if(dadosPesquisa.ansiedade != null && dadosPesquisa.humor != null){
                            ansiedade.push(dadosPesquisa.ansiedade);
                            humor.push(dadosPesquisa.humor);
                            var mes = dataQuestionario.getMonth() + 1;
                            if (mes >= 10) {
                                var dia = dataQuestionario.getUTCDate()
                                var ano = dataQuestionario.getFullYear();
                                var dataLabelX = dia + '/' + mes + '/' + ano;
                                labelX.push(dataLabelX);
                            }
                        }
                    }
                }
            }
            
            criarGrafico(labelX, ansiedade, 'Ansiedade', document.getElementById("graficoAnsiedade"));
            criarGrafico(labelX, humor, 'Humor', document.getElementById("graficoHumor"));
        }
        else
            alert("Não há dados para serem apresentados");
    });
}

function selecionarPesquisa(idPaciente, dia){
    humor = null;
    ansiedade = null; 
    refPaciente = firebase.database().ref('usuarios/' + idPaciente + '/diarioHumor/' + dia);
    refPaciente.on('value', (snapshot) => {
        if(snapshot.exists()){
            const valoresDiarioHumor = snapshot.val();

            ansiedade = valoresDiarioHumor.ansiedade;
            humor = valoresDiarioHumor.emocional;
        }
    });

    return {ansiedade, humor};
}
        
function criarGrafico(labelX, labelY, tipoGrafico, ctx){
    var config = null;
    if(tipoGrafico == 'Ansiedade') {
        config = {
            type: 'bar',
            data: {
                labels: labelX,
                datasets: [{
                    label: tipoGrafico + ' do Paciente',
                    data: labelY,
                    borderColor: 'rgb(123, 104, 238)',
                    backgroundColor: 'rgb(123, 104, 238)',
                    spanGaps: true
                }]
            },
            options: {
                scales:{  
                    y: {
                        min: 0,
                        max: 4,
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index) {
                                console.log(this.getLabelForValue(value))
                                if (this.getLabelForValue(value) == 4){
                                    return 'Ansiedade excessiva'
                                }else if (this.getLabelForValue(value) == 3) {
                                    return 'Ansiedade normal'
                                }else if (this.getLabelForValue(value) == 2) {
                                    return 'Pouco ansioso'
                                }else if (this.getLabelForValue(value) == 1) {
                                    return 'Não ansioso'
                                }
                            }
                        }
                    }
                }
            }
        };
    }
    else{
        config = {
            type: 'bar',
            data: {
                labels: labelX,
                datasets: [{
                    label: tipoGrafico + ' do Paciente',
                    data: labelY,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgb(75, 192, 192)',
                    spanGaps: true
                }]
            },
            options: {
                scales:{  
                    y: {
                        min: 0,
                        max: 7,
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index) {
                                console.log(this.getLabelForValue(value))
                                if (this.getLabelForValue(value) == 7){
                                    return 'Euforico'
                                }else if (this.getLabelForValue(value) == 6) {
                                    return 'Agressivo'
                                }else if (this.getLabelForValue(value) == 5) {
                                    return 'Irritado'
                                }else if (this.getLabelForValue(value) == 4) {
                                    return 'Muito Triste'
                                }else if (this.getLabelForValue(value) == 3) {
                                    return 'Triste'
                                }else if (this.getLabelForValue(value) == 2) {
                                    return 'Normal'
                                }
                                else if (this.getLabelForValue(value) == 1) {
                                    return 'Apatico'
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    

    const myChart = new Chart(ctx, config);
}

function mudarTempo(tempoDias){
    localStorage.setItem('tempoGrafico', tempoDias);
    window.location.href = "telaMostrarDadosPaciente.html";
}
