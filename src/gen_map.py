# Bakes Natural Earth 1:50m country outlines into projected SVG path data for Scene 1.
import json, math, sys
SRC = sys.argv[1]
LON0, LON1, X0, X1 = 94.5, 141.5, 140, 1780
S = (X1 - X0) / (LON1 - LON0)
LAT0, Y0 = 6.6, 210
def proj(lon, lat): return (X0 + (lon - LON0) * S, Y0 + (LAT0 - lat) * S)

def dp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; n = math.hypot(dx, dy) or 1e-9
    imax, dmax = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / n
        if d > dmax: imax, dmax = i, d
    if dmax > eps:
        return dp(pts[:imax + 1], eps)[:-1] + dp(pts[imax:], eps)
    return [pts[0], pts[-1]]

def rings(geom):
    polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for poly in polys: yield poly[0]

def ring_path(ring):
    pts = [proj(lon, lat) for lon, lat in ring]
    h = len(pts) // 2
    pts = dp(pts[:h + 1], 0.55)[:-1] + dp(pts[h:], 0.55) if len(pts) > 4 else pts
    per = sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
    d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"
    cx = sum(p[0] for p in pts) / len(pts)
    return d, per, cx

data = json.load(open(SRC, encoding="utf-8"))
indo, nb = [], []
NEIGH = {"Malaysia", "Brunei", "Singapore", "Papua New Guinea", "East Timor", "Philippines", "Australia", "Thailand"}
for f in data["features"]:
    name = f["properties"]["ADMIN"]
    if name == "Indonesia":
        for r in rings(f["geometry"]):
            d, per, cx = ring_path(r)
            if per > 22: indo.append((cx, d))
    elif name in NEIGH:
        for r in rings(f["geometry"]):
            d, per, cx = ring_path(r)
            if per > 30: nb.append(d)
indo.sort()
dots = [(96.1,4.15),(97.8,2.3),(97.25,1.1),(98.9,-1.45),(100.3,-0.98),(102.2,-3.85),(103.9,-5.25),
        (105.25,-6.85),(106.5,-7.05),(108.6,-7.75),(110.45,-8.08),(111.2,-8.25),(112.7,-8.42),(114.2,-8.62),
        (115.15,-8.86),(116.3,-8.93),(117.6,-9.02),(118.9,-8.85),(120.1,-10.05),(121.85,-10.6),(123.1,-10.88),(124.2,-10.25)]
out = {"indo": [d for _, d in indo], "neighbors": nb,
       "dots": [[round(c, 1) for c in proj(lon, lat)] for lon, lat in dots],
       "target": [round(c, 1) for c in proj(110.45, -8.08)]}
js = "const MAP_DATA = " + json.dumps(out, separators=(",", ":")) + ";\n"
open("src/map-data.js", "w", encoding="utf-8").write(js)
print(len(indo), "indo rings,", len(nb), "neighbor rings,", len(js) // 1024, "KB")
