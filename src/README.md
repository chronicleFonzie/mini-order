# Mini Order (Angular)

A tiny Angular app that lets you look up an order and its status history from a separate ASP.NET Core backend.

## Stack
- **Angular 20** (standalone components + hydration-ready)
- **TypeScript**
- **Node.js 20+**
- Talks to a backend at `http://localhost:5096` (see endpoints below)

## Prerequisites
- Node.js **20+** (check with `node -v`)
- npm **9+** (or use `corepack enable` and `pnpm`, if you prefer)
- Angular CLI (`npm i -g @angular/cli`) — optional if you run only via `npm start`

## Quick Start
From the project root (this folder):
```bash
# 1) Install
npm install

# 2) Configure API base URL (frontend)
#   Edit: src/environments/environment.ts
#   Set apiBase to the backend URL (HTTP, not HTTPS)
#   Example:
#   export const environment = {
#     production: false,
#     apiBase: 'http://localhost:5096'
#   };

# 3) Start backend (separate repo/process)
#    Make sure the ASP.NET Core app is running on http://localhost:5096

# 4) Run Angular dev server
npm start  # opens http://localhost:4200
```
Open `http://localhost:4200`, enter an order ID, click **View Order** or **View Order History**.

> Tip: Try IDs **1001** or **1002** (depending on how your backend seeds data).

## How it works
**OrderService** calls your backend:
- `GET {apiBase}/orders/:id` → order header (customer, product, total, status)
- `GET {apiBase}/orders/:id/history` → array of status history records

**Routes**
- `/` → Home (enter ID, navigate)
- `/orders/:id` → Order details
- `/orders/:id/history` → Order status history page

## Project Structure (key bits)
```
src/
  app/
    core/
      order.service.ts           # HTTP calls to backend
      order.ts                   # model types
    pages/
      home/                      # search input + navigation
      order-detail/              # detail + history view
        order-detail.component.*
        order-status-history.component.*
    app.routes.ts                # routes
    app.config.ts                # provideHttpClient(withFetch), router, hydration
    app.component.ts|html        # shell
  environments/environment.ts    # <-- set apiBase here
  main.ts                        # imports 'zone.js'
  main.server.ts                 # SSR entry (imports 'zone.js/node')
```

## Important config
- **Zone.js**: required for this configuration.
  - Browser: `src/main.ts` must include `import 'zone.js';`
  - Server (SSR): `src/main.server.ts` must include `import 'zone.js/node';`
- **HttpClient + fetch**: Already enabled in `app.config.ts` via `provideHttpClient(withFetch())`.
- **Hydration**: Enabled via `provideClientHydration(withEventReplay())`.

## CORS (don’t ignore this)
Since the frontend runs on **http://localhost:4200** and the backend on **http://localhost:5096**, your backend **must** allow CORS from 4200. In ASP.NET Core:
```csharp
// Program.cs
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:4200")
     .AllowAnyHeader()
     .AllowAnyMethod()
));

var app = builder.Build();
app.UseCors();       // <- this enables it
app.MapControllers();
app.Run();
```
No HTTPS redirection is used; keep both sides on **HTTP** to avoid mixed-content issues.

## Troubleshooting
- **CORS header ‘Access-Control-Allow-Origin’ missing**  
  Backend isn’t sending CORS. Add `AddCors` + `UseCors()` and ensure origin is exactly `http://localhost:4200`.
- **ECONNREFUSED / 404**  
  Backend isn’t running or wrong port. Confirm `http://localhost:5096` responds.
- **Zone.js error (NG0908)**  
  Ensure `import 'zone.js';` is in `src/main.ts` (and `import 'zone.js/node';` in `src/main.server.ts` if using SSR).
- **Port 4200 in use**  
  Find and kill: `lsof -i :4200 -sTCP:LISTEN -nP` (Linux/macOS) or `netstat -ano | findstr :4200` (Windows). Or run `ng serve --port 4300`.

## Scripts
- `npm start` → `ng serve`
- (optional) `ng serve --proxy-config proxy.conf.json`

## License
MIT (or your choice).
