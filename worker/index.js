const page = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f3f0e8">
    <title>The Casting Room</title>
    <style>
      :root {
        color: #171714;
        background: #f3f0e8;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-synthesis: none;
      }

      * { box-sizing: border-box; }

      body {
        min-width: 320px;
        min-height: 100vh;
        margin: 0;
        background: #f3f0e8;
      }

      button, input { font: inherit; }
      button { cursor: pointer; }

      .masthead {
        position: sticky;
        z-index: 10;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        min-height: 78px;
        padding: 14px clamp(18px, 4vw, 64px);
        color: #fffdf6;
        background: #171714;
        border-bottom: 4px solid #df3b2f;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .brand-mark {
        display: grid;
        flex: 0 0 auto;
        width: 38px;
        height: 38px;
        place-items: center;
        color: #171714;
        background: #f0be42;
        border-radius: 50%;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 23px;
        font-weight: 700;
      }

      .brand-copy strong {
        display: block;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 22px;
        line-height: 1;
      }

      .brand-copy span {
        display: block;
        margin-top: 5px;
        color: #bdb9af;
        font-size: 10px;
        font-weight: 750;
        letter-spacing: .14em;
        text-transform: uppercase;
      }

      .new-list {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        min-height: 44px;
        padding: 0 18px;
        color: white;
        background: #df3b2f;
        border: 1px solid #df3b2f;
        border-radius: 4px;
        font-weight: 800;
      }

      .new-list:hover { background: #bd2e25; }
      .new-list:disabled { cursor: wait; opacity: .72; }

      .refresh-icon {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      }

      .loading .refresh-icon { animation: spin .8s linear infinite; }

      main {
        width: min(1480px, 100%);
        margin: 0 auto;
        padding: clamp(30px, 5vw, 66px) clamp(18px, 4vw, 64px) 64px;
      }

      .intro {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: end;
        gap: 28px;
        margin-bottom: 28px;
        padding-bottom: 22px;
        border-bottom: 1px solid #a9a59b;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: #b52d24;
        font-size: 11px;
        font-weight: 850;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      h1 {
        max-width: 880px;
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(38px, 6vw, 78px);
        font-weight: 500;
        line-height: .98;
      }

      .deck-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
      }

      .status {
        color: #615e56;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
      }

      .filter {
        display: inline-flex;
        padding: 3px;
        background: #dedad0;
        border: 1px solid #c4c0b6;
        border-radius: 5px;
      }

      .filter button {
        min-height: 34px;
        padding: 0 12px;
        color: #5b5851;
        background: transparent;
        border: 0;
        border-radius: 3px;
        font-size: 12px;
        font-weight: 800;
      }

      .filter button[aria-pressed="true"] {
        color: #fff;
        background: #171714;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: clamp(14px, 2vw, 26px);
      }

      .card {
        position: relative;
        min-width: 0;
        overflow: hidden;
        background: #fffdf7;
        border: 1px solid #c9c5ba;
        border-radius: 5px;
        box-shadow: 0 10px 24px rgba(28, 25, 19, .08);
        animation: rise .42s both;
      }

      .portrait-wrap {
        position: relative;
        overflow: hidden;
        aspect-ratio: 2 / 2.65;
        background: #d7d2c6;
      }

      .portrait {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: saturate(.86) contrast(1.03);
        transition: transform .35s ease, filter .35s ease;
      }

      .card:hover .portrait {
        transform: scale(1.025);
        filter: saturate(1) contrast(1.03);
      }

      .number {
        position: absolute;
        top: 10px;
        left: 10px;
        display: grid;
        width: 34px;
        height: 34px;
        place-items: center;
        color: #171714;
        background: #f0be42;
        border-radius: 50%;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 15px;
        font-weight: 700;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .18);
      }

      .card-copy {
        min-height: 154px;
        padding: 18px 18px 20px;
      }

      .card h2 {
        margin: 0 0 10px;
        overflow-wrap: anywhere;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(20px, 2vw, 28px);
        font-weight: 600;
        line-height: 1.02;
      }

      .movies {
        margin: 0;
        color: #666158;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 14px;
        font-style: italic;
        line-height: 1.45;
      }

      .skeleton {
        min-height: 450px;
        background: #dedad0;
        border: 1px solid #cbc6ba;
        border-radius: 5px;
        animation: pulse 1.2s ease-in-out infinite alternate;
      }

      .error {
        display: none;
        grid-column: 1 / -1;
        min-height: 320px;
        padding: 42px;
        place-items: center;
        text-align: center;
        background: #fffdf7;
        border: 1px solid #c9c5ba;
        border-radius: 5px;
      }

      .error.visible { display: grid; }
      .error h2 { margin: 0 0 8px; font-family: Georgia, "Times New Roman", serif; font-size: 30px; }
      .error p { max-width: 540px; margin: 0; color: #666158; line-height: 1.55; }

      footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 26px clamp(18px, 4vw, 64px);
        color: #a7a399;
        background: #171714;
        font-size: 11px;
        line-height: 1.5;
      }

      .tmdb {
        color: #79c9c7;
        font-size: 16px;
        font-weight: 900;
        letter-spacing: .08em;
        text-decoration: none;
      }

      dialog {
        width: min(480px, calc(100% - 32px));
        padding: 0;
        color: #171714;
        background: #fffdf7;
        border: 1px solid #171714;
        border-radius: 6px;
        box-shadow: 0 20px 80px rgba(0, 0, 0, .32);
      }

      dialog::backdrop { background: rgba(23, 23, 20, .72); }
      .dialog-body { padding: 30px; }
      .dialog-body h2 { margin: 0 0 9px; font-family: Georgia, "Times New Roman", serif; font-size: 30px; }
      .dialog-body p { margin: 0 0 20px; color: #666158; font-size: 14px; line-height: 1.5; }
      .dialog-body label { display: block; margin-bottom: 7px; font-size: 12px; font-weight: 850; }
      .dialog-body input {
        width: 100%;
        min-height: 45px;
        padding: 0 12px;
        background: white;
        border: 1px solid #99958c;
        border-radius: 4px;
      }
      .dialog-actions { display: flex; justify-content: flex-end; margin-top: 16px; }
      .connect {
        min-height: 42px;
        padding: 0 18px;
        color: white;
        background: #df3b2f;
        border: 0;
        border-radius: 4px;
        font-weight: 800;
      }

      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { from { opacity: .55; } to { opacity: .95; } }
      @keyframes rise {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 1100px) {
        .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      }

      @media (max-width: 720px) {
        .masthead { min-height: 68px; }
        .brand-copy span { display: none; }
        .new-list { width: 44px; padding: 0; }
        .new-list span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
        .intro { grid-template-columns: 1fr; align-items: start; }
        .deck-meta { justify-content: flex-start; }
        .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .card-copy { min-height: 145px; padding: 14px; }
        footer { align-items: flex-start; flex-direction: column; }
      }

      @media (max-width: 430px) {
        .grid { gap: 10px; }
        .card-copy { min-height: 150px; padding: 12px; }
        .card h2 { font-size: 19px; }
        .movies { font-size: 12px; }
        .number { top: 7px; left: 7px; width: 30px; height: 30px; }
        .status { width: 100%; }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
      }
    </style>
  </head>
  <body>
    <header class="masthead">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true">C</div>
        <div class="brand-copy">
          <strong>The Casting Room</strong>
          <span>A-list and B-list screen talent</span>
        </div>
      </div>
      <button class="new-list" id="new-list" type="button">
        <svg class="refresh-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.34 5.66"></path><path d="M20 4v7h-7"></path></svg>
        <span>Generate new list</span>
      </button>
    </header>

    <main>
      <section class="intro" aria-labelledby="page-title">
        <div>
          <p class="eyebrow">Today’s shortlist</p>
          <h1 id="page-title">Ten names. One exceptional cast.</h1>
        </div>
        <div class="deck-meta">
          <span class="status" id="status" aria-live="polite">Building your shortlist…</span>
          <div class="filter" aria-label="Performer filter">
            <button type="button" data-gender="all" aria-pressed="true">All</button>
            <button type="button" data-gender="female" aria-pressed="false">Actresses</button>
            <button type="button" data-gender="male" aria-pressed="false">Actors</button>
          </div>
        </div>
      </section>

      <section class="grid" id="grid" aria-busy="true" aria-live="polite"></section>
    </main>

    <footer>
      <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      <a class="tmdb" href="https://www.themoviedb.org" target="_blank" rel="noreferrer">TMDB</a>
    </footer>

    <dialog id="token-dialog">
      <form class="dialog-body" id="token-form">
        <h2>Connect TMDB</h2>
        <p>The server has no TMDB credential configured. Add a temporary v3 API key or Read Access Token to preview the app; it stays only in this open tab.</p>
        <label for="token">TMDB API key or Read Access Token</label>
        <input id="token" name="token" type="password" autocomplete="off" required>
        <div class="dialog-actions">
          <button class="connect" type="submit">Connect and generate</button>
        </div>
      </form>
    </dialog>

    <script>
      const grid = document.querySelector('#grid');
      const status = document.querySelector('#status');
      const newListButton = document.querySelector('#new-list');
      const dialog = document.querySelector('#token-dialog');
      const tokenForm = document.querySelector('#token-form');
      const filterButtons = Array.from(document.querySelectorAll('[data-gender]'));
      let gender = 'all';
      let temporaryToken = '';

      function skeletons() {
        grid.innerHTML = '';
        for (let index = 0; index < 10; index += 1) {
          const block = document.createElement('div');
          block.className = 'skeleton';
          block.setAttribute('aria-hidden', 'true');
          grid.appendChild(block);
        }
      }

      function showError(message) {
        grid.innerHTML = '';
        const box = document.createElement('div');
        box.className = 'error visible';
        const inner = document.createElement('div');
        const heading = document.createElement('h2');
        const copy = document.createElement('p');
        heading.textContent = 'The shortlist hit a snag';
        copy.textContent = message;
        inner.append(heading, copy);
        box.appendChild(inner);
        grid.appendChild(box);
      }

      function renderCard(person, index) {
        const article = document.createElement('article');
        article.className = 'card';
        article.style.animationDelay = String(index * 35) + 'ms';

        const portraitWrap = document.createElement('div');
        portraitWrap.className = 'portrait-wrap';
        const image = document.createElement('img');
        image.className = 'portrait';
        image.src = person.image;
        image.alt = 'Headshot of ' + person.name;
        image.width = 500;
        image.height = 663;
        image.decoding = 'async';
        if (index > 4) image.loading = 'lazy';
        const number = document.createElement('span');
        number.className = 'number';
        number.textContent = String(index + 1).padStart(2, '0');
        portraitWrap.append(image, number);

        const copy = document.createElement('div');
        copy.className = 'card-copy';
        const name = document.createElement('h2');
        name.textContent = person.name;
        const movies = document.createElement('p');
        movies.className = 'movies';
        movies.textContent = person.movies.join(' · ');
        copy.append(name, movies);
        article.append(portraitWrap, copy);
        return article;
      }

      async function generate() {
        newListButton.disabled = true;
        newListButton.classList.add('loading');
        grid.setAttribute('aria-busy', 'true');
        status.textContent = 'Building your shortlist…';
        skeletons();

        const headers = temporaryToken ? { 'x-tmdb-token': temporaryToken } : {};

        try {
          const response = await fetch('/api/cast?gender=' + encodeURIComponent(gender), { headers });
          const data = await response.json().catch(() => ({}));

          if (response.status === 503 && data.code === 'TMDB_NOT_CONFIGURED') {
            grid.innerHTML = '';
            status.textContent = 'TMDB connection needed';
            dialog.showModal();
            return;
          }

          if (!response.ok) throw new Error(data.error || 'Could not generate a new cast right now.');

          grid.innerHTML = '';
          data.people.forEach((person, index) => grid.appendChild(renderCard(person, index)));
          status.textContent = data.people.length + ' performers · ' + data.poolLabel;
        } catch (error) {
          status.textContent = 'Generation failed';
          showError(error.message || 'Could not generate a new cast right now.');
        } finally {
          grid.setAttribute('aria-busy', 'false');
          newListButton.disabled = false;
          newListButton.classList.remove('loading');
        }
      }

      newListButton.addEventListener('click', generate);

      filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          gender = button.dataset.gender;
          filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
          generate();
        });
      });

      tokenForm.addEventListener('submit', (event) => {
        event.preventDefault();
        temporaryToken = new FormData(tokenForm).get('token').trim();
        if (!temporaryToken) return;
        dialog.close();
        tokenForm.reset();
        generate();
      });

      generate();
    </script>
  </body>
</html>`;

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const bundledTmdbApiKey = "1279b319c7c1b61ab29e5be0588fd278";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
    const swapIndex = Math.floor(random * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function randomPages(count, maximum = 20) {
  const pages = new Set();
  while (pages.size < count) {
    const value = (crypto.getRandomValues(new Uint32Array(1))[0] % maximum) + 1;
    pages.add(value);
  }
  return [...pages];
}

function credentialFrom(value) {
  if (!value) return null;
  return /^[a-f0-9]{32}$/i.test(value)
    ? { type: "apiKey", value }
    : { type: "bearer", value };
}

async function tmdb(path, credential) {
  const url = new URL(`https://api.themoviedb.org/3${path}`);
  const headers = { accept: "application/json" };

  if (credential.type === "apiKey") {
    url.searchParams.set("api_key", credential.value);
  } else {
    headers.authorization = `Bearer ${credential.value}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    if (response.status === 401) throw new Error("TMDB rejected the API credential.");
    throw new Error(`TMDB request failed with status ${response.status}.`);
  }

  return response.json();
}

function movieCreditsFromKnownFor(person) {
  return (person.known_for || []).filter(
    (credit) =>
      credit.media_type === "movie" &&
      credit.title &&
      credit.vote_count >= 250 &&
      credit.adult !== true,
  );
}

function isRecognizableActor(person, gender) {
  if (person.known_for_department !== "Acting" || !person.profile_path) return false;
  if (gender === "female" && person.gender !== 1) return false;
  if (gender === "male" && person.gender !== 2) return false;

  const films = movieCreditsFromKnownFor(person);
  const totalVotes = films.reduce((sum, film) => sum + (film.vote_count || 0), 0);
  return films.length >= 2 && films.some((film) => film.vote_count >= 1000) && totalVotes >= 2500;
}

function rankMovies(credits, fallback) {
  const currentDate = new Date().toISOString().slice(0, 10);
  const unique = new Map();

  [...(credits || []), ...(fallback || [])].forEach((movie) => {
    if (
      !movie.title ||
      movie.adult === true ||
      (movie.release_date && movie.release_date > currentDate) ||
      (movie.vote_count || 0) < 250
    ) {
      return;
    }

    const score =
      Math.log10((movie.vote_count || 0) + 10) * (movie.vote_average || 0) * 2 +
      Math.log1p(movie.popularity || 0) * 4;
    const existing = unique.get(movie.id);
    if (!existing || existing.score < score) unique.set(movie.id, { title: movie.title, score });
  });

  return [...unique.values()]
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map((movie) => movie.title);
}

async function generateCast(credential, gender) {
  const pages = randomPages(7);
  const batches = await Promise.all(
    pages.map((pageNumber) =>
      tmdb(`/person/popular?language=en-US&page=${pageNumber}`, credential),
    ),
  );

  const allPeople = batches.flatMap((batch) => batch.results || []);
  let candidates = allPeople.filter((person) => isRecognizableActor(person, gender));

  if (candidates.length < 10) {
    candidates = allPeople.filter((person) => {
      if (person.known_for_department !== "Acting" || !person.profile_path) return false;
      if (gender === "female" && person.gender !== 1) return false;
      if (gender === "male" && person.gender !== 2) return false;
      const films = movieCreditsFromKnownFor(person);
      return films.length >= 2 && films.reduce((sum, film) => sum + (film.vote_count || 0), 0) >= 1200;
    });
  }

  const selected = shuffle(candidates).slice(0, 10);
  if (selected.length < 10) {
    throw new Error("TMDB did not return enough recognizable performers. Please generate again.");
  }

  const people = await Promise.all(
    selected.map(async (person) => {
      const credits = await tmdb(`/person/${person.id}/movie_credits?language=en-US`, credential);
      return {
        id: person.id,
        name: person.name,
        image: `https://image.tmdb.org/t/p/w500${person.profile_path}`,
        movies: rankMovies(credits.cast, movieCreditsFromKnownFor(person)),
      };
    }),
  );

  return people.filter((person) => person.movies.length === 3);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(page, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
          "content-security-policy":
            "default-src 'self'; img-src 'self' https://image.tmdb.org data:; connect-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
          "x-content-type-options": "nosniff",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      });
    }

    if (url.pathname === "/api/cast") {
      if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);

      const temporaryCredential = request.headers.get("x-tmdb-token") || "";
      const credential =
        credentialFrom(env?.TMDB_ACCESS_TOKEN) ||
        credentialFrom(env?.TMDB_API_KEY) ||
        credentialFrom(temporaryCredential) ||
        credentialFrom(bundledTmdbApiKey);
      if (!credential) {
        return json(
          {
            code: "TMDB_NOT_CONFIGURED",
            error: "Set the TMDB_API_KEY or TMDB_ACCESS_TOKEN environment variable.",
          },
          503,
        );
      }

      const requestedGender = url.searchParams.get("gender");
      const gender = ["female", "male"].includes(requestedGender) ? requestedGender : "all";

      try {
        const people = await generateCast(credential, gender);
        if (people.length < 10) {
          throw new Error("The movie-credit filter returned too few performers. Please generate again.");
        }
        return json({ people, poolLabel: "drawn from 400+ notable performers" });
      } catch (error) {
        const status = error.message.includes("rejected") ? 401 : 502;
        return json({ error: error.message || "Could not reach TMDB." }, status);
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
