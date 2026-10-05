/* =========================================================
   ROUTEX DASHBOARD JAVASCRIPT
   ========================================================= */

let map;

let routeLine;

let busMarker;

let stopMarkers = [];


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initMap();

  renderBus("bus01");

  renderUpcomingBuses();

  setupBusViewAllToggle();

  renderNotifications();

  setupNotificationViewAll();

  setupSmartFeatures();

  animateCountUps();

  animateProgressBars();

  setupBusSelector();

});


/* =========================================================
   BUS SELECTOR
   ========================================================= */

function setupBusSelector() {

  const selector =
    document.getElementById("busSelector");

  if (!selector) return;


  selector.addEventListener("change", function () {

    renderBus(this.value);

  });

}


/* =========================================================
   SMART FEATURES MENU
   ========================================================= */

function setupSmartFeatures() {

  const toggle =
    document.getElementById("smartFeaturesToggle");

  const menu =
    document.querySelector(".smart-menu");


  if (!toggle || !menu) return;


  toggle.addEventListener("click", function (event) {

    event.preventDefault();

    menu.classList.toggle("open");

  });


  const options =
    document.querySelectorAll(".smart-option");


  options.forEach(option => {

    option.addEventListener("click", function (event) {

      event.preventDefault();


      options.forEach(item => {

        item.classList.remove("selected");

      });


      this.classList.add("selected");

    });

  });

}


/* =========================================================
   MAP
   ========================================================= */

function initMap() {

  map = L.map("map", {

    /* No + / - zoom buttons */
    zoomControl: false,

    /* Disable mouse-wheel zoom */
    scrollWheelZoom: false,

    /* Click + drag moves the map */
    dragging: true,

    /* We handle double-click ourselves */
    doubleClickZoom: false,

    /* Disable other zoom methods */
    touchZoom: false,

    boxZoom: false,

    keyboard: false

  }).setView(
    [13.05, 79.98],
    10
  );


  /* =====================================================
     DOUBLE-CLICK ZOOM
     First double-click  = Zoom IN
     Second double-click = Zoom OUT
     Third double-click  = Zoom IN
     Fourth double-click = Zoom OUT
     ===================================================== */

  let zoomInNext = true;


  map.on("dblclick", function () {

    const currentZoom =
      map.getZoom();


    if (zoomInNext) {

      /* Zoom IN */

      map.setZoom(
        Math.min(
          currentZoom + 1,
          18
        ),
        {
          animate: true
        }
      );

    } else {

      /* Zoom OUT */

      map.setZoom(
        Math.max(
          currentZoom - 1,
          3
        ),
        {
          animate: true
        }
      );

    }


    /* Switch zoom direction */

    zoomInNext =
      !zoomInNext;

  });


  /* =====================================================
     OPENSTREETMAP
     ===================================================== */

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,

      attribution:
        "&copy; OpenStreetMap contributors"
    }
  ).addTo(map);


  /* =====================================================
     MAP SIZE
     ===================================================== */

  setTimeout(() => {

    map.invalidateSize();

    
  }, 300);


  window.addEventListener("resize", () => {

    map.invalidateSize();

  });

}


/* =========================================================
   RENDER BUS
   ========================================================= */

function renderBus(busKey) {

  const bus =
    BUS_DATA[busKey];


  if (!bus) return;


  /* =====================================================
     CURRENT LOCATION
     ===================================================== */

  const locationCard =
    document.querySelectorAll(".stat-card")[0];


  locationCard
    .querySelector(".stat-value")
    .textContent =
      bus.currentLocationLabel;


  locationCard
    .querySelector(".stat-sub")
    .textContent =
      bus.number;


  document
    .getElementById("currentBusLabel")
    .textContent =
      bus.number;


  /* =====================================================
     ETA
     ===================================================== */

  const etaCard =
    document.querySelectorAll(".stat-card")[1];


  etaCard
    .querySelector(".count-up")
    .textContent =
      parseInt(bus.eta);


  etaCard
    .querySelector(".stat-sub")
    .textContent =
      `(${bus.distance})`;


  /* =====================================================
     ROUTE TITLE
     ===================================================== */

  document
    .getElementById("routeMeta")
    .textContent =
      bus.routeLabel;


  renderRouteTimeline(bus);

  renderMapRoute(bus);

}


/* =========================================================
   ROUTE TIMELINE
   ========================================================= */

function renderRouteTimeline(bus) {

  const container =
    document.getElementById("routeTimeline");


  if (!container) return;


  container.innerHTML = `

    <div class="route-line"></div>

    ${bus.stops.map(stop => `

      <div class="route-stop ${stop.status}">

        <div class="dot">

          ${
            stop.status === "destination"

              ? '<i class="fa-solid fa-flag-checkered"></i>'

              : stop.status === "done"

              ? '<i class="fa-solid fa-check"></i>'

              : ''
          }

        </div>


        <strong>
          ${stop.name}
        </strong>


        <span>
          ${stop.sub} • ${stop.time}
        </span>

      </div>

    `).join("")}

  `;

}


/* =========================================================
   MAP ROUTE
   ========================================================= */

function renderMapRoute(bus) {


  /* =====================================================
     REMOVE OLD ROUTE
     ===================================================== */

  if (routeLine) {

    map.removeLayer(routeLine);

  }


  /* =====================================================
     REMOVE OLD BUS
     ===================================================== */

  if (busMarker) {

    map.removeLayer(busMarker);

  }


  /* =====================================================
     REMOVE OLD STOPS
     ===================================================== */

  stopMarkers.forEach(marker => {

    map.removeLayer(marker);

  });


  stopMarkers = [];


  /* =====================================================
     COORDINATES
     ===================================================== */

  const latlngs =
    bus.stops.map(stop => [

      stop.lat,

      stop.lng

    ]);


  /* =====================================================
     ROUTE LINE
     ===================================================== */

  routeLine =
    L.polyline(
      latlngs,
      {

        color: "#2875d8",

        weight: 5,

        opacity: 0.9,

        lineCap: "round",

        lineJoin: "round"

      }
    ).addTo(map);


  /* =====================================================
     STOP MARKERS
     ===================================================== */

  bus.stops.forEach(stop => {


    const destination =
      stop.status === "destination";


    const icon =
      L.divIcon({

        className: "",

        html: `

          <div style="

            width:14px;

            height:14px;

            border-radius:50%;

            background:
              ${destination
                ? "#ef4444"
                : "#2875d8"};

            border:
              3px solid white;

            box-shadow:
              0 2px 8px
              rgba(0,0,0,.25);

          "></div>

        `,

        iconSize: [14, 14],

        iconAnchor: [7, 7]

      });


    const marker =
      L.marker(

        [stop.lat, stop.lng],

        {
          icon: icon
        }

      )
      .addTo(map)
      .bindTooltip(

        `${stop.name} (${stop.time})`,

        {
          direction: "top"
        }

      );


    stopMarkers.push(marker);

  });


  /* =====================================================
     CURRENT BUS
     ===================================================== */

  const activeStop =
    bus.stops.find(
      stop =>
        stop.status === "active"
    ) || bus.stops[0];


  const busIcon =
    L.divIcon({

      className: "bus-marker",

      html: `

        <div class="live-bus-marker">

          <i class="fa-solid fa-bus"></i>

        </div>

      `,

      iconSize: [38, 38],

      iconAnchor: [19, 19]

    });


  busMarker =
    L.marker(

      [
        activeStop.lat,
        activeStop.lng
      ],

      {
        icon: busIcon
      }

    ).addTo(map);


  busMarker.bindTooltip(

    `${bus.number} • Live Location`,

    {
      direction: "top"
    }

  );


  /* =====================================================
     FIT ROUTE
     ===================================================== */

  map.fitBounds(

    routeLine.getBounds(),

    {
      padding: [40, 40],

      maxZoom: 12
    }

  );

}


/* =========================================================
   UPCOMING BUSES
   ========================================================= */

let busListExpanded = false;


function renderUpcomingBuses() {

  const container =
    document.getElementById(
      "upcomingBuses"
    );


  if (!container) return;


  const buses =
    busListExpanded

      ? UPCOMING_BUSES

      : UPCOMING_BUSES.slice(0, 3);


  container.innerHTML =
    buses.map(bus => `

      <div class="bus-item">

        <div>

          <strong>

            <i class="fa-solid fa-bus-simple"></i>

            ${bus.number}

          </strong>


          <p>
            ${bus.route}
          </p>

        </div>


        <div class="bus-right">

          <span class="
            status-badge
            ${
              bus.status === "On Time"
                ? "ontime"
                : "delayed"
            }
          ">

            ${bus.status}

          </span>


          <span class="eta-text">

            ETA: ${bus.eta}

          </span>

        </div>

      </div>

    `).join("");


  const button =
    document.getElementById(
      "busViewAllBtn"
    );


  if (!button) return;


  if (busListExpanded) {

    button.innerHTML =
      'Show Less <i class="fa-solid fa-arrow-up"></i>';

  } else {

    button.innerHTML =
      'View All <i class="fa-solid fa-arrow-right"></i>';

  }

}


/* =========================================================
   UPCOMING BUS VIEW ALL
   ========================================================= */

function setupBusViewAllToggle() {

  const button =
    document.getElementById(
      "busViewAllBtn"
    );


  if (!button) return;


  button.addEventListener(
    "click",
    function(event) {

      event.preventDefault();


      busListExpanded =
        !busListExpanded;


      renderUpcomingBuses();

    }
  );

}


/* =========================================================
   NOTIFICATIONS DATA
   ========================================================= */

const NOTIFICATIONS = [

  {
    type: "success",

    icon: "fa-check",

    text:
      "Bus 01 has departed from Guindy Stop on time.",

    time:
      "5 mins ago"
  },


  {
    type: "info",

    icon: "fa-circle-info",

    text:
      "Bus 01 is approaching Velachery Stop in approximately 2 minutes.",

    time:
      "12 mins ago"
  },


  {
    type: "warning",

    icon: "fa-triangle-exclamation",

    text:
      "Traffic congestion detected near Anna Nagar intersection.",

    time:
      "25 mins ago"
  },


  {
    type: "info-purple",

    icon: "fa-circle-info",

    text:
      "Evening departure schedule updated for Bus 06.",

    time:
      "1 hour ago"
  },


  {
    type: "success",

    icon: "fa-check",

    text:
      "Bus 07 reached its scheduled stop safely.",

    time:
      "1 hour ago"
  },


  {
    type: "warning",

    icon: "fa-triangle-exclamation",

    text:
      "Minor traffic delay detected on Route 07.",

    time:
      "2 hours ago"
  },


  {
    type: "info",

    icon: "fa-circle-info",

    text:
      "Bus 06 evening departure timing has been confirmed.",

    time:
      "2 hours ago"
  },


  {
    type: "success",

    icon: "fa-check",

    text:
      "Bus 01 completed its morning route successfully.",

    time:
      "3 hours ago"
  }

];


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

let notificationExpanded = false;


function renderNotifications() {

  const container =
    document.getElementById(
      "notificationList"
    );


  if (!container) return;


  const notifications =
    notificationExpanded

      ? NOTIFICATIONS

      : NOTIFICATIONS.slice(0, 4);


  container.innerHTML =
    notifications.map(notification => `

      <div class="notif-item">
      <span class="
          notif-icon
          ${notification.type}
        ">

          <i class="
            fa-solid
            ${notification.icon}
          "></i>

        </span>


        <div>

          <p>
            ${notification.text}
          </p>

          <span>
            ${notification.time}
          </span>

        </div>

      </div>

    `).join("");


  const button =
    document.getElementById(
      "notificationViewAllBtn"
    );


  if (!button) return;


  if (notificationExpanded) {

    button.innerHTML =
      'Show Less <i class="fa-solid fa-arrow-up"></i>';

  } else {

    button.innerHTML =
      'View All <i class="fa-solid fa-arrow-right"></i>';

  }

}


/* =========================================================
   NOTIFICATION VIEW ALL
   ========================================================= */

function setupNotificationViewAll() {

  const button =
    document.getElementById(
      "notificationViewAllBtn"
    );


  if (!button) return;


  button.addEventListener(
    "click",
    function(event) {

      event.preventDefault();


      notificationExpanded =
        !notificationExpanded;


      renderNotifications();

    }
  );

}


/* =========================================================
   COUNT UP
   ========================================================= */

function animateCountUps() {

  document
    .querySelectorAll(".count-up")
    .forEach(element => {


      const target =
        parseInt(
          element.dataset.target,
          10
        );


      let current = 0;


      const step =
        Math.max(
          1,
          Math.round(target / 30)
        );


      const timer =
        setInterval(() => {


          current += step;


          if (current >= target) {

            current = target;

            clearInterval(timer);

          }


          element.textContent =
            current;


        }, 25);

    });

}


/* =========================================================
   PROGRESS BAR
   ========================================================= */

function animateProgressBars() {

  document
    .querySelectorAll(".progress-fill")
    .forEach(bar => {


      const fill =
        bar.dataset.fill;


      setTimeout(() => {

        bar.style.width =
          fill + "%";

      }, 250);

    });

}

