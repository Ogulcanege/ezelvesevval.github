const startBtn     = document.getElementById("startBtn");
const stopBtn      = document.getElementById("stopBtn");
const audio        = document.getElementById("audio");
const progress     = document.getElementById("progress");
const lyricsScroll = document.getElementById("lyricsScroll");

// Şarkı sözlerinin tam metnini tanımlıyoruz.
const lyricsText = `Hep de yorgun argın olmasa
Az da bana zaman ayırsa
Klasik olsa şöyle bensizliğe alışmak sana zor gelse
Hep de yorgun argın olmasa
Az da bana zaman ayırsa
Klasik olsa şöyle bensizliğe alışmak sana zor gelse
Yani seni de bi' görsem
Sebepsizim, sensizim
İçimdeki çarpmıyor
Alışkanlık de, aşk de
Gün doğarkenki gölgeye
Vaz da geçmiyorum of
Vaz da geçmiyorum of
Hep de yorgun argın olmasa
Az da bana zaman ayırsa
Klasik olsa şöyle bensizliğe alışmak sana zor gelse
Hep de yorgun argın olmasa
Az da bana zaman ayırsa
Klasik olsa şöyle bensizliğe alışmak sana zor gelse
Yani seni de bi' görsem
Görsem
Görsem
`;

// Sözlerin typewriter efekti için zaman ayarları
const lyricsStartTime = 3;  // 3. saniyede sözler yazmaya başlasın.
const lyricsEndTime   = 95; // 95. saniyede tüm metin ekranda görünsün.

startBtn.addEventListener("click", () => {
  audio.play();
});

stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  lyricsScroll.innerText = "";
  progress.value = 0;
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
  
  if (audio.currentTime < lyricsStartTime) {
    lyricsScroll.innerText = "";
  } else if (audio.currentTime >= lyricsEndTime) {
    lyricsScroll.innerText = lyricsText;
  } else {
    const effectiveTime = audio.currentTime - lyricsStartTime;
    const effectiveDuration = lyricsEndTime - lyricsStartTime;
    const ratio = effectiveTime / effectiveDuration;
    const letterCount = Math.floor(ratio * lyricsText.length);
    lyricsScroll.innerText = lyricsText.slice(0, letterCount);
  }
});

progress.addEventListener("input", () => {
  if (!audio.duration) return;
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
