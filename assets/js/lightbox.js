const cards = document.querySelectorAll(".news-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const prevImg = document.getElementById("prevImg");
const nextImg = document.getElementById("nextImg");
const closeBtn = document.getElementById("closeLightbox");

let images = [];
let currentIndex = 0;

// ambil semua gambar
cards.forEach((img, index) => {
  images.push(img.src);

  img.addEventListener("click", () => {
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox(){
  lightbox.style.display = "flex";
  lightboxImg.src = images[currentIndex];
}

function closeLightbox(){
  lightbox.style.display = "none";
}

function next(){
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
}

function prev(){
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
}

nextImg.onclick = next;
prevImg.onclick = prev;
closeBtn.onclick = closeLightbox;

// klik luar gambar tutup
lightbox.onclick = (e) => {
  if(e.target === lightbox) closeLightbox();
};
