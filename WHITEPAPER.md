# Ultimate Racing League White Paper

## 1. Vision

Ultimate Racing League is a professional motorsports esports platform built specifically for racing inside the Upland.me game ecosystem. The site exists to turn Upland racing activity into a structured competitive league with public race history, trusted results, custom leaderboards, team identity, and a polished fan-facing experience.

The product should feel like a serious racing organization: fast, competitive, data-driven, and credible. It should not feel like a casual hobby page or a generic gaming site. The visual direction should be designed around the official Ultimate Racing League logo and use that identity as the foundation for color, typography, layout, and motion.

## 2. Scope

Ultimate Racing League is strictly focused on video game racing inside Upland.me.

The platform will not manually collect race results from users. Race data should come from the Upland.me API whenever possible. The website should present that data clearly, calculate custom leaderboard views, and make the league feel organized and official.

## 3. Primary Users

### Public Visitors

Public visitors can view the homepage, current standings, race results, driver profiles, team pages, race history, and league information without needing an account.

### Drivers

Drivers participate in Upland races and appear in race result data pulled from the Upland.me API. Driver profiles should summarize performance, history, ranking, team affiliation, and notable results.

### Teams

Teams represent organized groups of drivers. Team pages should show roster, vehicles where relevant, results, total points, wins, podiums, and custom leaderboard rankings.

### Admins

Admins manage league structure, configure leaderboard rules, manage featured races or seasons, and resolve any data mapping issues between Upland.me API records and Ultimate Racing League profiles.

### Owners

Owners operate the league at the business and platform level. Owners can manage site content, league configuration, sponsors, teams, and admin-level workflows. Owner access should be treated as management access alongside Admin.

### Fans and Sponsors

Fans and sponsors should be able to follow races, rankings, teams, and drivers through a polished esports-style public experience.

Sponsors are official league partners. Sponsor accounts should eventually manage sponsor profile information, brand placements, campaign assets, and visibility across public league pages without needing full Admin or Owner access.

### Role Tree

Ultimate Racing League uses four core account roles:

- Admin: platform operations, content management, API sync oversight, race data correction, and role management.
- Owner: league ownership, business configuration, sponsor oversight, and full management access.
- Sponsor: sponsor profile, sponsor assets, campaign visibility, and limited partner dashboard access.
- Driver: personal racing profile, team affiliation, race history, rankings, and claimable Upland identity.

Admin and Owner roles can access management dashboards. Sponsor and Driver roles should receive tailored dashboard experiences without site-wide management permissions.

## 4. Core Product Experience

### Homepage

The homepage should immediately communicate that Ultimate Racing League is a professional Upland racing esports league. It should feature the official logo prominently, highlight current standings, showcase recent race results, and drive visitors toward leaderboards, teams, drivers, and upcoming league activity.

### Login and Registration

Login and registration should support future member features, but public race results and leaderboards should remain accessible without logging in.

Early account features may include admin access, profile claiming, team management, and saved preferences.

### Dashboard

The dashboard should eventually adapt to the signed-in user role:

- Drivers see their race history, rankings, claimed profile, and team status.
- Sponsors see sponsor profile status, placements, and campaign assets.
- Owners see business settings, sponsor management, site content, and league administration.
- Team owners see roster and team leaderboard data.
- Admins see configuration, API sync status, and data management tools.

### Race Results

Race results should be pulled from the Upland.me API and published publicly as soon as they are available. The site should not require manual admin approval before showing results.

If API data needs normalization or matching, the site may include admin tools for correcting mappings without hiding the public results.

### Leaderboards

Leaderboards are the heart of the site. They should be custom-built from race times and other race metadata pulled from the Upland.me API.

Initial leaderboard types may include:

- Fastest overall race times
- Fastest times by track
- Fastest times by race type
- Driver rankings
- Team rankings
- Season standings
- Recent form
- All-time records

The leaderboard system should be flexible enough to add new scoring formulas later.

## 5. Data Strategy

The Upland.me API is the source of truth for race results. Ultimate Racing League will ingest, store, and transform that data into league-specific views.

Core database tables:

- `profiles`
- `races`
- `race_results`
- `leaderboards`
- `vehicles`
- `teams`

Additional tables may be needed later:

- `api_sync_runs`
- `seasons`
- `tracks`
- `driver_aliases`
- `team_members`
- `leaderboard_rules`

## 6. Publishing Rules

Race results should be public immediately after they are pulled from the Upland.me API.

The site should clearly show when data was last synced, especially on leaderboard and race result pages. If there is uncertainty in the API data, the platform should show that as a data status issue rather than blocking publication.

## 7. Brand and Design Direction

The site should be designed around the Ultimate Racing League logo.

The current brand mark is a monochrome shield badge with checkered racing trim, a central `URL` wordmark, an `Ultimate Racing League` banner, and supporting icons for community, vehicles, race operations, announcements, and energy. This should guide the visual language of the website.

The design should feel like:

- Professional motorsports
- Esports broadcast
- Competitive league infrastructure
- Fast, precise, and data-rich
- Black-and-white race control
- Shield/badge authority
- Checkered flag competition

The design should avoid feeling like:

- A generic template
- A casual gaming fan page
- A basic spreadsheet of race times
- A fantasy racing concept disconnected from Upland.me
- A colorful arcade racer

Once the logo is added to the project, the visual system should be derived from it:

- Primary colors: black, white, charcoal, and silver/steel.
- Accent colors should be restrained and used for status, timing, or alerts.
- Headers should feel like broadcast lower-thirds, timing boards, or race-control panels.
- Buttons should be sharp, high-contrast, and functional.
- Race cards should feel like official event cards rather than decorative content blocks.
- Leaderboards should feel like motorsport timing towers.
- Sponsor and broadcast-style modules should use the logo's badge/banner geometry.

## 8. Technical Direction

The current application is a Next.js app deployed on Vercel and connected to the custom domain:

- `ultimateracingleague.com`
- `www.ultimateracingleague.com`

Supabase is the planned backend for authentication and database storage.

The first major engineering milestone is to connect the site to Supabase and prepare the schema for API-sourced racing data. After that, the Upland.me API integration should become the main data pipeline.

## 9. First Build Milestones

### Milestone 1: Brand Foundation

- Add the official Ultimate Racing League logo.
- Update homepage design around the logo.
- Establish colors, typography, and page layout patterns.

### Milestone 2: Public League Pages

- Homepage
- Leaderboard
- Race results
- Teams
- Drivers

### Milestone 3: Supabase Setup

- Supabase Auth
- Database tables
- Admin role
- API sync storage

### Milestone 4: Upland.me API Integration

- Pull race data from Upland.me.
- Store normalized results.
- Show public race result pages.
- Show last sync time.

### Milestone 5: Custom Leaderboards

- Fastest time views
- Track-based rankings
- Driver rankings
- Team rankings
- Season filters

### Milestone 6: Admin Tools

- API sync dashboard
- Driver/profile matching
- Team management
- Leaderboard rule configuration

## 10. Guiding Principle

Ultimate Racing League should make Upland racing feel like a real professional esports motorsports league. Every page should increase trust, excitement, and competitive clarity.

The site should answer three questions quickly:

- Who raced?
- Who was fastest?
- Who leads the league?
