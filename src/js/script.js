document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const studentImg = document.querySelector('.floating-img.img-student');
    const communityImg = document.querySelector('.floating-img.img-community');
    const h1 = document.querySelector('h1');
    const sticker = document.querySelector('.sticker');

    const parallaxStrength = 0.3;

    if (studentImg) {
        studentImg.style.transform = `translateY(${scrollPosition * parallaxStrength}px)`;
    }

    if (sticker) {
        sticker.style.transform = `translateY(${scrollPosition * parallaxStrength}px)`;
    }

    if (communityImg) {
        communityImg.style.transform = `translateY(${scrollPosition * parallaxStrength}px)`;
    }
    // if (h1) {
    //         h1.style.transform = `translateY(${scrollPosition * parallaxStrength}px)`;
    //     }
});