import { PRESENTATION_ASSETS } from "../../assets";
import {
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
  smoothProgress,
} from "../../components/SlideChrome";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";
import "./IcsiElectromagnetismSlide.scss";

const LAYOUT = {
  left: 120,
  gap: 24,
  headlineTop: 72,
  subtitleTop: 228,
  screenshotsY: 292,
  screenshotHeight: 268,
  supraWidth: 400,
  fuelWidth: 400,
  dedicationGap: 44,
};

const imagesWidth = LAYOUT.supraWidth + LAYOUT.gap + LAYOUT.fuelWidth;
const fuelX = LAYOUT.left + LAYOUT.supraWidth + LAYOUT.gap;
const screenshotsBottom = LAYOUT.screenshotsY + LAYOUT.screenshotHeight;

const DEDICATION = {
  x: LAYOUT.left,
  y: screenshotsBottom + LAYOUT.dedicationGap,
  width: imagesWidth,
};

const CollaborationNote = ({ delay = 30 }: { delay?: number }) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 28);

  return (
    <div
      className="icsi-slide__dedication"
      style={{
        left: DEDICATION.x,
        top: DEDICATION.y,
        width: DEDICATION.width,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 20}px)`,
      }}
    >
      <p className="icsi-slide__dedication-eyebrow">Colaborare stiintifica</p>
      <p className="icsi-slide__dedication-text">
        Continuam povestea de la{" "}
        <span className="icsi-slide__dedication-name">ICSI Rm. Vâlcea</span>{" "}
        (Institutul Național de Cercetare-Dezvoltare pentru Tehnologii
        Criogenice și Izotopice) — succesorul Uzinei G — cu simulari de
        electromagnetism validate de specialisti: supraconductivitate și efectul
        Meissner (criogenie, T {"<"} Tc) si pila PEM cu combustibil,
        in linie cu misiunea{" "}
        <span className="icsi-slide__dedication-name">ICSI Energy</span> privind
        hidrogenul si pilele de combustibil.
      </p>
      <div className="icsi-slide__timeline">
        <span className="icsi-slide__timeline-chip">INC-DTCI · Râmnicu Vâlcea</span>
        <span className="icsi-slide__timeline-chip">Centrul Național H₂</span>
        <span className="icsi-slide__timeline-chip">Criogenie &amp; izotopi</span>
      </div>
    </div>
  );
};

const ExpertisePanel = ({ delay = 38 }: { delay?: number }) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 32);

  return (
    <aside
      className="icsi-slide__expertise"
      style={{
        opacity: reveal,
        transform: `translateX(${(1 - reveal) * 28}px)`,
      }}
    >
      <p className="icsi-slide__expertise-eyebrow">ICSI în cifre</p>
      <ul className="icsi-slide__expertise-list">
        <li>
          <strong>~270</strong> cercetători · unitate de interes național în
          separări izotopice
        </li>
        <li>
          <strong>ICSI Nuclear</strong> — pilot tritiu/deuteriu, sprijin pentru
          energetica nucleară
        </li>
        <li>
          <strong>ICSI Energy</strong> — tehnologii pe hidrogen, pile de
          combustibil, Ro-HydroHub
        </li>
        <li>
          Criogenie, stocare energie și analitică — legătura naturală cu
          simularile PULS
        </li>
      </ul>
      <p className="icsi-slide__expertise-source">
        Sursă:{" "}
        <a href="https://www.icsi.ro/" target="_blank" rel="noreferrer">
          icsi.ro
        </a>
      </p>
    </aside>
  );
};

export const IcsiElectromagnetismSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("icsi");

  return (
    <SlideLayout duration={duration} intensity={1}>
      <div className="icsi-slide">
        <SlideHeadline
          lines={["ICSI Vâlcea,", "electromagnetism la temperaturi extreme."]}
          accentIndex={1}
          size={64}
          top={LAYOUT.headlineTop}
          left={LAYOUT.left}
          width={920}
        />
        <SlideSubtitle
          top={LAYOUT.subtitleTop}
          delay={18}
          left={LAYOUT.left}
          width={760}
        >
          Supraconductivitate, efectul Meissner și pila cu combustibil — două
          simulari interactive care leagă fizica din liceu de cercetarea românească
          în criogenie și hidrogen.
        </SlideSubtitle>

        <ScreenshotFrame
          src={PRESENTATION_ASSETS.supraconductivitate}
          x={LAYOUT.left}
          y={LAYOUT.screenshotsY}
          width={LAYOUT.supraWidth}
          height={LAYOUT.screenshotHeight}
          delay={36}
          caption="Supraconductivitate · Meissner"
          captionDelay={48}
          objectFit="cover"
          objectPosition="center 6%"
          screenshotClassName="icsi-slide__screenshot icsi-slide__screenshot--supra"
        />
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.pilaCombustibil}
          x={fuelX}
          y={LAYOUT.screenshotsY}
          width={LAYOUT.fuelWidth}
          height={LAYOUT.screenshotHeight}
          delay={44}
          caption="Pilă PEM · H₂ + O₂"
          captionDelay={56}
          lightOverlay
          objectFit="cover"
          objectPosition="center 4%"
          screenshotClassName="icsi-slide__screenshot icsi-slide__screenshot--fuel"
        />

        <CollaborationNote delay={52} />
        <ExpertisePanel delay={40} />
        <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={86} />
      </div>
    </SlideLayout>
  );
};
