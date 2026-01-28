const map = L.map("map").setView([30.768, 76.576], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const vehicleList = document.getElementById("vehicle-list");
const modal = document.getElementById("modal");

vehicles.forEach(vehicle => {
    // List Card
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.innerHTML = `
        <h4>${vehicle.name}</h4>
        <p>Price: ${vehicle.price}</p>
        <p>Status: ${vehicle.status}</p>
    `;
    card.onclick = () => openModal(vehicle);

    vehicleList.appendChild(card);

    // Map Marker
    const marker = L.marker([vehicle.lat, vehicle.lng]).addTo(map);
    marker.bindPopup(vehicle.name);
    marker.on("click", () => openModal(vehicle));
});

function openModal(vehicle) {
    document.getElementById("modal-title").innerText = vehicle.name;
    document.getElementById("modal-price").innerText = "Price: " + vehicle.price;
    document.getElementById("modal-distance").innerText =
        "Distance: approx. " + (Math.random() * 3 + 1).toFixed(1) + " km";
    document.getElementById("modal-status").innerText =
        "Status: " + vehicle.status;

    modal.classList.remove("hidden");
}

document.getElementById("close-btn").onclick = () => {
    modal.classList.add("hidden");
};

document.getElementById("confirm-btn").onclick = () => {
    alert("Booking request recorded successfully.");
    modal.classList.add("hidden");
};