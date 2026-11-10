(function () {
  var buttons = document.querySelectorAll("[data-copy]");

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(area);
      }
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy") || "";
      copyText(value).then(function () {
        var original = button.textContent;
        button.textContent = "Tersalin";
        button.setAttribute("data-copied", "true");
        window.setTimeout(function () {
          button.textContent = original;
          button.removeAttribute("data-copied");
        }, 1600);
      }).catch(function () {
        button.textContent = "Gagal menyalin";
      });
    });
  });
})();
