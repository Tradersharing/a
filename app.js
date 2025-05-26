// Ambil daftar produk dari localStorage
function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

const exampleProducts = [
  {
    name: "Speaker 18 inch ACR",
    image: "https://cdn.pixabay.com/photo/2017/11/09/21/41/speaker-2934628_960_720.jpg",
    stock: 15,
    price: 850000,
    weight: "7 kg",
    voicecoil: "5 inch",
    desc: "Speaker 18 inch ACR cocok untuk kamu yang ingin suara bass besar dan jernih. Cocok untuk sound system rumahan maupun event."
  },
  {
    name: "Speaker 12 inch ACR",
    image: "https://cdn.pixabay.com/photo/2016/03/27/22/34/speaker-1284693_960_720.jpg",
    stock: 10,
    price: 450000,
    weight: "4 kg",
    voicecoil: "3 inch",
    desc: "Speaker 12 inch ACR dengan suara jernih dan tahan lama, cocok untuk penggemar musik sejati."
  },
  {
    name: "Speaker 10 inch ACR",
    image: "https://cdn.pixabay.com/photo/2018/11/15/22/33/speaker-3819886_960_720.jpg",
    stock: 8,
    price: 350000,
    weight: "3 kg",
    voicecoil: "2.5 inch",
    desc: "Speaker 10 inch ACR praktis dan hemat tempat, cocok untuk kebutuhan audio sehari-hari."
  }
];



// Simpan daftar produk ke localStorage
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Render produk di halaman index.html
function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  const products = getProducts();
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = "<p style='color:white;text-align:center'>Belum ada produk ditambahkan</p>";
    return;
  }

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Stok: ${product.stock}</p>
      <button onclick="location.href='detail.html?id=${index}'">Lihat Selengkapnya</button>
    `;
    list.appendChild(card);
  });
}

// Render produk di halaman admin.html
function renderAdminProducts() {
  const list = document.getElementById("admin-product-list");
  if (!list) return;
  const products = getProducts();
  list.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Stok: ${product.stock}</p>
      <button onclick="editProduct(${index})">Edit</button>
      <button onclick="deleteProduct(${index})">Hapus</button>
    `;
    list.appendChild(card);
  });
}

// Tambah / Update Produk dari form
const form = document.getElementById("product-form");
if (form) {
  form.onsubmit = function (e) {
    e.preventDefault();
    const products = getProducts();
    const id = document.getElementById("product-id").value;
    const product = {
      name: document.getElementById("product-name").value,
      image: document.getElementById("product-image").value,
      stock: document.getElementById("product-stock").value,
      price: document.getElementById("product-price").value,
      weight: document.getElementById("product-weight").value,
      voicecoil: document.getElementById("product-voicecoil").value,
      desc: document.getElementById("product-desc").value,
    };

    if (id) {
      products[id] = product;
    } else {
      products.push(product);
    }

    saveProducts(products);
    form.reset();
    document.getElementById("product-id").value = "";
    document.getElementById("cancel-edit").style.display = "none";
    renderAdminProducts();
  };
}

// Fungsi edit produk
function editProduct(index) {
  const products = getProducts();
  const product = products[index];
  document.getElementById("product-id").value = index;
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-image").value = product.image;
  document.getElementById("product-stock").value = product.stock;
  document.getElementById("product-price").value = product.price;
  document.getElementById("product-weight").value = product.weight;
  document.getElementById("product-voicecoil").value = product.voicecoil;
  document.getElementById("product-desc").value = product.desc;
  document.getElementById("cancel-edit").style.display = "inline-block";
}

// Fungsi batal edit
const cancelBtn = document.getElementById("cancel-edit");
if (cancelBtn) {
  cancelBtn.onclick = () => {
    form.reset();
    document.getElementById("product-id").value = "";
    cancelBtn.style.display = "none";
  };
}

// Fungsi hapus produk
function deleteProduct(index) {
  const products = getProducts();
  if (confirm("Yakin ingin menghapus produk ini?")) {
    products.splice(index, 1);
    saveProducts(products);
    renderAdminProducts();
  }
}

// Render detail produk di detail.html
function renderDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProducts()[id];
  if (!product) {
    container.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h2>${product.name}</h2>
    <p><strong>Harga:</strong> Rp ${product.price}</p>
    <p><strong>Berat:</strong> ${product.weight} kg</p>
    <p><strong>Voice Coil:</strong> ${product.voicecoil} inch</p>
    <p><strong>Stok:</strong> ${product.stock}</p>
    <p>${product.desc}</p>
    <button onclick="history.back()">Kembali</button>
  `;
}

// Jalankan render saat halaman dimuat
window.onload = () => {
  renderProducts();
  renderAdminProducts();
  renderDetail();
};
