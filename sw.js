const CACHE_NAME = 'pony-game-v2'; // Đổi từ v1 thành v2 để ép trình duyệt xóa cache cũ
const ASSETS = [
  'index.html',
  'manifest.json'
  'twilight.png',
  'pinkie.png',
  'rainbow.png',
  'fluttershy.png',
  'rarity.png',
  'applejack.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Ép kích hoạt bản mới ngay lập tức
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Xóa bỏ hoàn toàn file cũ v1
          }
        })
      );
    })
  );
  return self.clients.claim();
