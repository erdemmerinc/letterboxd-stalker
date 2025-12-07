# 🎬 Letterboxd Stalker (Review Analyzer)

Bu proje, sinema tutkunlarının favori platformu **Letterboxd** üzerindeki kullanıcı aktivitelerini analiz eden, JavaScript tabanlı bir web uygulamasıdır. 

Kullanıcıların son izledikleri filmleri, verdikleri puanları ve yorumları RSS beslemesi üzerinden çekerek görselleştirir ve kullanıcının film zevkine dair istatistikler sunar.

## 🚀 Proje Özellikleri

* **Veri Çekme (Fetch API):** Kullanıcı adını girerek Letterboxd RSS beslemesi üzerinden verileri dinamik olarak çeker.
* **İstatistik Analizi:** İzlenen film sayısı ve ortalama puanı hesaplar.
* **Rütbe Sistemi:** Kullanıcının verdiği ortalama puana göre (Örn: "Seçici Gurme", "Sert Eleştirmen", "Polyanna") eğlenceli bir rütbe atar.
* **Akıllı Filtreleme:** Filmleri puanlarına göre (Yüksek Puanlılar / Düşük Puanlılar) filtreleme imkanı sunar.
* **Local Storage:** Son aranan kullanıcıyı tarayıcı hafızasında tutar, sayfa yenilendiğinde veriler kaybolmaz.
* **Dinamik DOM Manipülasyonu:** Gelen veriye göre HTML elementlerini anlık olarak oluşturur.

## 🛠️ Kullanılan Teknolojiler

* **HTML5 & CSS3:** Arayüz tasarımı ve responsive yapı.
* **JavaScript (ES6+):**
    * `Async/Await` ile asenkron veri yönetimi.
    * `Fetch API` ile dış kaynaklardan veri çekme.
    * `Array Methods` (Filter, Map, ForEach) ile veri işleme.
    * `LocalStorage` ile veri kalıcılığı.
* **RSS2JSON API:** XML formatındaki RSS verisini JSON formatına çevirmek için kullanılmıştır.

<img width="1329" height="893" alt="image" src="https://github.com/user-attachments/assets/e103549d-16c1-4223-a109-b47321d69ad3" /> 


## 💻 Nasıl Kullanılır?

1.  Arama kutusuna geçerli bir Letterboxd kullanıcı adı girin (Örn: `mubi`, `pupkin`).
2.  **GÖZETLE** butonuna tıklayın veya Enter'a basın.
3.  Uygulama verileri çekecek ve aşağıda film kartlarını listeleyecektir.
4.  İstatistik kartından kullanıcının ortalama puanını ve rütbesini görebilirsiniz.
5.  Filtre butonlarını kullanarak sadece yüksek puanlı (4+) filmleri listeleyebilirsiniz.

---
*Bu proje, JavaScript öğrenme sürecimde API kullanımı ve veri manipülasyonu konularını pekiştirmek amacıyla geliştirilmiştir.*
