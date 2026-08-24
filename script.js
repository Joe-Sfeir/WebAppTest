(() => {
  "use strict";

  function initComparison() {
    const comparison = document.querySelector(".comparison");
    const compareRange = document.querySelector(".compare-range");
    if (!comparison || !compareRange) return;

    const updateComparison = () => {
      const value = Number(compareRange.value);
      comparison.style.setProperty("--compare", `${value}%`);
      compareRange.setAttribute("aria-valuetext", `${value} percent of the planned illustrative study visible`);
    };

    compareRange.addEventListener("input", updateComparison);
    compareRange.addEventListener("change", updateComparison);
    updateComparison();
  }

  function initProofRibbon(reducedMotion) {
    const rail = document.querySelector(".proof-rail");
    const viewport = rail?.querySelector(".proof-viewport");
    const cards = [...(rail?.querySelectorAll(".review-card") ?? [])];
    const previous = document.querySelector(".proof-prev");
    const next = document.querySelector(".proof-next");
    const toggle = document.querySelector(".proof-toggle");
    const status = rail?.querySelector(".proof-status");
    if (!rail || !viewport || !cards.length || !previous || !next || !toggle || !status) return;

    let activeIndex = 0;
    let userPaused = reducedMotion;
    let interactionPaused = false;
    let timer;
    let scrollFrame;

    const updateToggle = () => {
      toggle.textContent = userPaused ? "Play" : "Pause";
      toggle.setAttribute("aria-label", `${userPaused ? "Play" : "Pause"} proof ribbon`);
      toggle.setAttribute("aria-pressed", String(userPaused));
    };

    const updateStatus = (announce = true) => {
      status.textContent = `Card ${activeIndex + 1} of ${cards.length}`;
      status.setAttribute("aria-live", announce ? "polite" : "off");
    };

    const scrollToCard = (index, announce = true) => {
      activeIndex = (index + cards.length) % cards.length;
      viewport.scrollTo({
        left: cards[activeIndex].offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth"
      });
      updateStatus(announce);
    };

    const schedule = () => {
      window.clearInterval(timer);
      if (userPaused || interactionPaused) return;
      timer = window.setInterval(() => scrollToCard(activeIndex + 1, false), 4200);
    };

    const setInteractionPaused = (paused) => {
      interactionPaused = paused;
      schedule();
    };

    previous.addEventListener("click", () => {
      scrollToCard(activeIndex - 1);
      schedule();
    });
    next.addEventListener("click", () => {
      scrollToCard(activeIndex + 1);
      schedule();
    });
    toggle.addEventListener("click", () => {
      userPaused = !userPaused;
      updateToggle();
      schedule();
    });
    viewport.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      scrollToCard(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
      schedule();
    });
    viewport.addEventListener("scroll", () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const nearest = cards.reduce((best, card, index) =>
          Math.abs(card.offsetLeft - viewport.scrollLeft) < Math.abs(cards[best].offsetLeft - viewport.scrollLeft)
            ? index
            : best, 0);
        if (nearest !== activeIndex) {
          activeIndex = nearest;
          updateStatus(false);
        }
      });
    }, { passive: true });
    rail.addEventListener("mouseenter", () => setInteractionPaused(true));
    rail.addEventListener("mouseleave", () => setInteractionPaused(false));
    rail.addEventListener("focusin", () => setInteractionPaused(true));
    rail.addEventListener("focusout", () => setInteractionPaused(false));
    rail.addEventListener("pointerdown", () => setInteractionPaused(true));
    rail.addEventListener("pointerup", () => setInteractionPaused(false));

    updateToggle();
    updateStatus(false);
    schedule();
  }

  function initLumiereMotion() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    initComparison();
    initProofRibbon(reducedMotion);

    if (!window.gsap || !window.ScrollTrigger) {
      document.documentElement.dataset.motionReady = "false";
      console.error("Lumière motion: GSAP or ScrollTrigger did not load.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

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
      .from(".hero-line", { yPercent: reducedMotion ? 0 : 70, opacity: 0, rotate: reducedMotion ? 0 : 1, stagger: 0.12, duration: reducedMotion ? 0.25 : 1.05 }, "-=.15")
      .from(".hero-sub, .hero-actions", { y: reducedMotion ? 0 : 22, opacity: 0, stagger: 0.1, duration: reducedMotion ? 0.2 : 0.7 }, "-=.45")
      .from(".hero-art", { scale: reducedMotion ? 1 : 0.96, opacity: 0, duration: reducedMotion ? 0.25 : 1.1 }, "-=.8")
      .from(".hero-tag", { scale: reducedMotion ? 1 : 0.8, opacity: 0, stagger: 0.12, duration: reducedMotion ? 0.2 : 0.5 }, "-=.35");

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      if (reducedMotion) return;

      gsap.to(".hero-media img", {
        yPercent: 7,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          id: "hero-desktop",
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });

    media.add("(max-width: 767px)", () => {
      if (reducedMotion) return;

      gsap.to(".hero-media img", {
        yPercent: 5,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          id: "hero-mobile",
          trigger: ".hero-art",
          start: "top bottom",
          end: "bottom top",
          scrub: .7,
          invalidateOnRefresh: true
        }
      });
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
