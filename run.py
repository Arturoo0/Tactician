from app import create_app
import os

application = create_app()
port = int(os.environ.get("PORT", 5000))
application.run(debug=True, host="0.0.0.0", port=port)