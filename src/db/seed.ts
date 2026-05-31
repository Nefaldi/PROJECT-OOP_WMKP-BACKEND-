import { db } from './index.js';
import { menus } from './schema.js';
import 'dotenv/config';

const MENU_DATA = {
  makanan: [
    { id:'m1', name:'Kaledo',      category:'makanan', price:35000, image:'assets/makanan/kaledo.jpg',      desc:'Sop tulang kaki sapi khas Palu dengan kuah bening gurih dan bumbu rempah pilihan.', available:true },
    { id:'m2', name:'Sayur Kelor', category:'makanan', price:15000, image:'assets/makanan/sayur-kelor.jpg', desc:'Sayur daun kelor yang kaya gizi, dimasak dengan santan dan bumbu khas Sulawesi Tengah.', available:true },
    { id:'m3', name:'Nasi Jagung', category:'makanan', price:8000,  image:'assets/makanan/nasi-jagung.jpg', desc:'Nasi campuran jagung tradisional yang mengenyangkan dan lezat, sajian khas masyarakat Kaili.', available:true },
    { id:'m4', name:'Duo Goreng',  category:'makanan', price:10000, image:'assets/makanan/duo-goreng.jpg',  desc:'Dua lauk goreng pilihan (ikan & ayam) dengan bumbu tradisional yang crispy dan gurih.', available:true },
    { id:'m5', name:'Palumara',    category:'makanan', price:20000, image:'assets/makanan/palumara.jpg',    desc:'Sop ikan kuah kuning khas Palu dengan cita rasa asam segar dan rempah aromatik.', available:true },
    { id:'m6', name:'Uta Dada',    category:'makanan', price:25000, image:'assets/makanan/uta-dada.jpg',    desc:'Masakan daging dengan saus kelapa khas Kaili yang kaya rasa dan penuh rempah nusantara.', available:true }
  ],
  minuman: [
    { id:'d1', name:'Saraba',      category:'minuman', price:12000, image:'assets/minuman/saraba.jpg',      desc:'Minuman tradisional hangat berbahan jahe, gula aren, dan santan — khas Sulawesi Tengah.', available:true },
    { id:'d2', name:'Es Teh',      category:'minuman', price:8000,  image:'assets/minuman/es-teh.jpg',      desc:'Teh manis segar dengan es batu, menyegarkan di hari yang panas.', available:true },
    { id:'d3', name:'Teh Hangat',  category:'minuman', price:7000,  image:'assets/minuman/teh-hangat.jpg',  desc:'Teh hangat klasik yang menenangkan, sempurna menemani santapan Anda.', available:true },
    { id:'d4', name:'Kopi',        category:'minuman', price:10000, image:'assets/minuman/kopi.jpg',        desc:'Kopi robusta pilihan dari pegunungan Sulawesi Tengah, diseduh kental dan harum.', available:true },
    { id:'d5', name:'Jus Jeruk',   category:'minuman', price:15000, image:'assets/minuman/jus-jeruk.jpg',   desc:'Jus jeruk segar tanpa pemanis buatan, penuh vitamin C alami.', available:true },
    { id:'d6', name:'Air Mineral', category:'minuman', price:5000,  image:'assets/minuman/air-mineral.jpg', desc:'Air mineral segar kemasan botol.', available:true }
  ],
  pencuciMulut: [
    { id:'p1', name:'Palu Butung', category:'pencuci-mulut', price:15000, image:'assets/pencuci-mulut/palu-butung.jpg', desc:'Pisang yang dimasak dengan santan manis dan serutan es, penutup makan khas Palu yang ikonik.', available:true },
    { id:'p2', name:'Pisang Ijo',  category:'pencuci-mulut', price:15000, image:'assets/pencuci-mulut/pisang-ijo.jpg',  desc:'Pisang berbalut tepung berwarna hijau pandan, disajikan dengan bubur sumsum dan sirup merah.', available:true },
    { id:'p3', name:'Cucur',       category:'pencuci-mulut', price:10000, image:'assets/pencuci-mulut/cucur.jpg',       desc:'Kue tradisional berbahan tepung beras dan gula merah, renyah di luar dan lembut di dalam.', available:true }
  ]
};

async function seed() {
  const allMenus = [
    ...MENU_DATA.makanan,
    ...MENU_DATA.minuman,
    ...MENU_DATA.pencuciMulut
  ];

  try {
    console.log("Seeding menus...");
    for (const menu of allMenus) {
      await db.insert(menus).values(menu).onConflictDoNothing();
    }
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding menus:", error);
  }
  process.exit(0);
}

seed();
