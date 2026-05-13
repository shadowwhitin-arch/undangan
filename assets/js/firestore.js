import { db } from "./firebase.js";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================
   UNIVERSAL FEED LOADER
========================================= */

function loadFeed(collectionName, containerId) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  const q = query(
    collection(db, collectionName),
    orderBy("tanggal", "desc")
  );

  onSnapshot(q, (snap) => {

    container.innerHTML = "";

    // kalau kosong → kosong aja
    if (snap.empty) return;

    snap.forEach((docSnap) => {

      const data = docSnap.data();

      const card =
      `
        <article class="news-card">

          <img
            src="${data.gambar || ''}"
            alt="${data.judul || ''}"
          >

          <div class="news-body">
            <h3>${data.judul || 'Untitled'}</h3>
          </div>

        </article>
      `;

      container.innerHTML += card;
    });
  });
}

/* =========================================
   LOAD SEMUA SECTION
========================================= */

loadFeed("galeri", "galeri-container");

loadFeed("profil", "profil-container");

loadFeed("visi-misi", "visi-container");

loadFeed("berita", "berita-container");

loadFeed("kurikulum", "kurikulum-container");

loadFeed("ppdb", "ppdb-container");


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
