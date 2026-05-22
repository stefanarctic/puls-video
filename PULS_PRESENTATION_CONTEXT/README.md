# PULS Presentation Context

Acest folder contine resursele utile pentru a construi o prezentare despre platforma PULS intr-un alt proiect Cursor.

## Fisier principal

- `PLAN_PREZENTARE_PULS_JURIU.md` - planul detaliat al prezentarii pentru juriu, cu structura pe slide-uri, mesaj, CTA-uri si ritm.

## Documentatie

Folderul `docs/` contine context narativ si tehnic:

- `README.md` - descriere generala PULS, functionalitati, stack, rute.
- `DESPRE_NOI.md` - context despre echipa si misiune.
- `documentatie4.md` - documentatie mai ampla despre proiect.
- `PROJECT_INDEX.md` - harta structurii proiectului.
- `tehnologii.md` - context despre tehnologiile folosite.

## Context din cod

Folderul `source-context/` contine fisiere utile pentru verificarea afirmatiilor din prezentare:

- `data/simulations.js` - catalogul de simulari si rutele lor.
- `data/bacProblems.js` - context despre problemele BAC.
- `lib/communityService.js` - logica pentru comunitate, XP, rank-uri si activitate.
- `lib/groqEvaluate.js` - context pentru feedback/evaluare AI.
- `lib/teacherClasses.js` - context pentru functionalitatile profesor-clasa.
- `lib/assignmentProgress.js` - context pentru progresul temelor.
- `api/chat.js` - proxy-ul pentru chat/asistent.
- `pages/` - pagini React relevante pentru homepage, simulari, BAC, resurse, comunitate si profesor.

## Capturi

Folderul `screenshots/` contine capturi existente din platforma, utile pentru slide-uri vizuale. Cele mai importante pentru pitch:

- `apa_grea_simulator.png`
- `schimb_izotopic_Screenshot.png`
- `Distilare_D2o_Fractionata_Resurse.png`
- `Eli_Np_Laser_Screenshot.png`
- `Laser_Simulator_Screenshot.png`
- `Accelerator_Laser_Screenshot.png`
- `Fisiune_Nucleara_Screenshot.png`
- `Reactor_Fuziune_Dt_Screenshot.png`

## Cum se foloseste in alt proiect Cursor

1. Copiaza folderul `PULS_PRESENTATION_CONTEXT` in proiectul de prezentare.
2. Deschide `PLAN_PREZENTARE_PULS_JURIU.md`.
3. Foloseste `screenshots/` pentru vizualuri si `docs/` / `source-context/` pentru verificarea mesajelor.
4. Nu copia fisiere `.env`, backup-uri de baza de date sau date sensibile. Acest pachet nu include astfel de fisiere.
