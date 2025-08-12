// export function initAppSlider(wrapper) {
//     const slider = wrapper.querySelector('.app-slider');
//     const prevBtn = wrapper.querySelector('.arrow.prev');
//     const nextBtn = wrapper.querySelector('.arrow.next');

//     if (!slider || !prevBtn || !nextBtn) return;

//     function getVisibleCount() {
//         const width = window.innerWidth;
//         if (width >= 1024) return 5;
//         if (width >= 768) return 3;
//         return 1;
//     }

//     let visibleCount = getVisibleCount();
//     let currentIndex = visibleCount;

//     function setupSlider() {
//         // 清除舊的 clone
//         slider.querySelectorAll('.clone').forEach(el => el.remove());

//         // 找出原始 slide
//         let slides = [...slider.querySelectorAll('.app-slide')].filter(slide => !slide.classList.contains('clone'));

//         const slideWidthPercent = 100 / visibleCount;

//         // 設定原始 slide 寬度
//         slides.forEach(slide => {
//             slide.style.flex = `0 0 ${slideWidthPercent}%`;
//             slide.style.maxWidth = `${slideWidthPercent}%`;
//             slide.style.boxSizing = 'border-box';
//         });

//         const cloneCount = visibleCount;

//         // 前面加 clone（複製尾端）
//         for (let i = slides.length - cloneCount; i < slides.length; i++) {
//             const clone = slides[i].cloneNode(true);
//             clone.classList.add('clone');
//             clone.style.flex = `0 0 ${slideWidthPercent}%`;
//             clone.style.maxWidth = `${slideWidthPercent}%`;
//             clone.style.boxSizing = 'border-box';
//             slider.insertBefore(clone, slider.firstChild);
//         }

//         // 後面加 clone（複製開頭）
//         for (let i = 0; i < cloneCount; i++) {
//             const clone = slides[i].cloneNode(true);
//             clone.classList.add('clone');
//             clone.style.flex = `0 0 ${slideWidthPercent}%`;
//             clone.style.maxWidth = `${slideWidthPercent}%`;
//             clone.style.boxSizing = 'border-box';
//             slider.appendChild(clone);
//         }

//         const allSlides = [...slider.querySelectorAll('.app-slide')];

//         // ⭐ 使用 getBoundingClientRect() 取得準確寬度（包含 gap 影響）
//         const slideWidth = allSlides[0].getBoundingClientRect().width;

//         // 初始定位
//         currentIndex = cloneCount;
//         slider.scrollLeft = currentIndex * slideWidth;

//         let isTransitioning = false;

//         function scrollToIndex(index) {
//             if (isTransitioning) return;
//             isTransitioning = true;

//             currentIndex = index;
//             slider.scrollTo({ left: slideWidth * currentIndex, behavior: 'smooth' });

//             setTimeout(() => {
//                 const maxIndex = allSlides.length - cloneCount;
//                 const minIndex = cloneCount;

//                 if (currentIndex >= maxIndex) {
//                     slider.scrollLeft = minIndex * slideWidth;
//                     currentIndex = minIndex;
//                 } else if (currentIndex < minIndex) {
//                     const lastIndex = allSlides.length - cloneCount * 2;
//                     slider.scrollLeft = lastIndex * slideWidth;
//                     currentIndex = lastIndex;
//                 }

//                 isTransitioning = false;
//             }, 400);
//         }

//         // 按鈕控制
//         prevBtn.onclick = () => scrollToIndex(currentIndex - 1);
//         nextBtn.onclick = () => scrollToIndex(currentIndex + 1);
//     }

//     // 初始化
//     setupSlider();

//     // RWD 寬度變化時重設
//     window.addEventListener('resize', () => {
//         const newCount = getVisibleCount();
//         if (newCount !== visibleCount) {
//             visibleCount = newCount;
//             setupSlider();
//         }
//     });
// }

export function initAppSlider(wrapper) {
    const slider = wrapper.querySelector('.app-slider');
    const prevBtn = wrapper.querySelector('.arrow.prev');
    const nextBtn = wrapper.querySelector('.arrow.next');

    if (!slider || !prevBtn || !nextBtn) return;

    const GAP_PX = 40; // ⭐ 你設定的 gap 大小（如 .app-slider { gap: 16px }）

    function getVisibleCount() {
        const width = window.innerWidth;
        if (width >= 1024) return 5;
        if (width >= 768) return 3;
        return 1;
    }

    let visibleCount = getVisibleCount();
    let currentIndex = visibleCount;

    function setupSlider() {
        // 移除舊 clone
        slider.querySelectorAll('.clone').forEach(el => el.remove());

        // 取得原始 slides
        let slides = [...slider.querySelectorAll('.app-slide')].filter(slide => !slide.classList.contains('clone'));

        // ⭐ 實際寬度扣除 gap
        const totalGap = GAP_PX * (visibleCount - 1);
        const containerWidth = slider.offsetWidth - totalGap;
        const slideWidth = containerWidth / visibleCount;

        // 設定原始 slide 寬度
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`; // ⭐ 改為 px
            slide.style.maxWidth = `${slideWidth}px`;
            slide.style.boxSizing = 'border-box';
        });

        const cloneCount = visibleCount;

        // ⭐ 前後加 clone（套用同樣寬度）
        for (let i = slides.length - cloneCount; i < slides.length; i++) {
            const clone = slides[i].cloneNode(true);
            clone.classList.add('clone');
            clone.style.flex = `0 0 ${slideWidth}px`;
            clone.style.maxWidth = `${slideWidth}px`;
            clone.style.boxSizing = 'border-box';
            slider.insertBefore(clone, slider.firstChild);
        }

        for (let i = 0; i < cloneCount; i++) {
            const clone = slides[i].cloneNode(true);
            clone.classList.add('clone');
            clone.style.flex = `0 0 ${slideWidth}px`;
            clone.style.maxWidth = `${slideWidth}px`;
            clone.style.boxSizing = 'border-box';
            slider.appendChild(clone);
        }

        const allSlides = [...slider.querySelectorAll('.app-slide')];

        // ⭐ 初始 scrollLeft 定位
        currentIndex = cloneCount;
        slider.scrollLeft = currentIndex * (slideWidth + GAP_PX); // ⭐ 加 gap

        let isTransitioning = false;

        function scrollToIndex(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex = index;
            slider.scrollTo({
                left: currentIndex * (slideWidth + GAP_PX), // ⭐ 加 gap
                behavior: 'smooth'
            });

            setTimeout(() => {
                const maxIndex = allSlides.length - cloneCount;
                const minIndex = cloneCount;

                if (currentIndex >= maxIndex) {
                    slider.scrollLeft = minIndex * (slideWidth + GAP_PX);
                    currentIndex = minIndex;
                } else if (currentIndex < minIndex) {
                    const lastIndex = allSlides.length - cloneCount * 2;
                    slider.scrollLeft = lastIndex * (slideWidth + GAP_PX);
                    currentIndex = lastIndex;
                }

                isTransitioning = false;
            }, 400);
        }

        // 綁定按鈕
        prevBtn.onclick = () => scrollToIndex(currentIndex - 1);
        nextBtn.onclick = () => scrollToIndex(currentIndex + 1);
    }

    // 初始化
    setupSlider();

    // RWD resize
    window.addEventListener('resize', () => {
        const newCount = getVisibleCount();
        if (newCount !== visibleCount) {
            visibleCount = newCount;
            setupSlider();
        }
    });
}
