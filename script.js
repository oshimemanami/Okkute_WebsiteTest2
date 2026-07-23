/* =============================
   価格表モーダル開閉
============================= */
function openKakakuModal() {
  const overlay = document.getElementById('kakakuOverlay');
  const sheet   = document.getElementById('kakakuSheet');
  if (!overlay || !sheet) return;

  sheet.querySelectorAll('img[data-src]').forEach(img => {
    if (!img.src || img.src === window.location.href) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });

  overlay.style.display = 'block';
  document.body.classList.add('kakaku-open');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('is-active');
      sheet.classList.add('is-active');
    });
  });
}

function closeKakakuModal() {
  const overlay = document.getElementById('kakakuOverlay');
  const sheet   = document.getElementById('kakakuSheet');
  if (!overlay || !sheet) return;
  overlay.classList.remove('is-active');
  sheet.classList.remove('is-active');
  document.body.classList.remove('kakaku-open');
  setTimeout(() => { overlay.style.display = 'none'; }, 400);
}

function initKakakuModal() {
  const overlay  = document.getElementById('kakakuOverlay');
  const closeBtn = document.getElementById('kakakuClose');

  // モーダル内リンク：閉じてから移動
  document.querySelectorAll('.kakaku-area').forEach(area => {
    area.addEventListener('click', (e) => {
      e.preventDefault();
      const href = area.getAttribute('href');
      closeKakakuModal();
      setTimeout(() => { window.open(href, '_blank'); }, 400);
    });
  });

  ['btnKakaku04b', 'btnKakakuMid', 'btnKakaku14b', 'btnKakakuLP2', 'btnKakakuLP2b'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      openKakakuModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeKakakuModal);
  if (overlay)  overlay.addEventListener('click', closeKakakuModal);
}

/* =============================
   FAQ アコーディオン（meta_13a/b）
============================= */
function initFaqAccordion() {
  document.querySelectorAll('.faq-accordion').forEach(accordion => {
    const question = accordion.querySelector('.faq-question');
    const answer   = accordion.querySelector('.faq-answer');
    const arrow    = accordion.querySelector('.faq-arrow-img');
    const qImg     = accordion.querySelector('.faq-q-img');
    if (!question || !answer) return;

    let isOpen = false;
    answer.style.display = 'none';

    question.addEventListener('click', () => {
      isOpen = !isOpen;
      answer.style.display = isOpen ? 'block' : 'none';
      if (arrow) arrow.classList.toggle('is-open', isOpen);
      if (qImg) {
        qImg.classList.toggle('sp-10', isOpen);
        qImg.classList.toggle('sp-40', !isOpen);
      }
    });
  });
}

/* =============================
   固定フッター スクロールリンク
============================= */
function initFooterNav() {
  const footerImg = document.getElementById('footerImg');
  if (!footerImg) return;

  function setupMap() {
    const w = footerImg.offsetWidth;
    const h = footerImg.offsetHeight;
    const q = Math.floor(w / 4);

    document.getElementById('areaCorner').coords  = `${q * 0},0,${q * 1},${h}`;
    document.getElementById('areaFinish').coords  = `${q * 1},0,${q * 2},${h}`;
    document.getElementById('areaCase').coords    = `${q * 2},0,${q * 3},${h}`;
    document.getElementById('areaContact').coords = `${q * 3},0,${q * 4},${h}`;
  }

  if (footerImg.complete) setupMap();
  else footerImg.addEventListener('load', setupMap);
  window.addEventListener('resize', setupMap);

  // モーダルを閉じてからスクロール
  function closeAndScroll(targetId) {
    const isModalOpen = document.getElementById('kakakuSheet') &&
      document.getElementById('kakakuSheet').classList.contains('is-active');
    if (isModalOpen) {
      closeKakakuModal();
      setTimeout(() => {
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    } else {
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.querySelectorAll('map area[href^="#"]').forEach(area => {
    area.addEventListener('click', (e) => {
      e.preventDefault();
      closeAndScroll(area.getAttribute('href'));
    });
  });

  footerImg.addEventListener('click', (e) => {
    const rect = footerImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = footerImg.offsetWidth;
    const q = w / 4;
    let targetId;
    if      (x < q)     targetId = '#section-meta06';
    else if (x < q * 2) targetId = '#section-meta08';
    else if (x < q * 3) targetId = '#section-meta09';
    else                targetId = null;
    if (targetId) {
      e.preventDefault();
      closeAndScroll(targetId);
    }
  });
}

/* =============================
   DOM読み込み後に初期化
============================= */
document.addEventListener('DOMContentLoaded', () => {
  initKakakuModal();
  initFaqAccordion();
  initFooterNav();
});
