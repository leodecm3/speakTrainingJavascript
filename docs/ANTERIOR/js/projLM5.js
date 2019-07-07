try {





var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
//var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var livroFoco = "livro de teste";
var usuarioFoco;
var velocidade = 1;
var arrayDeFases = 0;
var fraseFoco = 0;

var audioUrl_geral = 0;
var oQueEuEntendi = 0;

var diagnostic = document.querySelector('.output');
var diagnostic2 = document.querySelector('.output2');


document.getElementsByClassName('fraseAnterior')[0]
    .addEventListener('click', function (event) {
        if(fraseFoco >= 0 ) {
            fraseFoco = fraseFoco - 1;
        arrumaFasesNoUI();
        }
    });
document.getElementsByClassName('frasesProximas')[0]
    .addEventListener('click', function (event) {
        if(fraseFoco >= 0 ) {
            fraseFoco = fraseFoco + 1;
        arrumaFasesNoUI();
        }
    });


//futuramente isso vira direto do firebase pode manter mostrando como exemplo!!
preencheComValoresIniciais();
function preencheComValoresIniciais() {
    document.getElementById("textoASerLido").value = "Click any text to edit or style it. Select text to insert a link. Click blue Gear icon in the top right corner to hide/show buttons, text, title and change the block background. Click red  in the bottom right corner to add a new block. Use the top left menu to create new pages, sites and add themes.";

}





function conectaFirebase() {

}


function desconectaFirebase() {

}


function escolherLivro() {
    document.getElementById("escolhaDeLivros").style.display = "block";//"none";
}


function mudarLivro(livro) {
    livroFoco = livro;
    document.getElementById("escolhaDeLivros").style.display = "none";
}


function voltaParaFraseAnterior() {

}

function falaAFase() {
    var fraseAtual = document.getElementById("fraseAtual").textContent
    funcaofalaFrase(fraseAtual);
    console.log("TCL: falaAFase -> fraseFoco", fraseFoco)
    fraseFoco++;
    console.log("TCL: falaAFase -> fraseFoco", fraseFoco)

    // ele vai arrumas assim que apabar de falar
    //arrumaFasesNoUI();
}


function vaiParaAPRoximaFrase() {

}


function maisDevagar() {

}


function normalSpeed() {
    velocidade = 1;
}


function maisRapido() {
    document.getElementById("statusGravacao").innerHTML = "comecou a gravar...";
}


function gravarAudio() {
    (async () => {
        const recorder = await recordAudio();
        recorder.start();

        setTimeout(async () => {
            const audio = await recorder.stop();
            audio.play();
        }, 3000);
    })();
}





function pararGravacao() {

}


function reproduzirAudio() {
    document.getElementById("statusGravacao").innerHTML = "---reproduzindo---";

    //converter para bobs
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            const audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
            });
            setTimeout(() => {
                mediaRecorder.stop();
            }, 3000);
        });



    //cria um url so som
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            const audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
            });
            setTimeout(() => {
                mediaRecorder.stop();
            }, 3000);
        });



    //reproduz audio..
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            const audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            });
            setTimeout(() => {
                mediaRecorder.stop();
            }, 3000);
        });



}


// falaAFase () {}  ele chama direto a funcao que esta ali em cima, como falso de ir para proxima


function grava3sERepete() {
    //https://github.com/bryanjenningz/record-audio
    //https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b

    ////maldito es6
    // const recordAudio = () =>
    //     new Promise(async resolve => {
    //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //         const mediaRecorder = new MediaRecorder(stream);
    //         const audioChunks = [];
    //         mediaRecorder.addEventListener("dataavailable", event => {
    //             audioChunks.push(event.data);
    //         });
    //         const start = () => mediaRecorder.start();
    //         const stop = () =>
    //             new Promise(resolve => {
    //                 mediaRecorder.addEventListener("stop", () => {
    //                     const audioBlob = new Blob(audioChunks);
    //                     const audioUrl = URL.createObjectURL(audioBlob);
    //                     const audio = new Audio(audioUrl);
    //                     const play = () => audio.play();
    //                     resolve({ audioBlob, audioUrl, play });
    //                 });

    //                 mediaRecorder.stop();
    //             });

    //         resolve({ start, stop });
    //     });
    //const sleep = time => new Promise(resolve => setTimeout(resolve, time));


    //lindo es5
    var recordAudio = function recordAudio() {
        return new Promise(async function (resolve) {
            var stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            var mediaRecorder = new MediaRecorder(stream);
            var audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", function (event) {
                audioChunks.push(event.data);
            });

            var start = function start() {
                return mediaRecorder.start();
            };

            var stop = function stop() {
                return new Promise(function (resolve) {
                    mediaRecorder.addEventListener("stop", function () {
                        var audioBlob = new Blob(audioChunks);
                        var audioUrl = URL.createObjectURL(audioBlob);

                        audioUrl_geral = audioUrl; /// LM define o globa

                        var audio = new Audio(audioUrl);

                        //LM desoculta o botao de repproduzir novamente
                        document.getElementById("repeteOAudio-button").style.visibility = 'visible';
                        document.getElementById("repeteOQueEuEntendi-button").style.visibility = 'visible';


                        var play = function play() {
                            return audio.play();
                        };

                        resolve({
                            audioBlob: audioBlob,
                            audioUrl: audioUrl,
                            play: play
                        });
                    });
                    mediaRecorder.stop();
                });
            };

            resolve({
                start: start,
                stop: stop
            });
        });
    };



    var sleep = function sleep(time) {
        return new Promise(function (resolve) {
            return setTimeout(resolve, time);

        });
    };




    async function comecouABrincadeira() {
        const recorder = await recordAudio();
        //comeca a gravar
        recorder.start();


        //await sleep(0);      

        //ele espera ate que acabe o recording
        x.registerListener(function (val) {

            if (val === "para de gravar e toca som") {
                async function comecouABrincadeira_interno() {
                    const audio = await recorder.stop();
                    console.log("para de gravar e toca som");
                    audio.play();
                };
                comecouABrincadeira_interno();
            }

        });

    };
    comecouABrincadeira();







    //         async function comecouABrincadeira() {
    //             const recorder = await recordAudio();
    //             recorder.start();
    //             await sleep(3000);
    //             const audio = await recorder.stop();
    //             audio.play();
    //         };
    //         comecouABrincadeira();
    // //eh o mesmo que
    //         (async () => {
    //             const recorder = await recordAudio();
    //             recorder.start();
    //             await sleep(3000);
    //             const audio = await recorder.stop();
    //             audio.play();
    //         })();



}

//variavel so para poder usar o listner
x = {
    aInternal: 10,
    aListener: function (val) { },
    set a(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get a() {
        return this.aInternal;
    },
    registerListener: function (listener) {
        this.aListener = listener;
    }
}




function varGlobalTrue() {
    minhaVariavelGlobal = true;
    console.log("TCL: minhaVariavelGlobal", minhaVariavelGlobal);
    grava3sERepete().recordAudio.stop().play();
}

function varGlobalFalse() {
    x.a = "toca som novamente";
    minhaVariavelGlobal = false;
    console.log("TCL: minhaVariavelGlobal", minhaVariavelGlobal);
};


function gravaEEntende() {


    console.log("funcao gravaeentende");
    // var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 20;

    grava3sERepete();
    //aqui comeca a gravar

    recognition.start();

    recognition.onresult = function (event) {
        console.log('event:', event.results);
        var last = event.results.length - 1;
        oQueEuEntendi = event.results[last][0].transcript;
        var confianca = event.results[last][0].confidence * 100;
        diagnostic.textContent = oQueEuEntendi + ' <> com confianca de  ' + confianca.toFixed(2) + "%";
        var variacoes = "";
        var last2 = event.results[0].length;
        for (let index = 0; index < last2; index++) {
            variacoes += "\r\n" + event.results[0][index].transcript;
        }
        diagnostic2.setAttribute('style', 'white-space: pre;');
        diagnostic2.textContent = variacoes;
        console.log(variacoes);

    }


    recognition.onspeechend = function () {
        console.log("parou de gravar");
        recognition.stop();

        //aqui ele vai acionar o listner e parar de gravar e reproduzir o som
        x.a = "para de gravar e toca som";


    }

    recognition.onerror = function (event) {
        console.log("DEU RUIM... LE AI A MERDA QUE DEU")
        console.log(event)
        console.log("--FIM DA MERDA QUE DEU")
        diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    }




}


function repeteOAudio() {
    if (audioUrl_geral != 0) {
        var audio = new Audio(audioUrl_geral);
        audio.play();
    }
}


function repeteOQueEuEntendi() {
    if (oQueEuEntendi != 0) {
        funcaofalaFrase(oQueEuEntendi);
        //console.log("TCL: repeteOQueEuEntendi -> oQueEuEntendi", oQueEuEntendi)
    }
}




function enviaTexto() {

    document.getElementById("divComFrases").style.display = "block";

    var textoNovo = document.getElementById("textoASerLido").value

    var divideEmFrases = function (str) {
        //return str.trim().split(".");
        return multiSplit(str.trim(), [".", ",", "!", "?"])
    }

    arrayDeFases = divideEmFrases(textoNovo);

    textoArrayDeFrases = "";

    arrayDeFases.forEach(element => {
        textoArrayDeFrases = textoArrayDeFrases + "<br>" + element;
    });

    fraseFoco = 0;

    document.getElementById("relatorioDeTodasAsFrases").innerHTML = textoArrayDeFrases;

    //conserta a ui
    arrumaFasesNoUI();
}


//-----funcoes genericas --------------------------------
//fraseFoco 

function arrumaFasesNoUI() {
    if (arrayDeFases != 0) {
        document.getElementById("fraseAtual").innerHTML = arrayDeFases[fraseFoco];
        if (fraseFoco > 0) {
            document.getElementById("fraseAnterior").innerHTML = arrayDeFases[fraseFoco - 1];
        } else {
            document.getElementById("fraseAnterior").innerHTML = "";
        }

        //proximas 4 frases
        // for (let index = (fraseFoco + 1); index < arrayDeFases.length; index++) {
        //      textfraseProxima_ = textfraseProxima_ + "<br>" + arrayDeFases[index];
        //  }
        // document.getElementById("fraseProxima").innerHTML = textfraseProxima_;

        arrumaProximasFrases(1);
        arrumaProximasFrases(2);
        arrumaProximasFrases(3);
        arrumaProximasFrases(4);

    }



    function arrumaProximasFrases(IDdaFrase_) {
        var fraseProximas_

        fraseProximas_ = arrayDeFases[fraseFoco + IDdaFrase_];
        if (fraseProximas_ != undefined) {
            document.getElementById("fraseProxima" + IDdaFrase_).textContent = fraseProximas_;
        } else {
            document.getElementById("fraseProxima" + IDdaFrase_).textContent = "";
        }

    }
}



//achei na net, ele depara em varios delimitadores diferentes
var multiSplit = function (str, delimiter) {
    if (!(delimiter instanceof Array))
        return str.split(delimiter);
    if (!delimiter || delimiter.length == 0)
        return [str];
    var hashSet = new Set(delimiter);
    if (hashSet.has(""))
        return str.split("");
    var lastIndex = 0;
    var result = [];
    for (var i = 0; i < str.length; i++) {
        if (hashSet.has(str[i])) {
            //result.push(str.substring(lastIndex,i));
            result.push(str.substring(lastIndex, i + 1)); //modifiquei para pegar inclusive o ultimo
            lastIndex = i + 1;
        }
    }
    result.push(str.substring(lastIndex));
    return result;
}






//fala o texto
function funcaofalaFrase(frase) {
    //var msg = new SpeechSynthesisUtterance(frase);
    //window.speechSynthesis.speak(msg);
    //speechSynthesisUtteranceInstance.onend = arrumaFasesNoUI();









    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(frase);
    // var voiceSelect = document.querySelector('select');
    // var voices = synth.getVoices();
    // var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    // for (i = 0; i < voices.length; i++) {
    //     if (voices[i].name === selectedOption) {
    //         utterThis.voice = voices[i];
    //     }
    // }
    

    utterThis.onend = function (event) {
        console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' milliseconds.');
        arrumaFasesNoUI();
    }

    synth.speak(utterThis);
}






const recordAudio = () => {
    debugger;
    return new Promise(resolve => {
        debugger;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                debugger;
                const mediaRecorder = new MediaRecorder(stream);
                const audioChunks = [];

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                const start = () => {
                    mediaRecorder.start();
                };

                const stop = () => {
                    return new Promise(resolve => {
                        mediaRecorder.addEventListener("stop", () => {
                            const audioBlob = new Blob(audioChunks);
                            const audioUrl = URL.createObjectURL(audioBlob);
                            const audio = new Audio(audioUrl);
                            const play = () => {
                                audio.play();
                            };

                            resolve({ audioBlob, audioUrl, play });
                        });

                        mediaRecorder.stop();
                    });
                };

                resolve({ start, stop });
            });
    });
};







// lixo, debugger


function testeAsincrono() {
    console.log("entrou no function testeAsincrono()");
    (async () => {
        demorar();
        await demorar();
        console.log("o que ta acontecendo aqui???");
        demorar();
        //const recorder = await recordAudio();
        //recorder.start();

        //setTimeout(async () => {
        //    const audio = await recorder.stop();
        //    audio.play();
        //}, 3000);
    })();
    console.log("saiu no function testeAsincrono()");



}





//uma funcao que demora 7 segundos rodando PARA NADA
function demorar() {
    var tempoDemorado = new Date();
    //console.log(tempoDemorado);
    var seFudeu;
    for (let i = 0; i < 10000000; i++) {
        seFudeu = Math.sqrt(Math.pow(i, (i + 200)) / 2000);
    }
    var tempoFinal = new Date();
    console.log((tempoFinal - tempoDemorado) / 1000 + " demorados");
    //console.log(tempoFinal);
    return seFudeu
}









function verificaVariaveisGlob() {

    console.log("TCL: verificaVariaveisGlob -> livroFoco", livroFoco)

    console.log("TCL: verificaVariaveisGlob -> usuarioFoco", usuarioFoco)

    console.log("TCL: verificaVariaveisGlob -> velocidade", velocidade)

    console.log("TCL: verificaVariaveisGlob -> arrayDeFases", arrayDeFases)

    console.log("TCL: verificaVariaveisGlob -> fraseFoco", fraseFoco)


    console.log("TCL: verificaVariaveisGlob -> audioUrl_geral", audioUrl_geral)

    console.log("TCL: verificaVariaveisGlob -> oQueEuEntendi", oQueEuEntendi)



}









    console.log("ok");
    
} catch (error) {
    console.log(error);
    document.getElementById("errosQueDeram").textContent = error;

}