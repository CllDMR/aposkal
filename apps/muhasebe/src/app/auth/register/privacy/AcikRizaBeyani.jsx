const AcikRizaBayani = ({ displayName }) => {
  const sellerCompany = {
    title: "SCRIPT YAZILIM LİMİTED ŞİRKETİ ",
    address:
      "19 MAYIS MAH. TURABOĞLU SK. HAMDIYE YAZGAN IS MERKEZI BLOK NO: 4 İÇ KAPI NO: 2 KADIKÖY / İSTANBUL",
    email: "destek@aposkal.com",
    tel: "+90 (216) 706 19 20",
    mersis: "0757091337800001",
    tcVkn: "7570913378",
    appName: "tescilge.com",
  };
  return (
    <>
      <h1 className="text-center text-xl font-bold text-gray-800">
        Kişisel Verilerin Korunması Kanunu ile İlgili Açık Rıza Beyanı
      </h1>
      <p className="text-sm text-gray-800">
        6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca,{" "}
        {sellerCompany.title}’nce {sellerCompany.appName} üzerinden mali,
        ticari, finansal ve kişisel bilgi ve verilerimin depolamasına,
        arşivlenmesine, analiz etmesine, mevcut bilgi ve/veya verilerim
        üzerinden kurum ve/veya şahsımın finansal geçerliliğinin rakamsal,
        sayısal, yazı ve grafiksel olarak analiz edilip yorumlamasına, bu bilgi
        ve detayların kaydedilmesine, loglanmasına, saklanmasına,
        güncellenmesine, işlenmesine, üçüncü kişilerle paylaşılmasına, üçüncü
        kişilere açıklanabilmesine, devredilebilmesine, sınıflandırılabilmesine
        ve Kişisel Verilerin Korunması Kanunu (KVKK)’nda sayılan şekillerde
        izlenebilmesine açık rıza verdiğimi beyan ederim.
      </p>
      {displayName && (
        <>
          <p className="text-sm font-bold text-gray-800">
            {/* tarih must be is now  */}
            Tarih: {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm font-bold text-gray-800">
            Ad Soyad:{displayName}
          </p>
        </>
      )}
    </>
  );
};

export default AcikRizaBayani;
