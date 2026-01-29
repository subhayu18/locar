let selectedVehicle = null;

// Initialize map
const map = L.map("map").setView([30.768, 76.576], 14);

// Tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// DOM references
const vehicleList = document.getElementById("vehicle-list");
const detailsContent = document.getElementById("details-content");
const placeholder = document.getElementById("details-placeholder");
const requestBtn = document.getElementById("request-btn");
const bookingMsg = document.getElementById("booking-msg");

// Render vehicles
vehicles.forEach(vehicle => {
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.style.opacity = vehicle.status === "Unavailable" ? "0.6" : "1";

    card.innerHTML = `
        <h4>${vehicle.name}</h4>
        <p>Price: ${vehicle.price}</p>
        <p>Status: ${vehicle.status}</p>
    `;

    card.onclick = () => showDetails(vehicle);
    vehicleList.appendChild(card);

    const marker = L.marker([vehicle.lat, vehicle.lng]).addTo(map);
    marker.on("click", () => showDetails(vehicle));
});

// Show details panel
function showDetails(vehicle) {
    selectedVehicle = vehicle;

    placeholder.style.display = "none";
    detailsContent.classList.remove("hidden");

    document.getElementById("detail-name").innerText = vehicle.name;
    document.getElementById("detail-price").innerText =
        "Price: " + vehicle.price;
    document.getElementById("detail-distance").innerText =
        "Distance: approx. " + (Math.random() * 3 + 1).toFixed(1) + " km";
    document.getElementById("detail-status").innerText =
        "Status: " + vehicle.status;

    bookingMsg.innerText = "";
    requestBtn.disabled = vehicle.status === "Unavailable";
}

// Booking request
requestBtn.onclick = () => {
    if (!selectedVehicle) return;

    bookingMsg.innerText =
        "Booking request recorded. Awaiting provider confirmation.";
    requestBtn.disabled = true;
};
