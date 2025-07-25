import json
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/api/move", methods=["POST"])
def make_move():
    data = request.get_json()
    if not data or "move" not in data or "player" not in data:
        return jsonify({"error": "Invalid input"}), 400
