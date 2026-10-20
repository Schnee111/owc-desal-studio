# Bakes a detailed Bali / Nusa Penida coastline (Natural Earth 1:10m land) for the
# Scene 1 push-in, in the same projection as gen_map.py. Usage:
#   python src/gen_bali.py ne_10m_land.geojson
import json, math, sys
LON0, LON1, X0, X1 = 94.5, 141.5, 140, 1780
S = (X1 - X0) / (LON1 - LON0)
LAT0, Y0 = 6.6, 210
BOX = (110.8, 119.8, -11.0, -6.4)  # lon0, lon1, lat0, lat1: the frame at the 8x push-in

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

def clip(ring):
    # keep only the stretch of a huge ring (e.g. Java) that falls inside a padded box
    lon0, lon1, lat0, lat1 = BOX
    inside = [lon0 - .4 <= lon <= lon1 + .4 and lat0 - .4 <= lat <= lat1 + .4 for lon, lat in ring]
    if all(inside): return [ring]
    runs, cur = [], []
    for p, ok in zip(ring, inside):
        if ok: cur.append(p)
        elif cur: runs.append(cur); cur = []
    if cur: runs.append(cur)
    return [r for r in runs if len(r) > 3]

data = json.load(open(sys.argv[1], encoding="utf-8"))
paths = []
for f in data["features"]:
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for poly in polys:
        ring = poly[0]
        lons = [p[0] for p in ring]; lats = [p[1] for p in ring]
        if max(lons) < BOX[0] or min(lons) > BOX[1] or max(lats) < BOX[2] or min(lats) > BOX[3]: continue
        for part in clip(ring):
            closed = part is ring
            raw = [proj(lon, lat) for lon, lat in part]
            h = len(raw) // 2  # a closed ring starts and ends on one point: simplify halves
            pts = dp(raw[:h + 1], 0.06)[:-1] + dp(raw[h:], 0.06)
            if len(pts) < 4: continue
            d = "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + ("Z" if closed else "")
            paths.append({"d": d, "closed": closed})

marks = {"penida": proj(115.47, -8.755), "kuta": proj(115.165, -8.62), "target": proj(115.53, -8.80)}
out = {"paths": paths, "marks": {k: [round(v, 2) for v in xy] for k, xy in marks.items()}}
js = "const BALI_DATA = " + json.dumps(out, separators=(",", ":")) + ";\n"
open("src/bali-data.js", "w", encoding="utf-8").write(js)
print(len(paths), "paths,", len(js) // 1024, "KB", out["marks"])
