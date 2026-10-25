Co-solve

Co-solve connects people who have real problems with students who can solve them, and with organizations willing to fund the work and hire the people who deliver.

Right now this is a front-end prototype. There's no backend, login is faked, and all the data is mock data. It's meant to show how the product looks and flows, not to run in production.

The three roles
Problem Provider: reports problems around them (a flooded road, broken streetlights, a school with no records) and tracks them until they're fixed.
Problem Solver: usually a student. Browses problems that match their skills and builds a record of work they've done.
Organization: funds problems and looks for solvers to hire.

Each role gets its own dashboard with its own sidebar.

Running it

You need Node 18 or newer.

npm install
npm run dev

Then open the address Vite prints, usually http://localhost:5173. For a production build use npm run build, and npm run preview to look at the result.

What's working
Landing page with a 3D scroll scene, role cards and a login / mode picker
Dashboards for all three roles (stats, problem table with status filters, activity feed, side panels)
Your last role and last section are remembered, so logging back in puts you where you left off
Report a Problem (Provider only): title, category, location and details, up to 4 photos, and a voice note up to 60 seconds that you record in the browser or upload as a file
Flagging: anyone can flag someone else's report as useless. At 3 flags it's collapsed, marked as flagged, and dropped from the dashboard tables. A toggle on the Report page brings them back into view, and you can undo your own flag

The other sidebar items (My Problems, Messages, Browse Problems and so on) show a "coming soon" page for now.

Things to know
Reports, flags and your session are saved in the browser's localStorage. Clearing site data wipes them.
Photos and audio are stored as base64 strings. If they're too big for localStorage, the text part of the report is still kept but the media is lost on reload. A real backend with file storage fixes this.
Voice recording needs microphone permission, and browsers only allow it on localhost or HTTPS. If it's blocked, the upload option still works.
The "3 flags" limit lives in src/lib/problemsStore.js (FLAG_HIDE_AT). Two example useless reports are seeded there too, so you can see what flagged ones look like.
Project layout
src/
  pages/          Landing, DashboardRoute, ReportProblem, dashboards/
  components/
    landing/      hero, roles, login and mode modals
    dashboard/    stats, problem table, panels, activity feed
    report/       form, photo picker, voice recorder, community feed
    layout/       topbar, sidebar, dashboard shell
    three/        the scroll scene
    ui/           small shared pieces (modal, badges, stat card)
  data/           mock data
  lib/            session.js (resume where you left off), problemsStore.js (reports and flags)
  constants/      status colours
Built with

React 18, Vite, Tailwind CSS, React Router, three.js and lucide-react icons.

Next steps
A real backend and auth (the session helper is written so it can be swapped out)
Proper file storage for photos and voice notes
Build the remaining sidebar sections, starting with My Problems and Browse Problems
Flag reasons (duplicate, spam, not a real problem) and a way for admins to review flagged reports
