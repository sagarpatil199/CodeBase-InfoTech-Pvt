# CodeBase Infotech website

Static frontend website for CodeBase Infotech (Codebase Infotech Private Limited).
Next.js (App Router, static export), React, TypeScript, Tailwind CSS, Motion and Lucide icons.
There is no backend, database, API route or login.

## Commands

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm install`     | Install dependencies                                  |
| `npm run dev`     | Start the development server at http://localhost:3000 |
| `npm run check`   | Type check, lint, format check and production build   |
| `npm run build`   | Build the static site into `out/`                     |
| `npm run preview` | Serve the built `out/` folder locally                 |
| `npm run format`  | Format all files with Prettier                        |

Upload the contents of `out/` to any static host.

## Pages

| Route                  | What it shows                                                 |
| ---------------------- | ------------------------------------------------------------- |
| `/`                    | Train hero, highlights and every section in short             |
| `/about/`              | Classroom illustration, audience, commitment, company details |
| `/education/`          | The learning journey and the featured programme               |
| `/education/<course>/` | Programme details: fee, duration, payment options, journey    |
| `/technologies/`       | Airplane and parachute technology cards, then stage by stage  |
| `/careers/`            | Career readiness (no placement claims), paths and highlights  |
| `/projects/`           | Illustrative example project concepts                         |
| `/services/`           | Software development (secondary business)                     |
| `/contact/`            | Institute illustration and the enquiry form                   |

## How the homepage train replays

The train entrance plays every time the homepage becomes active, with no
sessionStorage or localStorage:

- Arriving at `/` from another page (including the browser Back button)
  remounts the page through `src/app/template.tsx`, so the animation restarts.
- Home links (header, logo, footer) use `src/components/HomeLink.tsx`. On the
  homepage itself they scroll to the top and dispatch the replay event from
  `src/lib/homeReplay.ts`.
- A page restored from the browser's back/forward cache (`pageshow` with
  `persisted`) also replays.

Visitors who prefer reduced motion see the final scene with no animation.

## Illustrations

All illustrations are inline SVG React components in
`src/components/illustrations/` (student characters, Mumbai local train,
skyline, classroom, airplane, institute building). There are no large
background images. Technology logos are real brand marks in
`src/components/techLogos.ts`; "Data Engineering" is a discipline, so it uses a
generic icon.

## Editing content

All content lives in `src/data/`:

| File              | Contents                                                      |
| ----------------- | ------------------------------------------------------------- |
| `company.ts`      | Verified company details, introduction, highlights, site URL  |
| `courses.ts`      | Programme name, duration, fee, payment options, syllabus link |
| `technologies.ts` | The five learning stages and their technologies               |
| `services.ts`     | Software services (only `verified` entries are shown)         |
| `projects.ts`     | Illustrative project concepts                                 |
| `contact.ts`      | Phone, email, location, map link, enquiry delivery flag       |
| `careers.ts`      | Career journey steps, learning highlights, career paths       |
| `navigation.ts`   | Header and footer links                                       |

## Before going live

1. **Phone**: `src/data/contact.ts` holds a demo phone number, which the site does not show.
   Replace `phone.value`, then set `phone.isDemo: false` and a clickable "Call us" item appears on
   the contact section. The email (Hemant.Bamane@codebase-infotech.com) is real.
2. **Enquiry form**: a valid submission opens the visitor's email app with the enquiry
   pre-filled and addressed to `enquiryDelivery.to`. To receive enquiries without the visitor's
   email app, connect a form delivery service in `src/components/EnquiryForm.tsx`.
3. **Domain**: replace the placeholder `siteUrl` in `src/data/company.ts`.
4. **Syllabus**: put the PDF in `public/` and set `syllabusUrl` in `src/data/courses.ts`
   (for example `"/syllabus.pdf"`). The Download Syllabus button then appears.
5. **Map**: set `mapUrl` in `src/data/contact.ts` to the verified Google Maps link.
6. **Services**: add confirmed services to `src/data/services.ts` with `status: "verified"`.

The careers page describes career readiness only. It makes no placement, salary or hiring-partner
claims; add such content only once the company confirms it.

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it on every push
to `main`.

1. Push this project to a GitHub repository (branch `main`).
2. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push again, or run the workflow from the **Actions** tab. The site URL appears in the
   workflow run when it finishes.

The workflow sets `PAGES_BASE_PATH` for you, so the site works at
`https://<user>.github.io/<repo>/`. `public/.nojekyll` stops GitHub from hiding the `_next`
folder.

To upload the files by hand instead, build with the sub-path and upload the contents of `out/`:

```bash
PAGES_BASE_PATH=/<repo> npm run build
```
