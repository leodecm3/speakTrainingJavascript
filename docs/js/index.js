pwa = window.pwa || {};

pwa.messages = {
  isNotPwa:"Oups! votre navigateur n'est pas paramétré pour utiliser la version PWA.",
  isPwa: "Bravo! votre navigateur est à présent paramétré pour utiliser la version PWA."
}


pwa.setPwa = function() {
  Cookies.set('pwa', 'true');
  setMessage(pwa.messages.isPwa);
  document.body.classList.remove('no-pwa');
}

pwa.unsetPwa = function() {
  Cookies.set('pwa', 'false');
  setMessage(pwa.messages.isNotPwa);
  document.body.classList.add('no-pwa');
}

function setMessage(message) {
  document.getElementById('pwa-bubble').textContent = message;
}

function isPwa() {
  return Cookies.get('pwa') === 'true';
}

if(!isPwa()) {
  pwa.unsetPwa();
} else {
  pwa.setPwa();
}