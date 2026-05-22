import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=os.environ.get("FRONTEND_ORIGIN", "*").split(","))

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"ok": True, "status": "University systems operational"})

@app.route('/api/preferences', methods=['POST'])
def update_preferences():
    data = request.json
    # Simulate database latency
    time.sleep(0.5)
    
    username = data.get('username', 'Unknown Student')
    dark_mode = data.get('darkMode', False)
    
    print(f"Updating preferences for {username}: DarkMode={dark_mode}")
    
    return jsonify({
        "status": "success",
        "message": f"Preferences for {username} updated successfully",
        "received": {
            "username": username,
            "darkMode": dark_mode
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)