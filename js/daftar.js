fetch(
  "https://script.google.com/macros/s/AKfycbw5T0s_5Cd3JLqFQW6ZEFaSAzCo_b6dfv7KDST9ia9AEE6DwTUzUaFN1ITg8iT9UgAt/exec"
)
  .then((response) => response.json())
  .then((data) => {
    const table = document
      .getElementById("mahasiswa")
      .getElementsByTagName("tbody")[0];

    data.forEach((mahasiswa) => {
      const row = table.insertRow();
      const idCell = row.insertCell(0);
      const namaCell = row.insertCell(1);
      const hadirCell = row.insertCell(2);
      const hadirCell2 = row.insertCell(3);

      idCell.innerHTML = mahasiswa.no;
      namaCell.innerHTML = mahasiswa.pt;
      hadirCell.innerHTML = mahasiswa.hadir;
      if (mahasiswa.hadir > 0) {
        hadirCell2.innerHTML = "OK";
      } else {
        hadirCell2.innerHTML = "Nihil";
      }
    });
  })
  .catch((error) => console.error(error));
