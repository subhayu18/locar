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

// Render vehicles
vehicles.forEach(vehicle => {
    /* -------------------------
       Vehicle List Card
    -------------------------- */
    const card = document.createElement("div");
    card.className = "vehicle-card";

    // Visually de-emphasize unavailable vehicles
    card.style.opacity = vehicle.status === "Unavailable" ? "0.6" : "1";

    card.innerHTML = `
        <h4>${vehicle.name}</h4>
        <p>Price: ${vehicle.price}</p>
        <p>Status: ${vehicle.status}</p>
    `;

    card.onclick = () => openModal(vehicle);
    vehicleList.appendChild(card);

    /* -------------------------
       Map Marker
    -------------------------- */
    const marker = L.marker([vehicle.lat, vehicle.lng]).addTo(map);
    marker.bindPopup(vehicle.name);
    marker.on("click", () => openModal(vehicle));
});

/* -------------------------
   Modal Logic
-------------------------- */
function openModal(vehicle) {
document.getElementById("confirm-btn").onclick = () => {
    document.getElementById("modal-status").innerText =
        "Booking request recorded. Awaiting confirmation.";

    document.getElementById("confirm-btn").disabled = true;
};
}

// Close modal
closeBtn.onclick = () => {
    modal.classList.add("hidden");
};

// Confirm booking
confirmBtn.onclick = () => {
    if (confirmBtn.disabled) return;

    alert("Booking request recorded successfully.");
    modal.classList.add("hidden");
};

