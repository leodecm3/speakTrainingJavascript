try {




    var livroFoco = "livro de teste";
    var usuarioFoco;
    var velocidade = 1;
    var fraseFoco = "prejudice";

    var audioUrl_geral = 0;
    var oQueEuEntendi = 0;


    var bugString = "Oups! SOMETHING IS WRONG, MESSAGE ME LEODECM6@GMAIL.COM: "







    // -
    // -
    // -
    // -
    // -
    // -----------botoes  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // -
    // -
    // -
    // -
    // -
    // -

    function lmMic() {
        console.log("funcao gravaeentende");

        document.getElementById("divfloatRecording").style.visibility = 'block';

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

        //variavel de gravar audio
        const recordAudio = () => {
            return new Promise(resolve => {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
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

                                    audioUrl_geral = audioUrl; /// LM define o globa

                                    const audio = new Audio(audioUrl);
                                    const play = () => {
                                        audio.play();
                                        document.getElementById("repeteOAudio-button").style.visibility = 'visible';
                                        document.getElementById("divfloatRecording").style.visibility = 'hidden';
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

        //funcao que roda por 3 segundos para gravar
        async function comecouABrincadeira() {
            const recorder = await recordAudio();
            //comeca a gravar
            recorder.start();


            //await sleep(0);      

            //ele espera ate que acabe o recording
            x.registerListener(function (val) {

                if (val === "para de gravar e toca som") {
                    document.getElementById("divfloatRecording").style.visibility = 'hidden';
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


        //------- abaixo o recognition
        var usaGoogleAPI = false;
        if (usaGoogleAPI === true) {
            //https://medium.com/ideas-at-igenius/delivering-a-smooth-cross-browser-speech-to-text-experience-b1e1f1f194a2
            //aqui o sistema usando o google api



        } else {
            //debugger;

            var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
            //var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
            //var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

            var recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 20;
            recognition.interimResults = false;

            recognition.start();

            recognition.onresult = function (event) {
                console.log('event:', event.results);
                var msgLinha0 = "";
                var msgLinha1;
                var msgLinha2;
                var last = event.results.length - 1;
                oQueEuEntendi = event.results[last][0].transcript;
                var confianca = event.results[last][0].confidence * 100;
                var variacoes = "";
                var last2 = event.results[0].length;
                for (let index = 0; index < last2; index++) {
                    variacoes += "<br>" + event.results[0][index].transcript;
                }
                // msgLinha2.setAttribute('style', 'white-space: pre;');
                msgLinha2 = variacoes;
                console.log(variacoes);
                if (oQueEuEntendi == fraseFoco) {
                    //correto    
                    //celeb audio           
                    var audioCelebration = new Audio();
                    audioCelebration.src = "./mp3/157-ItemObtained.mp3";
                    audioCelebration.volume = 0.1;
                    audioCelebration.play();
                    //messe
                    msgLinha0 = "😄😄😄 CONGRATULATIONS 😄😄😄 <br>";
                    msgLinha1 = 'You said: > ' + oQueEuEntendi + ' < with confidence of  ' + confianca.toFixed(2);
                    setMessage(msgLinha0 + "<br>" + msgLinha1 + "<br><br>" + "its time to try a harder one 🤓");
                } else {
                    //incorreto
                    msgLinha0 = "Try again, click MIC and talk:<br> 👉 " + fraseFoco + "<br>";
                    msgLinha1 = 'You said: > ' + oQueEuEntendi + ' < with confidence of  ' + confianca.toFixed(2) + "% also I understood:";
                    setMessage(msgLinha0 + "<br>" + msgLinha1 + "<br>" + msgLinha2);
                }


            }


            recognition.onspeechend = function () {
                console.log("parou de gravar o recognition");
                recognition.stop();
                //aqui ele vai acionar o listner e parar de gravar e reproduzir o som
                x.a = "para de gravar e toca som";
            }

            recognition.onerror = function (event) {
                console.log("DEU RUIM... LE AI A MERDA QUE DEU")
                console.log(event)
                console.log("--FIM DA MERDA QUE DEU")
                setMessage(bugString + event.error);
            }
        }

    }

    function lmSpeech() {
        funcaofalaFrase(fraseFoco);
    }

    function lmRepeat() {
        if (audioUrl_geral != 0) {
            var audio = new Audio(audioUrl_geral);
            audio.play();
        } else {
            funcaofalaFrase("a bug happened, please report this to my developer, Leo");
        }
    }

    function lmNextAparece() {
        console.log("lmNextAparece()")
        document.getElementById("divfloatField").style.visibility = "visible";
    }

    function lmNextTroca() {
        console.log("lmNextTroca()")
        //troca o valor    floatField
        var temp12331 = document.getElementById("floatField").value;
        if (temp12331 == "") {
            // case invalid insert a msgbox reporting didnt change
        } else {
            //change the global variable
            fraseFoco = temp12331;
            //ajust ui
            colocaNoBalao();
        }
        document.getElementById("divfloatField").style.visibility = 'hidden';
    }

    function lmParaDeGravarExternm() {
        console.log("lmParaDeGravarExternm()")
        recorder.stop();
        recognition.stop();
        document.getElementById("divfloatRecording").style.visibility = 'hidden';
    }

    // -
    // -
    // -
    // -
    // -
    // -----------subfuncoes dos botoes  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // -
    // -
    // -
    // -
    // -
    // -

    //coloca no balao na formatacao
    function colocaNoBalao() {
        if (fraseFoco === "") {
            setMessage("");
        } else {
            var _textoBalao;
            _textoBalao = "Click MIC and talk:<br>";
            _textoBalao += "👉 ";
            _textoBalao += fraseFoco;
            setMessage(_textoBalao);
        }
        // pendente colocar msg de nao entendi 🙇
    }
    colocaNoBalao();



    function funcaofalaFrase(frase) {
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
        }
        synth.speak(utterThis);
    }



    // -
    // -
    // -
    // -
    // -
    // -----------funcoes de debug  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // -
    // -
    // -
    // -
    // -
    // -




    function verificaVariaveisGlob() {

        // console.log("TCL: verificaVariaveisGlob -> livroFoco", livroFoco)

        // console.log("TCL: verificaVariaveisGlob -> usuarioFoco", usuarioFoco)

        // console.log("TCL: verificaVariaveisGlob -> velocidade", velocidade)

        // console.log("TCL: verificaVariaveisGlob -> arrayDeFases", arrayDeFases)

        // console.log("TCL: verificaVariaveisGlob -> fraseFoco", fraseFoco)

        // console.log("TCL: verificaVariaveisGlob -> audioUrl_geral", audioUrl_geral)

        // console.log("TCL: verificaVariaveisGlob -> oQueEuEntendi", oQueEuEntendi)

    }




    function sentaLa() {
        console.log("funcao gravaeentende");

        document.getElementById("divfloatRecording").style.visibility = 'block';

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

        //variavel de gravar audio
        const recordAudio = () => {
            return new Promise(resolve => {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
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

                                    audioUrl_geral = audioUrl; /// LM define o globa

                                    const audio = new Audio(audioUrl);
                                    const play = () => {
                                        audio.play();
                                        document.getElementById("repeteOAudio-button").style.visibility = 'visible';
                                        document.getElementById("divfloatRecording").style.visibility = 'hidden';
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

        //funcao que roda por 3 segundos para gravar
        async function comecouABrincadeira() {
            const recorder = await recordAudio();
            //comeca a gravar
            recorder.start();


            //await sleep(0);      

            //ele espera ate que acabe o recording
            x.registerListener(function (val) {

                if (val === "para de gravar e toca som") {
                    document.getElementById("divfloatRecording").style.visibility = 'hidden';
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




















        console.log("fim()");
        console.log("sentaLa()");
    //   debugger;  
    const ConversionFactor = 2 ** (16 - 1) - 1; // 32767
    const streamAudioData = e => {
        const floatSamples = e.inputBuffer.getChannelData(0);



        websocket.on('message', (data) => {
            // Audio buffer data
            const buffer = new Int16Array(data, 0, Math.floor(data.byteLength / 2));
            // Write the data chunk in the stream
            recognizeStream.write(buffer);
        });



        if (socket && socket.readyState === socket.OPEN) {
            socket.send(Int16Array.from(floatSamples.map(n => n * MAX_INT)));
        }





        // Speech api stream events
        recognizeStream
            .on('data', (data) => {
                // Data event from Speech api
                if (data.results && data.results[0]) {
                    websocket.send(JSON.stringify(data.results[0]));
                }
            })
            .on('error', (error) => {
                ws.send(JSON.stringify({
                    error: true
                }));
            });

        // Communication channel closing from frontend
        ws.on('close', () => {
            recognizeStream.end();
        });

    };

    console.log(streamAudioData);
    console.log("fim do sentaLa()");

    }












    console.log("ok index.js nao deu pau 😄");

} catch (error) {

    setMessage("Oups! SOMETHING IS WRONG, MESSAGE ME LEODECM6@GMAIL.COM ");//  " + error);
    console.log(error);
    // mensagemBalao = error;
    //document.getElementById("errosQueDeram").textContent = error;

}










// # emojis
// https://emojiterra.com/smiling-face-with-open-mouth-smiling-eyes/