

//coloca um observer para mudar o valoresFirebase sempre que alterar o firebase
var firebaseGasCathCollection = firebase.database().ref().child('gasCath');
//FODA-SE EH FARIAVEL GLOBAL MERMOOOOO, TO MA NO CU HATTERS
var vetorrelatorio = [];




firebaseGasCathCollection.on('value', function (valores) {
    var allNoHtml = "";

    //zera os valores antigos
    vetorrelatorio = [];

    //ai para cada ele..
    valores.forEach(function (_firebaseReference) {
        //debugger;
        var _valor = _firebaseReference.val();

        var _dataResumida = new Date(parseInt(_valor.valorAno), parseInt(_valor.valorMes) - 1, parseInt(_valor.valorDia), 13, 30, 0, 0);
        vetorrelatorio.push([_dataResumida, _valor.hidrometroGas]);


        var pedacinhosHtml = `<div class='item'>
                                <p>dia: `+ _valor.valorDia + `</p>
                                <p>mes: `+ _valor.valorMes + `</p>
                                <p>ano: `+ _valor.valorAno + `</p>
                                <p>contagem: `+ _valor.hidrometroGas + `</p>
                            </div>`;

        allNoHtml = allNoHtml + pedacinhosHtml;
    });


    //aqui eu nao sei como mais isso aqui ordena pela primeira coluna...
    // vetorrelatorio.sort(sortFunction);
    // function sortFunction(vetorrelatorio, b) {
    //     if (vetorrelatorio[0] === b[0]) {
    //         return 0;
    //     }
    //     else {
    //         return (vetorrelatorio[0] < b[0]) ? -1 : 1;
    //     }
    // }



    $('#valoresFirebase').html(allNoHtml);

});





document.getElementById("testeCalendario").onclick = function testeCalendario() {
    var propriedadeMostrada = "usoDiario"; //o que sera mostrado

    var dataDoCalendario = new Date(document.getElementById("dataDoCalendario").value);
    // dataDoCalendario = document.getElementById("dataDoCalendario").value;
    //
    //var date = 
    var firstDay = new Date(dataDoCalendario.getFullYear(), dataDoCalendario.getMonth(), 1);
    var lastDay = new Date(dataDoCalendario.getFullYear(), dataDoCalendario.getMonth() + 1, 0);
    var _lastDay;
    _lastDay = lastDay.getDate();
    //
    var _firstDay = firstDay.getDay();
    var acabou = false;
    var text = "";
    var tempDia = 1;
    var custoDia; //custo do dia
    var diaFoco; //data que esta sendo processada agora
    //
    text = dataDoCalendario.toLocaleString(this.locale, { month: "long" });
    text += "<br>";
    //
    for (var j = 0; j < 31 && acabou == false; j++) {
        for (var i = 0; i < 7 && acabou == false; i++) {
            //debugger;
            if (i < _firstDay) {
                text += " -- ";
            }
            else {
                //pendente consertar essa merda, ta mau otimizado
                diaFoco = new Date(dataDoCalendario.getFullYear(), dataDoCalendario.getMonth(), tempDia);
                custoDia = retornaCustoDia(diaFoco);
                text += "   " + tempDia + "(" + custoDia[teste1847].toFixed(1) + ")   ";
                tempDia++;
                if (tempDia > _lastDay) {
                    acabou = true;
                }
            }
        }
        _firstDay = 0;
        text += "<br>";
    }
    //
    document.getElementById("calendario").innerHTML = text;
}


function retornaCustoDia(custoDia) {

    //funcao que recebe o dia, e retorna o custo da diaria
    var menorData = "";
    var menorvalorDaData = "";
    var segMenorData = "";
    var segMenorvalorDaData = "";
    var diferencaDias = "?";
    var diferencaHidr = "";
    var usoDiario = "";



    //pendente otimizar essa merda colocando os dois no mesmo forEach


    //acho o menor elemento
    vetorrelatorio.forEach(element => {

        //se ainda tiver vazio inicio
        if (menorData == "") {
            menorData = element[0];
            menorvalorDaData = element[1];
        }

        //descubro o menor incluindo custom dia
        if (element[0] > menorData) {
            if (element[0] <= custoDia) {
                menorData = element[0];
                menorvalorDaData = element[1];
            }
        }
    });


    //agora acho o menor depois do "menordata"
    vetorrelatorio.forEach(element => {
        //

        if (element[0] > custoDia) {
            if (segMenorData == "") {
                //caso seja a primeira
                segMenorData = element[0];
                segMenorvalorDaData = element[1];
            } else {
                //nao eh a primeira, eu verifico se eh menor que a anterior, pq eu quero a menor possivem que chegar aqui
                if (segMenorData > element[0]) {
                    //aqui eh o pulo do gato, eu nao quero um igual, eu quero um maior!
                    segMenorData = element[0];
                    segMenorvalorDaData = element[1];
                }
            }
        }
        //CONTINUA AQUI!!!!!! RESOLVE ISSO! DESCOBRIR O MENOR DEPOIS DO custoDia
    });



    //pego o valor depois desse (menor ou igual valor ao dia) (proxomo)

    //pego quantos dias se passaram, e divido o valor pelos dias

    //retorno o valor da divisao. caso nao tenha um segundo valor, ou seja, nao tenho como achar o valor do dia
    //entao retorno uma interrogacao
    // if (element[0] > custoDia) {
    //     segMenorData = element[0];
    //     console.log("menorData:   " + menorData);
    //     console.log("segmenorData:   " + segMenorData);
    //     console.log("diferencaDias:    " + diferencaDias);
    //     //return false;
    // }

    //PENDENTE VERIFICAR SE EH IGUAL
    //PENDENTE ENVIAR A MEDIA DE USO POR DIA TB!



    diferencaHidr = segMenorvalorDaData - menorvalorDaData;
    diferencaDias = Math.floor((segMenorData - menorData) / (1000 * 60 * 60 * 24));
    console.log("------------------------------------");
    console.log("para a data: " + custoDia);
    console.log("E menor dia eh: " + menorData);
    console.log(menorvalorDaData);
    console.log("E o segundo menor eh: " + segMenorData);
    console.log(segMenorvalorDaData);
    console.log("A diferenca de dias eh: " + diferencaDias);
    console.log("diferencaHidr: " + diferencaHidr);
    console.log("Vetor com todas as datas abaixo ... ");
    console.log(vetorrelatorio);
    console.log("------------------------------------");
    //return diferencaHidr + "/" + diferencaDias + "=" + (diferencaHidr / diferencaDias).toFixed(1); //se chegar aqui eh problema
    usoDiario = diferencaHidr / diferencaDias;

    objDeRetorno = {
        menorData: menorData,
        menorvalorDaData: menorvalorDaData,
        segMenorData: segMenorData,
        segMenorvalorDaData: segMenorvalorDaData,
        diferencaHidr: diferencaHidr,
        usoDiario: usoDiario
    }

    return objDeRetorno;
}



document.getElementById("debugarEssaMerda").onclick = function debugarEssaMerda() {
    debugger;
}




function verificaVariavel(variavel, min, max, texto) {


    if (variavel < min) {
        alert("O valor do " + texto + " eh abaixo do permitido")
        return false;
    }

    if (variavel > max) {
        alert("O valor do " + texto + " eh maior que o permitido")
        return false;
    }

    if (isNaN(variavel) == true) {
        alert("O valor do " + texto + " nao eh um numero ?!?!")
        return false;
    }

    return true;
}



document.getElementById("vaiiA").onclick = function vaiiA() {
    //var firebaseOrdersCollection = database.ref().child('gasCath');

    var valorDia = parseFloat($('#valorDia').val());
    var valorMes = $('#valorMes').val();
    var valorAno = $('#valorAno').val();
    var hidrometroGas = $('#hidrometroGas').val();


    //verifica se os dados sao plausiveis
    if (verificaVariavel(valorDia, 1, 31, "dia") == false) { return; }
    if (verificaVariavel(valorMes, 1, 12, "mes") == false) { return; }
    if (verificaVariavel(valorAno, 2000, 2022, "ano") == false) { return; }
    if (verificaVariavel(hidrometroGas, 2, 1000000, "Gas leitura") == false) { return; }


    //debugger;
    var dadosAEnviar = {
        valorDia: $('#valorDia').val(),
        valorMes: $('#valorMes').val(),
        valorAno: $('#valorAno').val(),
        hidrometroGas: $('#hidrometroGas').val(),
    };



    firebaseGasCathCollection.push(dadosAEnviar);

    //var tipoObejetoInputuser = document.getElementById("tipoObejetoInputuser").value;
    //var valorObjInputuser = document.getElementById("valorObjInputuser").value;
    //pushNoFirebaseLM("teste1",tipoObejetoInputuser, valorObjInputuser,false);
    // // vai para o html
    // adicionaNoHtmlLM("valoresFirebase", "h6", "informacaoooo");
}





//uma funcao que demora 7 segundos rodando PARA NADA
function demorar() {
    var seFudeu;
    for (let i = 0; i < 100000000; i++) {
        seFudeu = Math.sqrt(Math.pow(i, (i + 200)) / 2000);
    }
    return seFudeu
}


//funcao escrever no firebase com set
function setNoFirebaseLM(slashBlabla, tipoObjeto, valorASerEscrito, confirmacao) {
    //debugger;
    // faz um set, ou seja, passa por cima!!! o push que inclui
    if (valorASerEscrito && typeof valorASerEscrito === 'object' && valorASerEscrito.constructor === Object) {
        console.log("Escrevendo objeto com set");
        console.log(valorASerEscrito)
        console.log('TCL: escreveNoFirebaseLM -> slashBlabla / userId valorASerEscrito', slashBlabla + '/' + userId + ">" + valorASerEscrito);
        firebase.database().ref(slashBlabla + '/' + userId).set(valorASerEscrito);
    } else {
        debugger;
        firebase.database().ref(slashBlabla + '/' + userId).set({ [tipoObjeto]: valorASerEscrito });
        console.log("Escrevendo valor com set")
        console.log('TCL: escreveNoFirebaseLM -> slashBlabla / userId tipoObjeto: valorASerEscrito', slashBlabla + '/' + userId + ">" + tipoObjeto + ":" + valorASerEscrito);
    };
}


//funcao escrever no firebase com push
function pushNoFirebaseLM(slashBlabla, tipoObjeto, valorASerEscrito) {
    //debugger;
    // faz uma incluicao, ou seja, so inclui!!! o set que inclui
    if (valorASerEscrito && typeof valorASerEscrito === 'object' && valorASerEscrito.constructor === Object) {
        console.log("Escrevendo objeto com push");
        console.log(valorASerEscrito)
        console.log('TCL: escreveNoFirebaseLM -> slashBlabla / userId valorASerEscrito', slashBlabla + '/' + userId + ">" + valorASerEscrito);
        firebase.database().ref(slashBlabla + '/' + userId).push(valorASerEscrito);
    } else {
        firebase.database().ref(slashBlabla + '/' + userId).push({ [tipoObjeto]: valorASerEscrito });
        console.log("Escrevendo valor com push")
        console.log('TCL: escreveNoFirebaseLM -> slashBlabla / userId tipoObjeto: valorASerEscrito', slashBlabla + '/' + userId + ">" + tipoObjeto + ":" + valorASerEscrito);
    };
}















// 

// //escreve bloco
// firebase.database().ref('usuarioDeMerda/' + userId).set({
//     username: "nome dele",
//     email: "email dele",
//     profile_picture: "url da foto2"
// });




//funcao retorna o que ta na slash  tal  slash 
function oQueTaFirebaseUserSlashBlaBlaLM(slashBlabla) {
    var starCountRef = firebase.database().ref(slashBlabla + '/' + userId);
    starCountRef.on('value', function (snapshot) {
        console.log('TCL: vaiiA -> snapshot.val()', snapshot.val());
        return snapshot.val();
    });
}




//funcao para add no html alguma coisa
function adicionaNoHtmlLM(
    idElemento = "idDoCapetaaa",
    tipoDoElemento = "h1",
    textoDoElemento = "Lulu morning star") {
    //
    tipoDoElemento = document.createElement(tipoDoElemento);
    textoDoElemento = document.createTextNode(textoDoElemento);
    tipoDoElemento.appendChild(textoDoElemento);
    document.getElementById(idElemento).appendChild(tipoDoElemento);
};



// //
// DatabaseReference connectedRef = FirebaseDatabase.getInstance().getReference(".info/connected");
// connectedRef.addValueEventListener(new ValueEventListener() {
//   @Override
//   public void onDataChange(DataSnapshot snapshot) {
//     boolean connected = snapshot.getValue(Boolean.class);
//     if (connected) {
//       System.out.println("connected");
//     } else {
//       System.out.println("not connected");
//     }
//   }

//   @Override
//   public void onCancelled(DatabaseError error) {
//     System.err.println("Listener was cancelled");
//   }
// });







