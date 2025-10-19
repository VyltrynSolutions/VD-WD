/* ======================================================
   VD-WD SCRIPT.JS — OPTIMIZED VERSION
   ------------------------------------------------------
   PURPOSE:
   Controls all scroll-based animations for the Vyltryn Demo
   using GSAP + ScrollTrigger.

   IMPROVEMENTS:
   - Smoother scroll-linked motion via scrub smoothing.
   - Transform origins set to prevent layout jumps.
   - Replaced opacity with autoAlpha for GPU efficiency.
   - Optional scroll markers toggle for debugging.
   - No forced scroll reset; uses manual restoration.
   ====================================================== */

gsap.registerPlugin(ScrollTrigger);


/* ------------------------------------------------------
   1. GLOBAL CONFIGURATION
------------------------------------------------------ */
gsap.defaults({
  ease: "power2.out",
  duration: 1.2
});

ScrollTrigger.defaults({
  markers: false, // set to true for debugging
  scrub: 0.6      // smoother linkage to scroll position
});

// Set transform origins for consistent motion
gsap.set("#hero-logo-wrap, .service-card", { transformOrigin: "center center" });

// Prevent browser scroll position restore (no jarring jumps)
window.history.scrollRestoration = "manual";


/* ------------------------------------------------------
   2. PHASE 1 — LOGO MOVEMENT + HEADER FADE
------------------------------------------------------ */
const logoTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#main-content",
    start: "top 90%",
    end: "top 10%",
    scrub: true,
    ease: "power1.inOut"
  }
});

logoTimeline.to("#hero-logo-wrap", {
  yPercent: -79,
  scale: 0.18
}, 0);

logoTimeline.to("#topbar", {
  backgroundColor: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
}, 0);


/* ------------------------------------------------------
   3. PHASE 2 — INTRO TEXT APPEARANCE & EXIT
------------------------------------------------------ */
const introTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro",
    start: "top 80%",
    end: "bottom 40%",
    scrub: true
  }
});

introTimeline.to(".intro h1", { autoAlpha: 1, y: 0 }, 0);
introTimeline.to(".intro .mission", { autoAlpha: 1, y: 0 }, 0.2);
introTimeline.to(".intro", {
  scale: 1.1,
  autoAlpha: 0,
  duration: 1.2
}, 0.8);


/* ------------------------------------------------------
   4. PHASE 3 — SERVICE CARDS ENTRANCE & FADE OUT
------------------------------------------------------ */
const serviceTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".services",
    start: "top 70%",
    end: "bottom 60%",
    scrub: true
  }
});

serviceTimeline.to(".service-card", {
  autoAlpha: 1,
  scale: 1,
  stagger: {
    amount: 3,
    from: "start",
    each: 1
  }
}, 0);



/* ------------------------------------------------------
   5. PHASE 4 — OUTRO SCROLL-UP REVEAL
------------------------------------------------------ */
gsap.to(".outro", {
  scrollTrigger: {
    trigger: ".outro",
    start: "top 80%",
    end: "bottom 60%",
    scrub: true
  },
  autoAlpha: 1,
  y: 0,
  ease: "power2.out"
});


/* ------------------------------------------------------
   6. PERFORMANCE / GPU HINTS
------------------------------------------------------ */
// Optional: add this to your CSS for smoother GPU rendering
// .services, .intro, .outro, #topbar { will-change: transform, opacity, backdrop-filter; }
