// ===== DUMMY DATA (later, replace with data from the backend) =====
const alerts = [
  { bus: "Bus-06", time: "09:45 AM", msg: "Delayed by 10 minutes due to heavy traffic near Thiruvallur.", color: "red",    icon: "fa-triangle-exclamation" },
  { bus: "Bus-01", time: "09:32 AM", msg: "Reaching Stop 3 (Awadi) - 5 minutes early.",                   color: "yellow", icon: "fa-info" },
  { bus: "Bus-07", time: "09:20 AM", msg: "Normal route. No issues.",                                      color: "blue",   icon: "fa-info" },
  { bus: "Bus-01", time: "08:55 AM", msg: "Low fuel level (18%). Refuel recommended at next stop.",        color: "yellow", icon: "fa-info" }
];

const buses = [
  { no: "BUS-01", driver: "Kumar", route: "Route A", status: "Active"},
  { no: "BUS-06", driver: "Shankar",  route: "Route B", status: "Active"},
  { no: "BUS-07", driver: "Arun",  route: "Route C", status: "Active" }
];

const drivers = [
  { name: "Kumar", bus: "BUS-01", phone: "+91 98765 43210", status: "On Route", safety: "Normal" },
  { name: "Shankar",  bus: "BUS-06", phone: "+91 87654 32109", status: "On Route", safety: "Normal" },
  { name: "Arun",  bus: "BUS-07", phone: "+91 76543 21098", status: "On Route", safety: "Normal" }
];

const trips = [
  { bus: "BUS-01", route: "Route A", time: "08:05 AM - 08:42 AM", status: "Completed" },
  { bus: "BUS-06", route: "Route B", time: "08:15 AM - 09:10 AM", status: "Completed" },
  { bus: "BUS-07", route: "Route C", time: "08:20 AM - 09:05 AM", status: "Completed" }
];

// Dummy stops [name, latitude, longitude]. Replace with real GPS points later.
const stops = [
  ["Stop 1 - Perambakkam", 13.0950, 79.9400],
  ["Stop 2 - Thiruvallur", 13.1100, 79.9800],
  ["Stop 3 - Awadi",       13.1150, 80.0300],
  ["Stop 4 - Redhills",    13.1000, 80.0700],
  ["Stop 5 - Poonamallee", 13.0700, 80.1000],
  ["College - SVCET",      13.0500, 80.1200]
];

// ===== TABLES =====
function renderBuses() {
  document.getElementById("busTable").innerHTML = buses.map(b => `
    <tr>
      <td><strong>${b.no}</strong></td>
      <td>${b.driver}</td>
      <td>${b.route}</td>
      <td><span class="tag green">${b.status}</span></td>
      <td><button class="btn-sm">View</button><button class="btn-sm">Track</button></td>
    </tr>`).join("");
}

function renderDrivers() {
  document.getElementById("driverTable").innerHTML = drivers.map(d => `
    <tr>
      <td><i class="fa-solid fa-circle-user"></i> ${d.name}</td>
      <td>${d.bus}</td>
      <td>${d.phone}</td>
      <td><span class="tag green">${d.status}</span></td>
      <td><span class="tag green">${d.safety}</span></td>
    </tr>`).join("");
}

function renderTrips() {
  const chosen = document.getElementById("tripBus").value;
  const list = chosen === "all" ? trips : trips.filter(t => t.bus === chosen);
  document.getElementById("tripTable").innerHTML = list.map(t => `
    <tr>
      <td><strong>${t.bus}</strong></td>
      <td>${t.route}</td>
      <td>${t.time}</td>
      <td>${t.pass}</td>
      <td><span class="tag green">${t.status}</span></td>
    </tr>`).join("");
}

function renderAlerts() {
  document.getElementById("alertList").innerHTML = alerts.map(a => `
    <div class="alert-item">
      <span class="alert-icon ${a.color}"><i class="fa-solid ${a.icon}"></i></span>
      <div class="alert-body">
        <div class="alert-top"><strong>${a.bus}</strong><small>${a.time}</small></div>
        <p>${a.msg}</p>
      </div>
    </div>`).join("");
}

// ===== LEAFLET MAP =====
function setupMap() {
  const map = L.map("map").setView([stops[2][1], stops[2][2]], 11);

  // Free OpenStreetMap tiles (no API key needed)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Route line through all stops
  const points = stops.map(s => [s[1], s[2]]);
  const line = L.polyline(points, { color: "#2563eb", weight: 4 }).addTo(map);
  map.fitBounds(line.getBounds(), { padding: [30, 30] });

  // A marker for each stop
  stops.forEach(s => L.circleMarker([s[1], s[2]], { radius: 7, color: "#fff", weight: 2, fillColor: "#f59e0b", fillOpacity: 1 })
    .addTo(map).bindPopup(s[0]));

  // Bus marker (dummy position near Stop 2)
  const busIcon = L.divIcon({ className: "", html: '<div class="bus-marker"><i class="fa-solid fa-bus"></i></div>', iconSize: [34, 34] });
  L.marker([stops[1][1], stops[1][2]], { icon: busIcon }).addTo(map).bindPopup("BUS-01 - Active<br>ETA to College: 12 min");
}

// ===== CLOCK =====
function updateClock() {
  const now = new Date();
  document.getElementById("clockDate").textContent = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  document.getElementById("clockTime").textContent = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

// ===== LOGOUT (same idea as your student page) =====
function logoutUser(event) {
  event.preventDefault();
  if (confirm("Are you sure you want to logout?")) {
    alert("You have been logged out.");
  }
}

// ===== RUN WHEN PAGE LOADS =====
renderBuses();
renderDrivers();
renderTrips();
renderAlerts();
setupMap();
updateClock();
setInterval(updateClock, 30000);
document.getElementById("tripSearch").addEventListener("click", renderTrips);