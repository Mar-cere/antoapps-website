/** Capas decorativas: grilla + glow hero (ruido vía CSS ::before en .home-landing-page). */
export default function HomeLandingAtmosphere() {
  return (
    <div className="home-landing-atmosphere" aria-hidden="true">
      <div className="home-landing-atmosphere__grid" />
      <div className="home-landing-atmosphere__grid-fade" />
      <div className="home-landing-atmosphere__hero-glow" />
    </div>
  );
}
