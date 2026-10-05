from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Store the latest GPS location for each bus
bus_locations = {}


# -----------------------------------------
# HOME / SERVER TEST
# -----------------------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "ROUTEX backend is running"
    })


# -----------------------------------------
# RECEIVE DRIVER GPS LOCATION
# -----------------------------------------
@app.route("/api/location", methods=["POST"])
def receive_location():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No location data received"
        }), 400

    bus = data.get("bus")

    if not bus:
        return jsonify({
            "success": False,
            "message": "Bus number is missing"
        }), 400

    location_data = {
        "bus": bus,
        "driverId": data.get("driverId", ""),
        "driverName": data.get("driverName", ""),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
        "timestamp": data.get(
            "timestamp",
            datetime.now().isoformat()
        ),
        "active": data.get("active", False)
    }

    # Save latest location
    bus_locations[bus] = location_data

    # Show received GPS in Command Prompt
    print("\n======================================")
    print("       ROUTEX GPS LOCATION RECEIVED")
    print("======================================")
    print("Bus       :", bus)
    print("Driver ID :", location_data["driverId"])
    print("Driver    :", location_data["driverName"])
    print("Latitude  :", location_data["latitude"])
    print("Longitude :", location_data["longitude"])
    print("Active    :", location_data["active"])
    print("Time      :", location_data["timestamp"])
    print("======================================\n")

    return jsonify({
        "success": True,
        "message": "GPS location received successfully",
        "data": location_data
    })


# -----------------------------------------
# GET LOCATION OF ONE BUS
# Example:
# /api/location/BUS-06
# -----------------------------------------
@app.route("/api/location/<bus>", methods=["GET"])
def get_bus_location(bus):

    location = bus_locations.get(bus)

    if not location:
        return jsonify({
            "success": False,
            "message": "No GPS location available for " + bus
        }), 404

    return jsonify({
        "success": True,
        "data": location
    })


# -----------------------------------------
# GET ALL BUS LOCATIONS
# -----------------------------------------
@app.route("/api/locations", methods=["GET"])
def get_all_locations():

    return jsonify({
        "success": True,
        "data": bus_locations
    })


# -----------------------------------------
# START SERVER
# -----------------------------------------
if __name__ == "__main__":

    print("")
    print("======================================")
    print("       ROUTEX LIVE GPS SERVER")
    print("======================================")
    print("Server running on port 5000")
    print("Laptop IP: 192.168.1.4")
    print("")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )