var queSeraModificado;
queSeraModificado = 1;
//console.log(queSeraModificado);
function teste3() {

    // queSeraModificado = 2;
    // console.log(vaisefude);
    // vaisefude = 1;
    // console.log(vaisefude);
    // vaisefude = 2;
    // console.log(vaisefude);
    // var vaisefude = 3;
    // console.log(vaisefude);
    // vaisefude = 4;
    // console.log(vaisefude);







    var variavelQuerecebeFuncao;

    var donuts = ["jelly donut", "chocolate donut", "glazed donut"];
    var improvedDonuts = [];

    donuts.forEach(function (donut) {
        donut += " hole";
        donut = donut.toUpperCase();
        improvedDonuts.push(donut);
        //console.log(donut);
    });

    console.log(improvedDonuts);


    var donuts2 = ["jelly donut", "chocolate donut", "glazed donut"]
    var improvedDonuts2 = donuts2.map(function(donut2) {
      donut2 += " hole";
      donut2 = donut2.toUpperCase();
      return donut2;
    });
    console.log(improvedDonuts2);

}


