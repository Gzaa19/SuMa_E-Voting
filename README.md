# SuMa E-Voting

SuMa E-Voting adalah aplikasi mobile berbasis React Native yang dirancang untuk memfasilitasi proses pemilihan umum (e-voting) secara digital, aman, dan efisien. Aplikasi ini memungkinkan pengguna untuk melihat kandidat, memberikan suara, dan mengelola profil mereka dengan mudah.

## Fitur Utama

- **Autentikasi Pengguna**: Sistem login dan registrasi yang aman menggunakan Firebase Authentication.
- **Manajemen Kandidat**: Melihat daftar kandidat beserta visi dan misi mereka.
- **Sistem Voting**: Memberikan suara kepada kandidat pilihan secara real-time.
- **Profil Pengguna**: Mengelola informasi profil pengguna.
- **Persistensi Data**: Penyimpanan sesi login yang cepat dan aman menggunakan MMKV.
- **Antarmuka Modern**: Desain UI yang responsif dan user-friendly.

## Teknologi yang Digunakan

Project ini dibangun menggunakan teknologi berikut:

- **Framework**: [React Native](https://reactnative.dev/) dengan [Expo](https://expo.dev/)
- **Bahasa Pemrograman**: JavaScript
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Navigasi**: [React Navigation](https://reactnavigation.org/) (Bottom Tabs & Stack)
- **Penyimpanan Lokal**: [react-native-mmkv](https://github.com/mamous/react-native-mmkv)
- **Icons**: Expo Vector Icons

## Prasyarat Instalasi

Sebelum menjalankan project ini, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi LTS disarankan)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- Aplikasi **Expo Go** di perangkat Android/iOS Anda (untuk testing)

## Cara Instalasi dan Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan project di lokal:

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/SuMa_E-Voting.git
   cd SuMa_E-Voting
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi Firebase**
   Pastikan konfigurasi Firebase di `src/config/firebase.js` sudah sesuai dengan project Firebase Anda.

4. **Jalankan Aplikasi**
   ```bash
   npx expo start
   ```

5. **Scan QR Code**
   Gunakan aplikasi Expo Go di HP Anda untuk scan QR code yang muncul di terminal, atau tekan `a` untuk menjalankan di Android Emulator / `i` untuk iOS Simulator.

## Susunan Project

Berikut adalah struktur direktori utama dari project ini:

```
SuMa_E-Voting/
├── src/
│   ├── assets/          # Gambar, font, dan aset statis lainnya
│   ├── components/      # Komponen UI yang dapat digunakan kembali (ui/, dll)
│   ├── config/          # File konfigurasi (firebase.js, storage.js)
│   ├── hooks/           # Custom React Hooks
│   ├── navigation/      # Konfigurasi navigasi (BottomTabNavigator.js)
│   ├── screens/         # Halaman utama aplikasi (Login, Register, Voting, dll)
│   ├── scripts/         # Skript utilitas tambahan
│   └── services/        # Logika bisnis dan interaksi API (authService, voteService)
├── App.js               # Entry point aplikasi
├── app.json             # Konfigurasi Expo
├── package.json         # Daftar dependensi project
└── README.md            # Dokumentasi project
```

## Lisensi

Project ini dilisensikan di bawah lisensi **MIT**. Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---
Dibuat dengan ❤️ oleh Tim Pengembang SuMa E-Voting.
