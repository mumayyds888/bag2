// js/fetch-data.js

export async function loadSliderData(sliderSelector, dataList) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;

  slider.innerHTML = ''; // 清空原有 slide

  dataList.forEach(item => {
    const div = document.createElement('div');
    div.className = 'app-slide';
    div.innerHTML = `<img src="${item.src}" alt="${item.label}"><p>${item.label}</p>`;
    slider.appendChild(div);
  });
}
