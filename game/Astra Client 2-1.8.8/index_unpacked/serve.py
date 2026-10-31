#!/usr/bin/env python3
"""Serve this folder on http://localhost:8000 and open the game. Close the window to stop."""
import functools, http.server, os, threading, webbrowser

here = os.path.dirname(os.path.abspath(__file__))
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=here)
for port in range(8000, 8020):
    try:
        srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
        break
    except OSError:
        continue
else:
    raise SystemExit("no free port in 8000-8019")
url = "http://localhost:%d/index.html" % port
print("Serving", here, "at", url, "(Ctrl+C to stop)")
threading.Timer(0.8, lambda: webbrowser.open(url)).start()
try:
    srv.serve_forever()
except KeyboardInterrupt:
    pass
