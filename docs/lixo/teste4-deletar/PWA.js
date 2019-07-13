pwa = window.pwa || {};


mensagemBalao = "";

pwa.messages = {
  isNotPwa: "Oups! SOMETHING IS WRONG, MESSAGE ME LEODECM6@GMAIL.COM PWA.",
  isPwa: mensagemBalao 
}

pwa.setPwa = function () {
  console.log("Inicia PWA..");
  Cookies.set('pwa', 'true');
  setMessage(pwa.messages.isPwa);
  document.body.classList.remove('no-pwa');
}

pwa.unsetPwa = function () {
  Cookies.set('pwa', 'false');
  setMessage(pwa.messages.isNotPwa);
  document.body.classList.add('no-pwa');
}

function setMessage(message) {
  if (message === "") {
    document.getElementById('pwa-bubble').textContent = "Press next to choose a word/phrase";
  } else {
    // document.getElementById('pwa-bubble').textContent = message;
    document.getElementById('pwa-bubble').innerHTML = message;
  }
}

function isPwa() {
  return Cookies.get('pwa') === 'true';
}

if (!isPwa()) {
  pwa.unsetPwa();
} else {
  pwa.setPwa();
}

//inicia sendo pwa
pwa.setPwa();





























