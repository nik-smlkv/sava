
const video = document.querySelector('.video');

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
	smooth: true,
	direction: 'vertical',
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy(document.body, {
	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},
	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},
	pinType: document.body.style.transform ? "transform" : "fixed",
});


var blockImage = document.querySelector('.block-image');
var sectionBody = document.querySelector('.section__body-main');

const title = document.querySelector(".main-title");

const movingImg = document.querySelector('.moving-img');
const aboutButton = document.querySelector(".about-button");
document.addEventListener("DOMContentLoaded", () => {
	// Register GSAP Plugins

	/*  PARALLAX  */
	if (window.innerWidth >= 768) {
		document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: triggerElement,
					start: "-70% 0%",
					scrub: true,
				}
			});
			const isWindowScreen = window.innerWidth <= 2560;
			const layers = [
				{ layer: "1", yPercent: isWindowScreen ? -15 : -26 },
				{ layer: "2", yPercent: -40 },
				{ layer: "3", yPercent: 20 },
				{ layer: "4", yPercent: 10 }
			];
			layers.forEach((layerObj, idx) => {
				tl1.to(
					triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
					{
						yPercent: layerObj.yPercent,
						ease: "none"
					},
					idx === 0 ? undefined : "<"
				);
			});
		});
	}
});
/* GSAP COUNTER */
document.addEventListener("DOMContentLoaded", () => {
	// Получаем все элементы счетчиков
	const counters = document.querySelectorAll(".counter");
	const countersFloat = document.querySelectorAll(".counter-float");
	counters.forEach(counter => {
		const endValue = counter.getAttribute("data-end-value"); // Получаем конечное значение из атрибута
		const triggerCounter = document.querySelector('.trig-counter');
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: triggerCounter,
				start: "120% 120%",  // START ANIMATION TRIGGER
			}
		});
		// Анимация счетчика
		tl.to({ value: 0 }, {
			value: endValue,
			duration: 3, // Длительность анимации в секундах
			onUpdate: function () {
				counter.innerText = Math.ceil(this.targets()[0].value);
			},
			ease: "power1.out" // Эффект easing
		});
	});
	countersFloat.forEach(countersFloat => {
		const endValue = countersFloat.getAttribute("data-end-value"); // Получаем конечное значение из атрибута
		const triggerCounter = document.querySelector('.trig-counter');
		// Анимация счетчика
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: triggerCounter,
				start: "120% 120%",  // START ANIMATION TRIGGER
			}
		});
		tl.to({ value: 0 }, {
			value: endValue,
			duration: 3, // Длительность анимации в секундах
			onUpdate: function () {
				countersFloat.innerText = this.targets()[0].value.toFixed(3);
			},
			ease: "power1.out" // Эффект easing
		});
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const splitTexts = document.querySelectorAll('.split-text');

	splitTexts.forEach((textElement) => {
		const animtextLine = Splitting({
			target: '.split-text',
			by: 'lines'
		});

		animtextLine.forEach((splitResult) => {
			const wrappedLines = splitResult.lines.map((wordsArr, i) => {
				const wordsHTML = wordsArr.map((word) => {
					if (document.querySelector('.main-title') && word.style.getPropertyValue('--word-index') === '1') {
						return `${word.outerHTML.replace('<span class="word"', '<span class="word title-span"')}<span class="whitespace"></span>`;
					}
					return `${word.outerHTML}<span class="whitespace"></span>`;
				}).join('');

				return `<div class="line" style="--line-index: ${i};">${wordsHTML}</div>`;
			}).join('');
			splitResult.el.innerHTML = wrappedLines;
		});
		ScrollTrigger.create({
			trigger: textElement,
			start: "120% 120%",
			onEnter: () => {
				document.querySelector('.main-title').style.display = "flex";
				textElement.classList.add('line-up');
			},
			onLeaveBack: () => {
				textElement.classList.remove('line-up');
			}
		});
	});
});

let rightPosition = 0;

function adjustBackgroundPosition() {
	const mainBlock = document.querySelector('.main-block');
	rightPosition += 0.01;
	if (mainBlock) {
		mainBlock.style.backgroundPosition = `calc(38vw + ${rightPosition}vw) bottom, center center`;
	}
}

window.addEventListener('resize', () => {
	if (window.innerWidth <= 1840 && window.innerWidth >= 768) {
		adjustBackgroundPosition();
	} else {
		const mainBlock = document.querySelector('.main-block');
		mainBlock.style.backgroundPosition = `auto bottom, center center`;
	}
});
window.addEventListener('DOMContentLoaded', () => {
	if (window.innerWidth <= 1840 && window.innerWidth >= 768) {
		adjustBackgroundPosition();
	}
});


// Анимация для .investment-apartment
gsap.fromTo('.investment-apartment', {
	height: '0%',
	y: 100,
	opacity: 0
}, {
	duration: 1,
	height: '100%',
	y: 0,
	opacity: 1,
	ease: 'power2.out',
	scrollTrigger: {
		trigger: '.investment-block',
		start: 'top bottom',
		end: 'bottom center',
		toggleActions: 'play none none reverse',

	}
});

// Анимация для .investment-lobby
gsap.fromTo('.investment-lobby', {
	height: '0%',
	y: 100,
	opacity: 0
}, {
	duration: 1,
	height: '100%',
	y: 0,
	opacity: 1,
	ease: 'power2.out',
	scrollTrigger: {
		trigger: '.investment-block',
		start: 'center bottom',
		end: 'bottom center',
		toggleActions: 'play none none reverse',

	}
});

// Анимация для .investment-subtitle-anim
gsap.fromTo('.investment-subtitle-anim', {
	opacity: 0,
	y: 50
}, {
	duration: 1,
	opacity: 1,
	y: 0,
	ease: 'power2.out',
	scrollTrigger: {
		trigger: '.investment-block',
		start: 'center bottom',
		end: 'bottom center',
		toggleActions: 'play none none reverse',

	}
});

// Анимация для .grid-content-text
gsap.fromTo('.grid-content-text', {
	opacity: 0, // Начальная прозрачность
	y: 50       // Начальное положение ниже
}, {
	duration: 1,
	opacity: 1, // Конечная прозрачность
	y: 0,       // Конечное положение
	ease: 'linear',
	scrollTrigger: {
		trigger: '.investment-block',
		start: 'center bottom',
		end: 'bottom center',
		toggleActions: 'play none none reverse',

	}
});

gsap.fromTo('.investment-angle-apartment', {
	height: '0',   // Начальная высота
	y: 100,        // Начальное положение ниже
	opacity: 0     // Начальная прозрачность
}, {
	duration: 1,
	height: '506px', // Конечная высота
	y: 0,           // Конечное положение
	opacity: 1,     // Конечная прозрачность
	ease: 'power2.out',
	scrollTrigger: {
		trigger: '.investment-block',
		start: 'center bottom',  // Начало анимации
		end: 'bottom center',  // Конец анимации
		toggleActions: 'play none none reverse',
	}
});
/* gsap.to('.main-block', {
	height: 0,
	duration: 1,
	ease: 'power2.out',
	scrollTrigger: {
		trigger: '#about-project', // Второй блок
		start: 'top bottom',       // Начало анимации
		end: 'bottom top',         // Конец анимации
		scrub: true,               // Плавное взаимодействие
	}
});

 */
const layers = gsap.utils.toArray(".layer-section");

layers.forEach((layer, i) => {
	const pauseLayer = Boolean(layer.dataset.pauseLayer);
	if (pauseLayer) {
		gsap.set(layer, { marginBottom: "100vh" });
		const slides = gsap.utils.toArray(".horizontal-slide", layer);
		gsap.to(slides, {
			xPercent: -100 * (slides.length - 1),
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: layer,
				start: "top top",
				end: "+=200%",
				scrub: true
			}
		});
		ScrollTrigger.create({
			trigger: layer,
			start: "top top",
			end: "+=100%",
			scrub: true,
			pin: true,
			pinSpacing: false,
			id: i + 1,
		});
	} else {
		ScrollTrigger.create({
			trigger: layer,
			start: "top top",
			end: "+=80%",
			pin: true,
			pinSpacing: false,
			id: i + 1,
		});
	}
});