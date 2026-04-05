document.addEventListener('DOMContentLoaded', () => {
    ambilDataAudio();
});

// Mengambil data dari JSON layaknya dari API/Database
async function ambilDataAudio() {
    try {
        const respon = await fetch('data/database.json');
        const daftarAudio = await respon.json();
        renderKatalog(daftarAudio);
    } catch (error) {
        console.error("Gagal mengambil data dari database buatan:", error);
    }
}

// Menampilkan data ke layar
function renderKatalog(data) {
    const wadahKatalog = document.getElementById('wadah-katalog');
    wadahKatalog.innerHTML = ''; // Bersihkan loading

    data.forEach(item => {
        const cardHTML = `
            <div class="group glass-effect rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30">
                <div class="overflow-hidden relative h-56">
                    <div class="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                    <img src="${item.gambar}" alt="${item.nama}" class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110">
                </div>
                <div class="p-6 relative">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">${item.nama}</h3>
                        <span class="text-xs font-semibold bg-slate-800 text-slate-300 px-2 py-1 rounded-md">${item.kategori}</span>
                    </div>
                    <p class="text-slate-400 text-sm mb-6 leading-relaxed">${item.deskripsiSingkat}</p>
                    <button onclick="bukaPopup('${item.nama}', '${item.reviewLengkap}')" 
                            class="w-full bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-medium py-2.5 rounded-lg transition-all duration-300 border border-slate-700 hover:border-indigo-500">
                        Baca Review Lengkap
                    </button>
                </div>
            </div>
        `;
        wadahKatalog.innerHTML += cardHTML;
    });
}

// Logika Popup
function bukaPopup(judul, deskripsi) {
    document.getElementById('judul-popup').innerText = judul;
    document.getElementById('isi-popup').innerText = deskripsi;
    
    let popup = document.getElementById('popup-review');
    popup.classList.remove('hidden'); 
    popup.classList.add('flex');      
}

function tutupPopup() {
    let popup = document.getElementById('popup-review');
    popup.classList.remove('flex');
    popup.classList.add('hidden');
}

// Tutup kalau klik luar
document.getElementById('popup-review').addEventListener('click', function(e) {
    if (e.target === this) {
        tutupPopup();
    }
});