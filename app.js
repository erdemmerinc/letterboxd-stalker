const searchInput = document.querySelector("#usernameInput");
const searchButton = document.querySelector("#searchBtn");
const loading = document.querySelector("#loading");
const moviesGrid = document.querySelector("#moviesGrid");

const filterButtons = document.querySelectorAll(".filter-btn");
let tumFilmler = [];

function renderMovies(liste){
    moviesGrid.innerHTML = "";

    liste.forEach((film)=>{
        let poster = film.thumbnail; 
        const baslik = film.title;
        const yorum = film.content || film.description || "Yorum yok."

        if(!poster && film.description){
            const resimBul = film.description.match(/src="(.*?)"/)
            
            if(resimBul){
                poster = resimBul[1];
            }
        }

        moviesGrid.innerHTML += `
        <div class="movie-card">
            <img src="${poster}" alt="Poster" onerror="this.src='https://placehold.co/300x450?text=Resim+Yok'">
            <div class="movie-info">
                <h3 class="movie-title">${baslik}</h3>
                <div class="movie-review">
                    ${yorum}
                </div>
            </div>
        </div>
        `;
    })
}

function updateButtonCounts(){
    const tumSayi = tumFilmler.length;
    const yuksekSayi = tumFilmler.filter(film=>film.title.includes("★★★★")).length;
    const dusukSayi = tumSayi - yuksekSayi;

    const btnAll = document.querySelector('.filter-btn[data-filter="all"]');
    const btnLow = document.querySelector('.filter-btn[data-filter="low"]');
    const btnHigh = document.querySelector('.filter-btn[data-filter="high"]');

    if(btnAll)  btnAll.innerText  = `Tümü (${tumSayi})`;
    if(btnLow)  btnLow.innerText  = `≤ 3.5 ★ (${dusukSayi})`;
    if(btnHigh) btnHigh.innerText = `4.0 ★+ (${yuksekSayi})`;
}

filterButtons.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        filterButtons.forEach(b=>b.classList.remove("active"));
        e.target.classList.add("active");

        const kriter = e.target.getAttribute("data-filter");
        let filteredList = [];
        
        if(kriter === "all"){
            filteredList = tumFilmler;
        }
        else if(kriter === "high"){
            filteredList = tumFilmler.filter(film => film.title.includes("★★★★"));
        }
        else if(kriter === "low"){
            filteredList = tumFilmler.filter(film => !film.title.includes("★★★★"));
        }

        renderMovies(filteredList);
    })
});

function puanHesapla(baslik){
    if(!baslik.includes("★")) return 0;

    const yildizSayisi = (baslik.match(/★/g) || []).length;
    const bucukPuan = baslik.includes("½") ? 0.5 : 0;

    return yildizSayisi + bucukPuan;
}

function updateStats(){
    const toplamFilm = tumFilmler.length
    let toplamPuan = 0;
    let puanVerilenFilmSayisi = 0;

    tumFilmler.forEach(film=>{
        const puan = puanHesapla(film.title);
        if(puan>0){
            toplamPuan += puan;
            puanVerilenFilmSayisi++;
        }
    })

    let ortalama = 0;
    if(puanVerilenFilmSayisi > 0){
        ortalama = (toplamPuan / puanVerilenFilmSayisi).toFixed(1)
    }

    let rutbe = "-";
    const puan = parseFloat(ortalama);

    if (puan >= 4.5) {
        rutbe = "Polyanna 🌈";
    } 
    else if (puan >= 3.8) {
        rutbe = "Sinema Aşığı 💖";
    } 
    else if (puan >= 3.2) {
        rutbe = "Seçici Gurme 🍷";
    } 
    else if (puan >= 2.5) {
        rutbe = "Sert Eleştirmen 🧐";
    } 
    else if (puan > 0) {
        rutbe = "Hayata Küsmüş ☠️";
    } 
    else {
        rutbe = "İzleyici 👀";
    }

    document.querySelector("#totalCount").innerText = toplamFilm;
    document.querySelector("#avgScore").innerText = ortalama;
    document.querySelector("#userRank").innerText = rutbe;

    document.querySelector("#statsCard").classList.remove("hidden");
}

async function getPerson() {
    const kullaniciAdi = searchInput.value.trim().toLowerCase();
    if(kullaniciAdi === ""){
        alert("Lütfen bir kullanıcı adı girin!")
        return;
    }
    
    loading.classList.remove("hidden");
    moviesGrid.innerHTML = "";
    
    try {
        console.log("İstek atılıyor...");
        
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://letterboxd.com/${kullaniciAdi}/rss/&api_key=suf5d58oihbgvdd6i7juz1tk0rom8qwc9no2h7o3&count=200&t=${Math.random()}`);

        if(!response.ok){
            throw new Error("Bağlantı hatası!")
        }
    
        const data = await response.json();
        console.log("Gelen Veri:", data);
        console.log("Toplam Aktivite:", data.items.length);

        if(data.status === 'error'){
            alert("Kullanıcı bulunamadı veya gizli hesap!")
            loading.classList.add("hidden");
            return;
        }
        
        tumFilmler = data.items.filter(item=> 
            !item.link.includes("/list/") && 
            item.guid.includes("letterboxd-review")
        );
        
        console.log("Bulunan Yorum Sayısı:", tumFilmler.length);
        
        localStorage.setItem("sonAranan", kullaniciAdi);

        document.querySelector("#filterContainer").classList.remove("hidden");
        updateButtonCounts();
        updateStats();
        renderMovies(tumFilmler);
        
    } catch (error) {
        console.log("Bir hata oldu:", error);
        alert("Bir şeyler ters gitti! Konsolu kontrol et.");
    } finally {
        loading.classList.add("hidden");
    }
}

searchButton.addEventListener("click", getPerson);

searchInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        getPerson();
    }
});

const kayitliKullanici = localStorage.getItem("sonAranan");

if(kayitliKullanici){
    searchInput.value = kayitliKullanici;
    getPerson();
}

const clearButton = document.querySelector("#clearBtn");

clearButton.addEventListener("click",()=>{
    searchInput.value = "";
    searchInput.focus();
})