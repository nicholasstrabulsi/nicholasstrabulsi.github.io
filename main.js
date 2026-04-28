// ── Scroll reveal ────────────────────────────────
var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            e.target.style.transition = e.target.style.transition || "opacity 0.65s ease, transform 0.65s ease";
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(".fade-up").forEach(function(el, i) {
    el.style.transition = "opacity 0.65s " + (i * 0.06) + "s ease, transform 0.65s " + (i * 0.06) + "s ease";
    revealObs.observe(el);
});

// ── Lightbox ─────────────────────────────────────
var lbImages  = [];
var lbCurrent = 0;

window.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".shot-hero[onclick], .shot-card[onclick]").forEach(function(el) {
        var img   = el.querySelector("img");
        var label = el.querySelector(".shot-label-text");
        if (img) lbImages.push({ src: img.src, label: label ? label.textContent : "" });
    });
});

function openLightbox(el) {
    var img = el.querySelector("img");
    if (!img) return;
    lbCurrent = lbImages.findIndex(function(item) { return item.src === img.src; });
    if (lbCurrent === -1) lbCurrent = 0;
    renderLb();
    document.getElementById("lightbox").classList.add("open");
    document.body.style.overflow = "hidden";
}

function renderLb() {
    var item = lbImages[lbCurrent];
    if (!item) return;
    document.getElementById("lb-img").src = item.src;
    document.getElementById("lb-img").alt = item.label;
    document.getElementById("lb-caption").textContent = item.label;
    document.getElementById("lb-counter").textContent = (lbCurrent + 1) + " / " + lbImages.length;
}

function closeLb() {
    document.getElementById("lightbox").classList.remove("open");
    document.body.style.overflow = "";
}

function closeLightbox(e) {
    if (e.target === document.getElementById("lightbox")) closeLb();
}

function navLb(dir) {
    lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
    renderLb();
}

document.addEventListener("keydown", function(e) {
    var lb = document.getElementById("lightbox");
    if (!lb || !lb.classList.contains("open")) return;
    if (e.key === "Escape")     closeLb();
    if (e.key === "ArrowRight") navLb(1);
    if (e.key === "ArrowLeft")  navLb(-1);
});
