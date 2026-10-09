/* HASS — shared interactions */
(function () {
  "use strict";

  /* ---------- Shared header & footer ---------- */
  var page = document.body.getAttribute("data-page") || "home";
  var links = [
    ["home", "index.html", "Home"],
    ["about", "about.html", "About"],
    ["app", "app.html", "App"],
    ["faq", "faq.html", "FAQ"],
    ["contact", "contact.html", "Contact"],
    ["shop", "shop.html", "Shop"],
    ["docs", "documentation.html", "Documentation"]
  ];
  var userIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>';

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="container">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-logo"><img class="img" src="HASS-project-LOGO.png" alt="HASS logo"></span>' +
          '<span class="brand-name">HASS<small>Smart Home IoT</small></span>' +
        '</a>' +
        '<nav class="nav" id="nav">' +
          links.map(function (l) {
            return '<a href="' + l[1] + '"' + (l[0] === page ? ' class="active"' : "") + ">" + l[2] + "</a>";
          }).join("") +
        "</nav>" +
        '<div class="header-actions">' +
          '<span class="net-status"><span class="dot dot--green"></span>Local Network: Connected</span>' +
          '<a class="btn btn--accent btn--pill" href="shop.html">Shop HASS</a>' +
          '<button class="avatar-btn" aria-label="Account">' + userIcon + "</button>" +
        "</div>" +
        '<button class="menu-toggle" id="menu-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>' +
      "</div>";
    document.getElementById("menu-toggle").addEventListener("click", function () {
      document.getElementById("nav").classList.toggle("open");
    });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-about"><h4>HASS Core</h4>' +
            "<p>Precision-engineered physical computing. ESP32-based, local-first automation with Wi-Fi telemetry, Firebase sync and a companion mobile app.</p>" +
            '<span class="status-line"><span class="dot dot--green"></span>Operational: Mesh Node Alpha 01</span></div>' +
          '<div><h4>System</h4><ul><li><a href="shop.html">Controller</a></li><li><a href="shop.html">Relays &amp; Actuators</a></li><li><a href="index.html">Sensors &amp; Environmental</a></li><li><a href="app.html">HASS OS App</a></li></ul></div>' +
          '<div><h4>Resources</h4><ul><li><a href="documentation.html">Documentation</a></li><li><a href="documentation.html">Firmware Binaries</a></li><li><a href="documentation.html">REST &amp; WebSocket API</a></li><li><a href="documentation.html">Hardware Schematics</a></li></ul></div>' +
          '<div><h4>Company &amp; Legal</h4><ul><li><a href="about.html">About HASS</a></li><li><a href="about.html">Local-First Guarantee</a></li><li><a href="faq.html">Open Standards &amp; Privacy</a></li><li><a href="contact.html">Contact Engineering</a></li></ul></div>' +
        "</div>" +
        '<div class="footer-bottom"><span>© 2026 HASS Home Automation Smart System. All physical rights reserved.</span>' +
          '<span class="links"><a href="faq.html">Privacy Spec</a><a href="documentation.html">Zero-Cloud Protocol</a><a href="documentation.html">Compliance EN 50491</a></span></div>' +
      "</div>";
  }

  /* ---------- Contact: tabs ---------- */
  document.querySelectorAll(".tabs").forEach(function (group) {
    group.addEventListener("click", function (e) {
      var t = e.target.closest(".tab");
      if (!t) return;
      group.querySelectorAll(".tab").forEach(function (b) { b.classList.remove("active"); });
      t.classList.add("active");
    });
  });

  /* ---------- Contact: dropzone ---------- */
  var dz = document.querySelector(".dropzone");
  if (dz) {
    var input = dz.querySelector("input[type=file]");
    var label = dz.querySelector(".dz-label");
    var setName = function (files) { if (files && files[0]) label.textContent = files[0].name; };
    dz.addEventListener("click", function () { input.click(); });
    input.addEventListener("change", function () { setName(input.files); });
    ["dragenter", "dragover"].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.add("drag"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.remove("drag"); });
    });
    dz.addEventListener("drop", function (e) { setName(e.dataTransfer.files); });
  }

  /* ---------- Forms ---------- */
  document.querySelectorAll("form[data-hass-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var btn = form.querySelector("[type=submit]");
      var old = btn.innerHTML;
      btn.innerHTML = "Sent ✓";
      form.reset();
      setTimeout(function () { btn.innerHTML = old; }, 2500);
    });
  });

  /* ---------- Copy buttons ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = document.querySelector(btn.getAttribute("data-copy"));
      if (!src || !navigator.clipboard) return;
      navigator.clipboard.writeText(src.innerText).then(function () {
        var old = btn.innerHTML; btn.innerHTML = "Copied";
        setTimeout(function () { btn.innerHTML = old; }, 1500);
      });
    });
  });

  /* ---------- Docs: code tabs & chapters ---------- */
  document.querySelectorAll(".code-tabs").forEach(function (bar) {
    bar.addEventListener("click", function (e) {
      var t = e.target.closest(".code-tab"); if (!t) return;
      bar.querySelectorAll(".code-tab").forEach(function (b) { b.classList.remove("active"); });
      t.classList.add("active");
      var block = bar.parentElement;
      block.querySelectorAll("pre").forEach(function (p) { p.hidden = p.id !== t.getAttribute("data-target"); });
    });
  });
  document.querySelectorAll(".chapter").forEach(function (ch) {
    ch.addEventListener("click", function () {
      var subs = ch.nextElementSibling;
      if (subs && subs.classList.contains("subs")) subs.classList.toggle("show");
    });
  });
  var filter = document.querySelector(".docs-side .search");
  if (filter) {
    filter.addEventListener("input", function () {
      var q = filter.value.toLowerCase();
      document.querySelectorAll(".chapter").forEach(function (ch) {
        ch.style.display = ch.textContent.toLowerCase().indexOf(q) > -1 ? "" : "none";
      });
    });
  }
  /* Docs: highlight "on this page" while scrolling */
  var toc = document.querySelectorAll(".docs-toc a");
  if (toc.length && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          toc.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    toc.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) obs.observe(s); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () { q.parentElement.classList.toggle("open"); });
  });

  /* ---------- Shop: live total ---------- */
  var addBtn = document.getElementById("add-to-order");
  if (addBtn) {
    var base = 349;
    var update = function () {
      var total = base;
      document.querySelectorAll(".addon:checked").forEach(function (c) { total += Number(c.value); });
      addBtn.querySelector(".total").textContent = "[$" + total + " USD]";
    };
    document.querySelectorAll(".addon").forEach(function (c) { c.addEventListener("change", update); });
    addBtn.addEventListener("click", function () { addBtn.firstChild.textContent = "Added to Order "; });
  }
})();