(() => {
  "use strict";

  function initLumiereMotion() {
    if (!window.gsap || !window.ScrollTrigger) {
      document.documentElement.dataset.motionReady = "false";
      console.error("Lumière motion: GSAP or ScrollTrigger did not load.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const travel = reducedMotion ? 0 : 48;
    const revealDuration = reducedMotion ? 0.2 : 0.9;
    const triggerElements = [
      document.querySelector(".hero"),
      document.querySelector(".marquee"),
      document.querySelector(".services-list"),
      document.querySelector(".comparison"),
      document.querySelector(".reviews-track"),
      document.querySelector("#booking")
    ].filter(Boolean);

    const invalidTrigger = triggerElements.find((element) => element.getBoundingClientRect().height < 1);
    if (invalidTrigger) {
      console.warn("Lumière motion: a ScrollTrigger target has no height.", invalidTrigger);
    }

    document.documentElement.dataset.motionReady = "true";

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".brand-mark", { y: reducedMotion ? 0 : -18, opacity: 0, duration: reducedMotion ? 0.2 : 0.7 })
      .from(".hero-kicker", { y: reducedMotion ? 0 : 18, opacity: 0, duration: reducedMotion ? 0.2 : 0.6 }, "-=.2")
      .from(".hero-line", { yPercent: reducedMotion ? 0 : 110, opacity: 0, rotate: reducedMotion ? 0 : 2, stagger: 0.12, duration: reducedMotion ? 0.25 : 1.05 }, "-=.15")
      .from(".hero-sub, .hero-actions", { y: reducedMotion ? 0 : 22, opacity: 0, stagger: 0.1, duration: reducedMotion ? 0.2 : 0.7 }, "-=.45")
      .from(".hero-art", { scale: reducedMotion ? 1 : 0.9, opacity: 0, duration: reducedMotion ? 0.25 : 1.1 }, "-=.8")
      .from(".hero-tag", { scale: reducedMotion ? 1 : 0.8, opacity: 0, stagger: 0.12, duration: reducedMotion ? 0.2 : 0.5 }, "-=.35");

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      if (reducedMotion) return;

      gsap.timeline({
        scrollTrigger: {
          id: "hero-desktop",
          trigger: ".hero",
          start: "top top",
          end: "+=130%",
          pin: ".hero-stage",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
        .to(".hero-copy", { xPercent: -10, opacity: 0.24, scale: 0.93, ease: "none" }, 0)
        .to(".hero-lens", { scale: 1.3, rotate: 5, ease: "none" }, 0)
        .to(".hero-orbit:first-of-type", { rotate: 95, scale: 1.15, ease: "none" }, 0)
        .to(".hero-orbit:nth-of-type(2)", { rotate: -70, scale: 0.92, ease: "none" }, 0)
        .to(".tag-a", { x: 70, y: -65, ease: "none" }, 0)
        .to(".tag-b", { x: -55, y: 70, ease: "none" }, 0)
        .to(".smile-art", { yPercent: -7, scale: 1.12, ease: "none" }, 0)
        .to(".scan-dot", { attr: { cx: 410 }, ease: "none" }, 0)
        .to(".scroll-cue", { opacity: 0, y: 15, ease: "none" }, 0)
        .to(".hero-stage", { backgroundColor: "#E9E0D1", ease: "none" }, 0);
    });

    media.add("(max-width: 767px)", () => {
      if (reducedMotion) return;

      gsap.timeline({
        scrollTrigger: {
          id: "hero-mobile",
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
          invalidateOnRefresh: true
        }
      })
        .to(".hero-copy", { y: -45, opacity: 0.42, ease: "none" }, 0)
        .to(".hero-lens", { y: -35, scale: 1.08, ease: "none" }, 0)
        .to(".tag-a", { x: 30, y: -30, ease: "none" }, 0)
        .to(".tag-b", { x: -20, y: 30, ease: "none" }, 0);
    });

    if (!reducedMotion) {
      gsap.to(".marquee", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          id: "treatment-marquee",
          trigger: ".marquee",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    }

    gsap.utils.toArray(".reveal").forEach((element, index) => {
      gsap.from(element, {
        y: travel,
        opacity: 0,
        duration: revealDuration,
        ease: "power3.out",
        scrollTrigger: {
          id: `reveal-${index}`,
          trigger: element,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true
        }
      });
    });

    gsap.from(".service-row", {
      x: reducedMotion ? 0 : 45,
      opacity: 0,
      stagger: reducedMotion ? 0.04 : 0.12,
      duration: reducedMotion ? 0.25 : 0.8,
      ease: "power3.out",
      scrollTrigger: {
        id: "service-rows",
        trigger: ".services-list",
        start: "top 82%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true
      }
    });

    document.querySelectorAll(".service-row").forEach((row) => {
      const arrow = row.querySelector(".service-arrow");
      row.addEventListener("mouseenter", () => {
        gsap.to(row, { backgroundColor: row.dataset.tone, paddingLeft: 16, paddingRight: 16, duration: 0.25 });
        gsap.to(arrow, { rotate: -30, scale: 1.08, duration: 0.25 });
      });
      row.addEventListener("mouseleave", () => {
        gsap.to(row, { backgroundColor: "transparent", paddingLeft: 0, paddingRight: 0, duration: 0.25 });
        gsap.to(arrow, { rotate: 0, scale: 1, duration: 0.25 });
      });
    });

    gsap.timeline({
      scrollTrigger: {
        id: "smile-comparison",
        trigger: ".comparison",
        start: "top 82%",
        end: "bottom 38%",
        scrub: reducedMotion ? false : 1,
        toggleActions: reducedMotion ? "play none none none" : undefined,
        invalidateOnRefresh: true
      }
    })
      .fromTo(".compare-divider", { left: "18%" }, { left: "82%", duration: reducedMotion ? 0.25 : 1, ease: "none" })
      .fromTo(".before-teeth", { opacity: 1 }, { opacity: 0.2, duration: reducedMotion ? 0.25 : 1, ease: "none" }, 0)
      .fromTo(".after-teeth", { opacity: 0 }, { opacity: 1, duration: reducedMotion ? 0.25 : 1, ease: "none" }, 0);

    document.querySelectorAll(".counter").forEach((counter, index) => {
      const target = Number(counter.dataset.value);
      const value = { number: 0 };
      gsap.to(value, {
        number: target,
        duration: reducedMotion ? 0.25 : 1.6,
        ease: "power2.out",
        scrollTrigger: {
          id: `counter-${index}`,
          trigger: counter,
          start: "top 90%",
          once: true,
          invalidateOnRefresh: true
        },
        onUpdate: () => {
          counter.textContent = target % 1
            ? value.number.toFixed(1)
            : Math.round(value.number).toLocaleString();
        }
      });
    });

    gsap.from(".review-card", {
      x: reducedMotion ? 0 : 90,
      opacity: 0,
      rotate: reducedMotion ? 0 : 1.5,
      stagger: reducedMotion ? 0.04 : 0.14,
      duration: reducedMotion ? 0.25 : 0.9,
      ease: "power3.out",
      scrollTrigger: {
        id: "review-cards",
        trigger: ".reviews-track",
        start: "top 85%",
        once: true,
        invalidateOnRefresh: true
      }
    });

    if (!reducedMotion) {
      gsap.to(".booking-ring", {
        scale: 1.18,
        rotate: 24,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          id: "booking-rings",
          trigger: "#booking",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    document.querySelectorAll(".wa-magnetic").forEach((button) => {
      if (reducedMotion) return;
      button.addEventListener("mouseenter", () => gsap.to(button, { scale: 1.035, duration: 0.2 }));
      button.addEventListener("mouseleave", () => gsap.to(button, { x: 0, y: 0, scale: 1, duration: 0.3 }));
      button.addEventListener("mousemove", (event) => {
        const bounds = button.getBoundingClientRect();
        gsap.to(button, {
          x: (event.clientX - bounds.left - bounds.width / 2) * 0.08,
          y: (event.clientY - bounds.top - bounds.height / 2) * 0.12,
          duration: 0.25
        });
      });
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      document.documentElement.dataset.scrollTriggerCount = String(ScrollTrigger.getAll().length);
    });

    window.addEventListener("load", () => ScrollTrigger.refresh(true), { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLumiereMotion, { once: true });
  } else {
    initLumiereMotion();
  }
})();
