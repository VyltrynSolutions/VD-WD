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
// Mobile-friendly logo animation adjustments

const logoTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#main-content",
    start: "top 90%",
    end: "top 10%",
    scrub: true,
    ease: "power1.inOut",
    invalidateOnRefresh: true // 👈 recalc positions on refresh
  }
});

// Logo animation based on screen size
if (window.innerWidth <= 768) {
  // Mobile animation
  logoTimeline.to("#hero-logo-wrap", {
    yPercent: -110, // move logo further up (increase this for more movement)
    scale: 0.55,     // adjust this to make it larger/smaller on mobile
    duration: 1
  }, 0);
} else {
  // Desktop animation
  logoTimeline.to("#hero-logo-wrap", {
    yPercent: -79,
    scale: 0.18,
    duration: 1
  }, 0);
}

logoTimeline.to("#topbar", {
  backgroundColor: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
}, 0);

/* -------------------------------------------
   FIX: Mobile Browser Address Bar Resize Handling
------------------------------------------- */
let resizeTimeout;

function refreshScroll() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh(true); // force remeasure
  }, 300);
}

// Listen to both resize and orientation changes
window.addEventListener("resize", refreshScroll);
window.addEventListener("orientationchange", refreshScroll);

// Handle mobile browser UI shrinking/expanding (URL bar hiding)
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", refreshScroll);
}

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
  scale: 1,
  autoAlpha: 1,
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

// Final safety refresh after page load
window.addEventListener("load", () => {
  setTimeout(() => ScrollTrigger.refresh(true), 500);
});

// --- Mobile viewport fix ---
if (window.visualViewport) {
  let lastHeight = window.visualViewport.height;
  window.visualViewport.addEventListener('resize', () => {
    if (Math.abs(window.visualViewport.height - lastHeight) > 100) {
      ScrollTrigger.refresh();
      lastHeight = window.visualViewport.height;
    }
  });
}

/* ------------------------------------------------------
   6. PERFORMANCE / GPU HINTS
------------------------------------------------------ */
// Optional: add this to your CSS for smoother GPU rendering
// .services, .intro, .outro, #topbar { will-change: transform, opacity, backdrop-filter; }
