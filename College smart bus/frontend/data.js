/* =========================================================
   ROUTEX DATA
   ========================================================= */


/* =========================================================
   BUS DATA
   ========================================================= */

const BUS_DATA = {

  bus01: {

    number: "Bus 01",

    currentLocationLabel: "Near Velachery",

    eta: "8",

    distance: "2.4 km",

    routeLabel:
      "Route 01 • Perambakkam to SVCET College",

    stops: [

      {
        name: "Perambakkam",
        sub: "Stop 1",
        time: "6:00 AM",
        lat: 13.0175,
        lng: 79.8085,
        status: "done"
      },

      {
        name: "Kadambathur",
        sub: "Stop 2",
        time: "6:20 AM",
        lat: 13.0145,
        lng: 79.8920,
        status: "done"
      },

      {
        name: "Tiruvallur",
        sub: "Stop 3",
        time: "6:45 AM",
        lat: 13.1435,
        lng: 79.9080,
        status: "active"
      },

      {
        name: "Thirupachur",
        sub: "Stop 4",
        time: "7:10 AM",
        lat: 13.1250,
        lng: 79.9850,
        status: "upcoming"
      },

      {
        name: "SVCET College",
        sub: "Destination",
        time: "8:00 AM",
        lat: 13.1105,
        lng: 79.9905,
        status: "destination"
      }

    ]

  },


  bus06: {

    number: "Bus 06",

    currentLocationLabel: "Near Tiruvallur",

    eta: "15",

    distance: "5.8 km",

    routeLabel:
      "Route 06 • Tiruvallur to SVCET College",

    stops: [

      {
        name: "Tiruvallur",
        sub: "Stop 1",
        time: "6:15 AM",
        lat: 13.1435,
        lng: 79.9080,
        status: "done"
      },

      {
        name: "Thirupachur",
        sub: "Stop 2",
        time: "6:40 AM",
        lat: 13.1250,
        lng: 79.9850,
        status: "active"
      },

      {
        name: "Kadambathur",
        sub: "Stop 3",
        time: "7:00 AM",
        lat: 13.0145,
        lng: 79.8920,
        status: "upcoming"
      },

      {
        name: "SVCET College",
        sub: "Destination",
        time: "7:30 AM",
        lat: 13.1105,
        lng: 79.9905,
        status: "destination"
      }

    ]

  },


  bus07: {

    number: "Bus 07",

    currentLocationLabel: "Near Kadambathur",

    eta: "22",

    distance: "8.1 km",

    routeLabel:
      "Route 07 • Kadambathur to SVCET College",

    stops: [

      {
        name: "Kadambathur",
        sub: "Stop 1",
        time: "6:30 AM",
        lat: 13.0145,
        lng: 79.8920,
        status: "active"
      },

      {
        name: "Tiruvallur",
        sub: "Stop 2",
        time: "6:55 AM",
        lat: 13.1435,
        lng: 79.9080,
        status: "upcoming"
      },

      {
        name: "Thirupachur",
        sub: "Stop 3",
        time: "7:20 AM",
        lat: 13.1250,
        lng: 79.9850,
        status: "upcoming"
      },

      {
        name: "SVCET College",
        sub: "Destination",
        time: "8:00 AM",
        lat: 13.1105,
        lng: 79.9905,
        status: "destination"
      }

    ]

  }

};



/* =========================================================
   UPCOMING BUSES
   ========================================================= */

const UPCOMING_BUSES = [

  {
    number: "Bus 01",
    route: "Perambakkam → SVCET College",
    status: "On Time",
    eta: "8 mins"
  },

  {
    number: "Bus 06",
    route: "Tiruvallur → SVCET College",
    status: "On Time",
    eta: "15 mins"
  },

  {
    number: "Bus 07",
    route: "Kadambathur → SVCET College",
    status: "Delayed",
    eta: "22 mins"
  },

  {
    number: "Bus 01",
    route: "SVCET College → Perambakkam",
    status: "On Time",
    eta: "35 mins"
  },

  {
    number: "Bus 06",
    route: "SVCET College → Tiruvallur",
    status: "On Time",
    eta: "42 mins"
  },

  {
    number: "Bus 07",
    route: "SVCET College → Kadambathur",
    status: "Delayed",
    eta: "50 mins"
  }

];