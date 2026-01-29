/* -------------------------
   INITIAL SETUP
-------------------------- */

// Force modal hidden on load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("modal").classList.add("hidden");
});

// System state
let selectedVehicle = null;

// Initialize map
const map = L.map("map").setView([30.768, 76.576], 14);

// Add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// DOM references
const vehicleList = document.getElementById("vehicle-list");
const modal = document.getElementById("modal");
const confirmBtn = document.getElementById("confirm-btn");
const closeBtn = document.getElementById("close-btn");

/* -------------------------
   RENDER VEHICLES
-------------------------- */

vehicles.forEach(vehicle => {
    /* Vehicle List Card */
    const card = document.createElement("div");
    card.className = "vehicle-card";

    card.style.opacity = vehicle.status === "Unavailable" ? "0.6" : "1";

    card.innerHTML = `
        <h4>${vehicle.name}</h4>
        <p>Price: ${vehicle.price}</p>
        <p>Status: ${vehicle.status}</p>
    `;

    card.onclick = () => openModal(vehicle);
    vehicleList.appendChild(card);

    /* Map Marker */
    const marker = L.marker([vehicle.lat, vehicle.lng]).addTo(map);
    marker.bindPopup(vehicle.name);
    marker.on("click", () => openModal(vehicle));
});

/* -------------------------
   MODAL CONTROL
-------------------------- */

function openModal(vehicle) {
    if (!vehicle) return;

    selectedVehicle = vehicle;

    document.getElementById("modal-title").innerText = vehicle.name;
    document.getElementById("modal-price").innerText =
        "Price: " + vehicle.price;
    document.getElementById("modal-distance").innerText =
        "Distance: approx. " + (Math.random() * 3 + 1).toFixed(1) + " km";
    document.getElementById("modal-status").innerText =
        "Status: " + vehicle.status;

    confirmBtn.disabled = vehicle.status === "Unavailable";

    modal.classList.remove("hidden");
}

// Close modal
closeBtn.onclick = () => {
    modal.classList.add("hidden");
    selectedVehicle = null;
};

// Confirm booking (user-initiated ONLY)
confirmBtn.onclick = () => {
    if (!selectedVehicle || confirmBtn.disabled) return;

    document.getElementById("modal-status").innerText =
        "Booking request recorded. Awaiting provider confirmation.";

    confirmBtn.disabled = true;
};
