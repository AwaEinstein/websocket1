var server = "127.0.0.1";
// Buat koneksi WebSocket ke Node-RED WebSocket
const socket = new WebSocket("ws://" + server + ":1880/ws/receive");

// Tangani saat koneksi terbuka
socket.addEventListener("open", (event) => {
  console.log("Terhubung ke Node-RED WebSocket");
});

// Tangani saat pesan diterima
socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (data.hasOwnProperty("rotX")) {
    // Perbarui nilai Rotasi X pada halaman HTML
    document.getElementById("rotXValue").textContent = data.rotX;
  }
});

// Tangani saat koneksi tertutup
socket.addEventListener("close", (event) => {
  console.log("Koneksi ke Node-RED WebSocket ditutup");
});

// Tangani perubahan nilai pada slider
const slider = document.getElementById("slider");
slider.addEventListener("input", (event) => {
  // Kirim nilai slider ke Node-RED melalui WebSocket saat slider diubah
  const value = slider.value;
  socket.send(JSON.stringify({ sliderValue: value }));
});
