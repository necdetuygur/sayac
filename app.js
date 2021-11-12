const ZAMAN = "2021-12-17 10:00:00";

window.addEventListener("load", function () {
  // SozTick();
  ZamanFarkiTick();
});

function ZamanFarki(zaman) {
  zaman = zaman.replace(/-/gi, "/");
  zaman = new Date(zaman) * 1;
  simdi = new Date() * 1;
  bir_saniye = 1000;
  bir_dakika = 60 * bir_saniye;
  bir_saat = 60 * bir_dakika;
  bir_gun = 24 * bir_saat;
  bir_hafta = 7 * bir_gun;
  fark = zaman > simdi ? zaman - simdi : simdi - zaman;
  gun_farki = Math.floor(fark / bir_gun);
  saat_farki = Math.floor((fark % bir_gun) / bir_saat);
  dakika_farki = Math.floor((fark % bir_saat) / bir_dakika);
  saniye_farki = Math.floor((fark % bir_dakika) / bir_saniye);
  return {
    gun: gun_farki,
    saat: ("0" + saat_farki).slice(-2, 3),
    dakika: ("0" + dakika_farki).slice(-2, 3),
    saniye: ("0" + saniye_farki).slice(-2, 3),
    fark: fark,
  };
}

function ZamanFarkiTick() {
  var zf = ZamanFarki(ZAMAN);
  $("#zaman-farki").html(
    zf.gun + " gün, " + zf.saat + ":" + zf.dakika + ":" + zf.saniye
  );
  setTimeout(ZamanFarkiTick, 1000);
}

function SozTick() {
  $("#soz")
    .fadeOut(5e3, function () {
      $(this).html(GetSoz());
    })
    .fadeIn(2e3);
  setTimeout(SozTick, 15e3);
}
