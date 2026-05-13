// assets/js/firestore.js

import { db } from "./firebase.js";

import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================================
   HELPER
========================================================= */

function formatTanggal(value) {

  if (!value) return "";

  const d =
    value.toDate
      ? value.toDate()
      : new Date(value);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(d);
}

function safeText(val, fallback = "") {
  return (val ?? fallback).toString();
}

/* =========================================================
   BERITA
========================================================= */

const beritaGrid =
  document.querySelector("#berita .placeholder-grid");

const beritaFallback =
  beritaGrid
    ? beritaGrid.innerHTML
    : "";

if (beritaGrid) {

  const beritaRef = query(
    collection(db, "berita"),
    orderBy("tanggal", "desc"),
    limit(4)
  );

  onSnapshot(
    beritaRef,

    (snap) => {

      if (snap.empty) {
        beritaGrid.innerHTML = beritaFallback;
        return;
      }

      beritaGrid.innerHTML = "";

      snap.forEach((d) => {

        const data = d.data();

        const card = document.createElement("div");
        card.className = "placeholder-card";

        const title = document.createElement("strong");
        title.textContent =
          safeText(data.judul, "Berita Pondok");

        const isi = document.createElement("div");

        isi.style.lineHeight = "1.7";

        isi.textContent =
          safeText(
            data.isi,
            "Isi berita belum tersedia."
          );

        const tanggal = document.createElement("div");

        tanggal.style.marginTop = "8px";
        tanggal.style.opacity = "0.82";
        tanggal.style.fontSize = "12px";

        tanggal.textContent =
          formatTanggal(data.tanggal);

        card.appendChild(title);
        card.appendChild(isi);

        if (tanggal.textContent) {
          card.appendChild(tanggal);
        }

        beritaGrid.appendChild(card);
      });
    },

    () => {
      beritaGrid.innerHTML = beritaFallback;
    }
  );
}

/* =========================================================
   GALERI
========================================================= */

const slidesEl =
  document.getElementById("slides");

const galleryFallback =
  slidesEl
    ? slidesEl.innerHTML
    : "";

if (slidesEl) {

  const galleryRef = query(
    collection(db, "galeri"),
    orderBy("tanggal", "desc"),
    limit(6)
  );

  onSnapshot(
    galleryRef,

    (snap) => {

      if (snap.empty) {

        slidesEl.innerHTML =
          galleryFallback;

        document.dispatchEvent(
          new CustomEvent("gallery:updated")
        );

        return;
      }

      slidesEl.innerHTML = "";

      snap.forEach((d) => {

        const data = d.data();

        const slide =
          document.createElement("div");

        slide.className = "slide";

        const img =
          document.createElement("img");

        img.src =
          safeText(data.gambar, "");

        img.alt =
          safeText(
            data.judul,
            "Galeri Pondok"
          );

        const caption =
          document.createElement("div");

        caption.className =
          "slide-caption";

        const h3 =
          document.createElement("h3");

        h3.textContent =
          safeText(
            data.judul,
            "Galeri Pondok"
          );

        const p =
          document.createElement("p");

        p.textContent =
          safeText(
            data.deskripsi,
            "Dokumentasi kegiatan pondok."
          );

        caption.appendChild(h3);
        caption.appendChild(p);

        slide.appendChild(img);
        slide.appendChild(caption);

        slidesEl.appendChild(slide);
      });

      document.dispatchEvent(
        new CustomEvent("gallery:updated")
      );
    },

    () => {

      slidesEl.innerHTML =
        galleryFallback;

      document.dispatchEvent(
        new CustomEvent("gallery:updated")
      );
    }
  );
}

/* =========================================================
   STATISTIK
========================================================= */

const statValues =
  document.querySelectorAll(".stat-value");

const statsRef =
  doc(db, "statistik", "utama");

if (statValues.length) {

  onSnapshot(
    statsRef,

    (snap) => {

      if (!snap.exists()) return;

      const data = snap.data();

      const values = [
        data.santri ?? 0,
        data.asatidz ?? 0,
        data.alumni ?? 0,
        data.visitor ?? 0,
        data.simpatisan ?? 0
      ];

      statValues.forEach((el, idx) => {

        const value =
          Number(values[idx] || 0);

        el.dataset.count =
          String(value);

        el.textContent =
          value >= 1000
            ? value.toLocaleString("id-ID")
            : String(value);
      });

      document.dispatchEvent(
        new Event("stats:updated")
      );
    },

    () => {}
  );
}
