// ==========================================
// 1. تفعيل أنميشن الظهور (AOS)
// ==========================================
AOS.init({
    duration: 1000, // مدة حركة الظهور (ثانية واحدة)
    once: true,     // الأنميشن يحدث مرة واحدة فقط أثناء النزول
    offset: 100,    // يبدأ الأنميشن قبل الوصول للعنصر بـ 100 بكسل
    easing: 'ease-in-out', // انسيابية الحركة
});

// ==========================================
// 2. تفعيل تأثير الكتابة (Typed.js)
// ==========================================
// التأكد من وجود العنصر أولاً لتجنب الأخطاء
if (document.getElementById('typing-text')) {
    new Typed('#typing-text', {
        strings: [
            'AI Engineer', 
            'Data Scientist', 
            'Machine Learning Expert',
            'Robotics Engineer'
        ],
        typeSpeed: 60,    // سرعة الكتابة
        backSpeed: 40,    // سرعة المسح
        backDelay: 2000,  // مدة الانتظار قبل المسح
        loop: true,       // تكرار للأبد
        showCursor: true, // إظهار المؤشر |
        cursorChar: '|'
    });
}

// ==========================================
// 3. منطق السلايدر الأفقي (Project Slider)
// ==========================================
let currentSlide = 0;
const track = document.getElementById('projectTrack');
const dots = document.querySelectorAll('.dot');
const totalSlides = dots.length;

/**
 * وظيفة تحريك السلايدر عبر الأزرار
 * @param {number} direction - (1) للتالي، (-1) للسابق
 */
function moveSlide(direction) {
    currentSlide += direction;

    // الدوران اللانهائي
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateSlider();
}

/**
 * تحديث واجهة السلايدر
 */
function updateSlider() {
    if (!track) return; // حماية في حال عدم وجود السلايدر في الصفحة

    // تحريك المسار أفقياً
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;

    // تحديث حالة النقاط (Dots)
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// إضافة إمكانية النقر على النقاط مباشرة
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// التحريك باستخدام أسهم لوحة المفاتيح
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {
        moveSlide(1);
    } else if (e.key === "ArrowLeft") {
        moveSlide(-1);
    }
});