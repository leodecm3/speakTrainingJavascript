var repeat = require("repeat-string");
console.log(repeat("hey", 100));
document.write(repeat("hey", 10));

function ligar(){
    debugger;
    // main();
    document.getElementById("esposta").innerHTML = "asasasas";
}
//ligar();


// async function main() {
//     // Imports the Google Cloud client library
//     const speech = require('@google-cloud/speech');
//     const fs = require('fs');
  
//     // Creates a client
//     const client = new speech.SpeechClient();
  
//     // The name of the audio file to transcribe
//     const fileName = './resources/audio.raw';
  
//     // Reads a local audio file and converts it to base64
//     const file = fs.readFileSync(fileName);
//     const audioBytes = file.toString('base64');
  
//     // The audio file's encoding, sample rate in hertz, and BCP-47 language code
//     const audio = {
//       content: audioBytes,
//     };
//     const config = {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 16000,
//       languageCode: 'en-US',
//     };
//     const request = {
//       audio: audio,
//       config: config,
//     };
  
//     // Detects speech in the audio file
//     const [response] = await client.recognize(request);
//     const transcription = response.results
//       .map(result => result.alternatives[0].transcript)
//       .join('\n');
//     console.log(`Transcription: ${transcription}`);
//     document.getElementById("esposta").innerHTML = transcription;

//   }
//   main().catch(console.error);