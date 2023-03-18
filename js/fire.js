// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsGcShkBm6D0GQqL5EzXaItG9tGBFpr60",
  authDomain: "rakernit.firebaseapp.com",
  databaseURL:
    "https://rakernit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rakernit",
  storageBucket: "rakernit.appspot.com",
  messagingSenderId: "1081464840795",
  appId: "1:1081464840795:web:d36310dc903289a2d9957e",
  measurementId: "G-N43JXRFWCZ",
};

// Inisialisasi SDK Firebase
firebase.initializeApp(firebaseConfig);
// Mengambil referensi database Firestore
const db = firebase.firestore();

// Mendapatkan koleksi "AbsensiSarasehan" dari database Firestore
const usersRef = db.collection("AbsensiSarasehan").orderBy("Time", "desc");

// Mendapatkan tabel HTML
const table = document.getElementById("myTable");
const tbody = table.getElementsByTagName("tbody")[0];

// Mendapatkan data dari Firestore
usersRef.onSnapshot((querySnapshot) => {
  // Menghapus seluruh data dari tabel HTML
  // Menentukan nilai total peserta dan hadir peserta
  var totalPeserta = 280;

  // Mengambil elemen HTML dengan ID "total" dan "hadir"
  var totalElemen = document.getElementById("total");
  var hadirElemen = document.getElementById("hadir");

  // Mengubah nilai elemen "total" dan "hadir" dengan nilai dinamis

  tbody.innerHTML = "";
  var no = 1;
  var jumlahDokumen = querySnapshot.size;

  var perce = jumlahDokumen / totalPeserta;
  totalElemen.innerText = totalPeserta;
  hadirElemen.innerText = jumlahDokumen;

  // Mendapatkan elemen progress bar
  var progressBar = document.getElementById("progress-bar");
  var kura = document.getElementById("kurangnya");
  kura.innerText = "-" + (totalPeserta - jumlahDokumen);
  // Menentukan nilai progress dalam persentase
  var progressValue = perce * 100;

  // Mengubah lebar progress bar dengan nilai dinamis
  progressBar.style.width = progressValue + "%";
  progressBar.setAttribute("aria-valuenow", progressValue);

  refreshCircle(perce);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const date = new Date(data.Time);
    const tanggal = date.toLocaleDateString(); // mengambil tanggal
    // const waktu = date.toLocaleTimeString(); // mengambil waktu
    const hours = date.getHours(); // mengambil jam
    const minutes = date.getMinutes(); // mengambil menit
    const waktu = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`; // gabungkan jam dan menit dalam format hh:mm
    const row = tbody.insertRow();
    const nameCellno = row.insertCell();
    nameCellno.innerHTML = no;
    const nameCell = row.insertCell();
    nameCell.innerHTML = data.Nama;
    const ageCell = row.insertCell();
    ageCell.innerHTML = data.Nama_PT;
    const addressCell = row.insertCell();
    addressCell.innerHTML = data.Jabatan;
    const addressCell0 = row.insertCell();
    addressCell0.innerHTML = tanggal;
    const addressCell1 = row.insertCell();
    addressCell1.innerHTML = waktu;
    const addressCell2 = row.insertCell();
    addressCell2.innerHTML = "Hadir";
    no++;
  });
});

let circle = null;

function refreshCircle(percentage) {
  if (!circle) {
    circle = new ProgressBar.Circle(circleProgress6, {
      color: "#00ff",
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 10,
      trailWidth: 10,
      easing: "easeInOut",
      duration: 1400,
      text: {
        autoStyleContainer: false,
      },
      from: { color: "#Ffa500", width: 10 },
      to: { color: "#7CFC00", width: 10 },
      // Set default step function for all animate calls
      step(state, circle) {
        circle.path.setAttribute("stroke", state.color);
        circle.path.setAttribute("stroke-width", state.width);

        const value = `${Math.round(circle.value() * 100)}% `;
        if (value === 0) {
          circle.setText("");
        } else {
          circle.setText(value);
        }
      },
    });
    circle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    circle.text.style.fontSize = "3.5rem";
  }

  circle.animate(percentage);
}
