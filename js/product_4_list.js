const DATA = [
  {
    title: 'T-shirt bag machine',
    image: 'img/product_4_list/product_4_list_img1.png',
    items: [
      { text: 'Servo-driven t-shirt bag making machine <br>(without auto punching system)', href: '#s1' },
      { text: 'Fully automatic servo-driven t-shirt bag making machine', href: '#s2' },
      { text: 'Fully automatic servo-driven triple-lane t-shirt bag making machine with hot slit seal & post gusset unit ', href: '#s3' },
    ]
  },
  {
    title: 'Shopping bag machine',
    image: 'img/product_4_list/product_4_list_img1.png',
    items: [
      { text: 'Fully automatic bottom seal soft loop shopping bag making machine', href: '#u1' },
      { text: 'High speed multi-function shopping bag making machine', href: '#u2' },
      { text: 'High speed multi-function shopping bag making machine', href: '#u3' },
      { text: 'Semi-automatic patch handle making machine / semi-automatic soft loop handle making machine', href: '#u4' },
      { text: 'Multi-lane bottom seal bag making machine', href: '#u5' },
    ]
  },
  {
    title: 'Universal bag machine',
    image: 'img/product_4_list/product_4_list_img1.png',
    items: [
      { text: 'Interleaved Draw Tape Bag on Roll Converting System', href: '#h1' },
      { text: 'Shuttle Track Draw Tape Bag on Roll Converting System', href: '#h2' },
      { text: 'Servo-Driven Double-Track Rotary Seal Garbage Bag Making Machine ', href: '#h3' },
      { text: 'Double Track Servo-Driven Garbage Bag on Roll Making Machine with Slit Seal and Post Gusset', href: '#h4' },
      { text: 'High-Speed Rotary Seal Bag on Roll Making Machine', href: '#h5' },
      { text: 'Shuttle Track Two Lane Star Seal Bag on Roll Converting System', href: '#h6' },
      { text: 'Shuttle Track Two Lane T-Shirt Bag & Star Seal Bag on Roll Converting System (Core & Coreless) ', href: '#h7' },
      { text: 'Produce Bag on Roll Making Machine', href: '#h8' },
      { text: 'Fully Automatic High-Performance Table Cover Making Machine', href: '#h9' },
      { text: 'In-Line Shuttle Track Bag Making Machine ', href: '#h10' },
      { text: 'Shuttle Track Two Lane Bag Converting Machine for T-Shirt Bag & Star Seal Bag on Roll (Core & Coreless) ', href: '#h11' },
      { text: 'Oscillating Gusset Inline Embossing System for Heavy Duty Bags', href: '#h12' },
      { text: 'Interleaved Draw Tape Bag on Roll Converting System', href: '#h13' },
    ]
  },
  {
    title: 'Heavy duty bag machine',
    image: 'img/product_4_list/product_4_list_img1.png',
    items: [
      { text: 'Heavy duty bag making machine with Embossing in line system', href: '#b1' },
      { text: 'Double servo-driven heavy-gauge', href: '#b2' },
    ]
  },
  {
    title: 'Universal bag machine',
    image: 'img/product_4_list/product_4_list_img1.png',
    items: [
      { text: 'Bottom seal bag making machine Astp-universal bag making machine ', href: '#a1' },
    ]
  },
];

const arrow2SVG = `
      <img src="img/arrow_orange.png" alt="arrow_orange">`;
// const arrow2SVG = `
//       <svg viewBox="0 0 24 24" width="34" height="24" aria-hidden="true">
//         <path d="M5 12h13M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2"
//               stroke-linecap="round" stroke-linejoin="round"/>
//       </svg>`;

function renderMachineBlocks(data) {
  const host = document.getElementById('machineList');
  host.innerHTML = '';

  data.forEach(group => {
    const section = document.createElement('section');
    section.className = 'machine-block';
    section.innerHTML = `
          <div class="container grid-2">
            <figure class="media">
              <img src="${group.image}" alt="${group.title}" loading="lazy">
            </figure>
            <div>
              <h2 class="heading">${group.title}</h2>
              <ul class="list" role="list">
                ${group.items.map(item => `
                  <li class="item">
                    <a class="link" href="${item.href || '#'}">
                      <span class="text">
                        ${item.text}
                        ${item.sub ? `<small>${item.sub}</small>` : ''}
                      </span>
                      <span class="arrow2">${arrow2SVG}</span>
                    </a>
                  </li>`).join('')}
              </ul>
            </div>
          </div>
        `;
    host.appendChild(section);
  });

  // 讓整個 li 可點（提升點擊區域）
  host.querySelectorAll('.item').forEach(li => {
    li.addEventListener('click', e => {
      const a = li.querySelector('a.link');
      if (a && e.target.tagName !== 'A') { a.click(); }
    });
  });
}

renderMachineBlocks(DATA);

// 需要動態新增一組時（例）：
// DATA.push({ title:'New group', image:'new.jpg', items:[{text:'Example', href:'#'}] });
// renderMachineBlocks(DATA);


// 表單
const PDF_URL = 'bag-making.pdf'; // 下載的 PDF 路徑（請換成你的）

const form = document.getElementById('reqForm');
const btn = document.getElementById('btnDownload');
const agree = document.getElementById('agree');
const agreeError = document.getElementById('agreeError');

// 隱私勾選後才開放下載
function toggleButton() {
  btn.disabled = !agree.checked;
  agreeError.hidden = agree.checked;
}
agree.addEventListener('change', toggleButton);
toggleButton();

// 欄位驗證 helper
function setFieldValidity(input, valid, message) {
  const field = input.closest('.field');
  const msg = field.querySelector('.error-msg');
  if (valid) {
    field.classList.remove('error');
    msg && (msg.hidden = true);
  } else {
    field.classList.add('error');
    if (msg) { msg.textContent = message || msg.textContent; msg.hidden = false; }
  }
}

function validate() {
  let ok = true;

  // 基本必填
  ['firstName', 'lastName', 'email', 'tel', 'company', 'country'].forEach(id => {
    const el = document.getElementById(id);
    const val = el.value.trim();
    const requiredMessage = (el.labels?.[0]?.innerText || 'This field') + ' is required.';
    if (!val) { ok = false; setFieldValidity(el, false, requiredMessage); }
    else setFieldValidity(el, true);
  });

  // email 格式
  const email = document.getElementById('email');
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    ok = false; setFieldValidity(email, false, 'Please enter a valid email.');
  }

  // agree
  if (!agree.checked) { ok = false; agreeError.hidden = false; }

  return ok;
}

// 表單提交 → 驗證通過就觸發下載
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;

  // 你若要把資料送到後端，可在這裡 fetch() 再成功後下載
  // fetch('/api/submit', { method:'POST', body:new FormData(form) }).then(...)

  // 直接下載 PDF
  const a = document.createElement('a');
  a.href = PDF_URL;
  a.download = ''; // 讓瀏覽器下載（或視設定開啟）
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// blur 時即時驗證
form.querySelectorAll('input,select').forEach(el => {
  el.addEventListener('blur', () => {
    if (el.required) {
      setFieldValidity(el, !!el.value.trim());
    }
  });
});