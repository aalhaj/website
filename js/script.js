// Toast Notification مثال لـ
function showWelcomeToast() {
    iziToast.success({
        title: 'أهلاً بك',
        message: 'مرحباً بك في منصة aalhaj!',
        position: 'topRight',
        rtl: true
    });
}

// Modal via Ajax مثال لـ
$(document).ready(function () {
    // عرض Toast عند تحميل الصفحة
    showWelcomeToast();

    // Modal 1: عند النقر على رابط المنتج
    $('.product-details-btn').click(function (e) {
        e.preventDefault();
        $('#productModal .modal-body').load('ajax/product-details.html', function () {
            $('#productModal').modal('show');
        });
    });

    // Modal 2: عند النقر على رابط الخدمة  
    $('.service-details-btn').click(function (e) {
        e.preventDefault();
        $('#serviceModal .modal-body').load('ajax/service-details.html', function () {
            $('#serviceModal').modal('show');
        });
    });

    // تحسين Validation للنماذج
    $('#loginForm, #registerForm').on('submit', function (e) {
        // إضافة تحقق من صحة البيانات هنا
        let email = $('#email').val();
        if (!isValidEmail(email)) {
            e.preventDefault();
            iziToast.error({
                title: 'خطأ',
                message: 'البريد الإلكتروني غير صحيح',
                position: 'topRight',
                rtl: true
            });
        }
    });

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});



// في ملف js/script.js
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + (stat.getAttribute('data-count').includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.getAttribute('data-count').includes('+') ? '+' : '');
            }
        }, 16);
        
        stat.classList.add('animated');
    });
    
    // تفعيل أشرطة التقدم
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow') + '%';
            bar.style.width = width;
        });
    }, 1000);
}

// تفعيل عند التمرير إلى القسم
function initStatsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(document.querySelector('.stats-section'));
}

// استدعاء عند تحميل الصفحة
$(document).ready(function() {
    initStatsAnimation();
    
    // تأثيرات إضافية عند hover
    $('.stat-item').hover(
        function() {
            $(this).css('transform', 'translateY(-10px) scale(1.02)');
        },
        function() {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );
});