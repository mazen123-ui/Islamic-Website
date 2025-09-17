// change header bg on scrolling
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
// responsive navbar
let menuIcon = document.querySelector("header .container .menu i");
let ul = document.querySelector("header .container ul");
let links = document.querySelectorAll("header .container ul a");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("ri-menu-line");
  menuIcon.classList.toggle("ri-close-large-fill");
  ul.classList.toggle("active");
});

links.forEach(link => {
  link.addEventListener("click", () => {
    ul.classList.remove("active");
    menuIcon.classList.add("ri-menu-line");
    menuIcon.classList.remove("ri-close-large-fill");
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    links.forEach((l) => l.classList.remove("active"));
    e.target.classList.add("active");
  });
});
// active class on clicked link

// fetching hadiths
let hadithText = document.querySelector(".hadith-container p");
let nextBtn = document.querySelector(".btns .next");
let prevBtn = document.querySelector(".btns .prev");
let current = document.querySelector(".current");
let hadithIndex = 0;
let first300 = [];

async function loadAhadith() {
  let response = await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-muslim.json"
  );
  let data = await response.json();

  first300 = data.hadiths
    .filter((h) => h.text && h.text.trim() !== "")
    .slice(0, 300);

  showHadith();
}

function showHadith() {
  hadithText.innerHTML = first300[hadithIndex].text;
  current.innerHTML = hadithIndex + 1;
}

nextBtn.addEventListener("click", () => {
  if (hadithIndex < first300.length - 1) {
    hadithIndex++;
  } else {
    hadithIndex = 0;
  }
  showHadith();
});

prevBtn.addEventListener("click", () => {
  if (hadithIndex > 0) {
    hadithIndex--;
  } else {
    hadithIndex = first300.length - 1;
  }
  showHadith();
});

loadAhadith();
// change the lecture source
let lecBoxs = document.querySelectorAll(".lectures .box");
let video = document.querySelector(".lectures .left iframe");

lecBoxs.forEach((box) => {
  box.addEventListener("click", () => {
    video.src = box.dataset.source;
  });
});
// fetching the quran
let quranContainer = document.querySelector(".quran .container");
let audioPlayer = document.getElementById("audioPlayer");

async function getSurahs() {
  let response = await fetch("http://api.alquran.cloud/v1/meta");
  let data = await response.json();
  let surahs = data.data.surahs.references;

  let output = "";
  surahs.forEach((s) => {
    output += `
      <div class="surah" data-surah="${s.number}">
        <h3>${s.name}</h3>
        <p>${s.englishName}</p>
      </div>
    `;
  });
  quranContainer.innerHTML = output;

  let surahCards = document.querySelectorAll(".surah");
  surahCards.forEach((card) => {
    card.addEventListener("click", () => {
      let surahNumber = card.dataset.surah;
      let audioSrc = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
      audioPlayer.src = audioSrc;
      audioPlayer.play();
      surahCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

getSurahs();

// fetching the adhan
async function getAdhan() {
  let response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5')
  let data = await response.json()
  let timings = data.data.timings
  let prayers = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha']
  prayers.forEach((p)=> {
    document.querySelector(`.${p}`).innerHTML = timings[p]
  })
}

getAdhan()

// scrolling animation
// text container
let textContainer = document.querySelector('.main .container .text')
let observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active')
    }else {
      entry.target.classList.remove('active')
    }
  })
})
observer1.observe(textContainer)