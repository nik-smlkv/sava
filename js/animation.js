
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
var scrollToVideo = document.querySelector('.scroll-to-video');
const title = document.querySelector(".main-title");
var scrollPosition = scrollToVideo.offsetTop;
const movingImg = document.querySelector('.moving-img');
const aboutButton = document.querySelector(".about-button");
document.addEventListener("DOMContentLoaded", () => {
	// Register GSAP Plugins

	const scrollPanel = () => {
		if (window.innerWidth > 768) {
			const cont = document.querySelector("#panels-container");
			const panels = gsap.utils.toArray("#panels-container .panel");
			var scrollMath = window.innerWidth > 2560 ? (-2 * (cont.scrollWidth - innerWidth)) : (-1.1 * (cont.scrollWidth - innerWidth));
			let tween = gsap.to(panels, {
				x: () => scrollMath,
				ease: "none",
				scrollTrigger: {
					trigger: "#panels-container",
					pin: true,
					start: "-20%",
					scrub: 2,
					end: () => "+=" + (cont.scrollWidth - (innerWidth / 1.1)),
				},
			});
		}
	}
	scrollPanel();
	/*  PARALLAX  */
	if (window.innerWidth >= 768) {
		document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: triggerElement,
					start: "-70% 0%",
					scrub: true,
				}
			});;
			const layers = [
				{ layer: "1", yPercent: -25 },
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
				document.querySelector('.about-button').style.display = "flex";
				textElement.classList.add('line-up');
			},
			onLeaveBack: () => {
				textElement.classList.remove('line-up');
			}
		});
	});
});

document.addEventListener('DOMContentLoaded', () => {
	var scrollToVideo = document.querySelector(".scroll-to-video");

	function preventScroll(event) {
		event.preventDefault();
		event.stopPropagation();
	}
	window.addEventListener('DOMContentLoaded', () => {
		const video = document.querySelector('.video');
		const scrollToVideo = document.querySelector('.scroll-to-video');
		if (window.innerWidth >= 768) {
			video.pause();
			if (isInSectionBodyMain()) {
				scrollToVideo.classList.add('js-scrolling');
			} else {
				video.style.visibility = "visible";
				video.play();
			}
		}
	});

	function isInSectionBodyMain() {
		const sectionBodyMain = document.querySelector('.section__body-main');
		const scrollPosition = window.scrollY;
		const sectionTop = sectionBodyMain.offsetTop - 220;
		const sectionBottom = sectionTop + sectionBodyMain.offsetHeight;
		return scrollPosition >= sectionTop && scrollPosition <= sectionBottom;
	}

	if (window.innerWidth >= 768) {
		var title = document.querySelector(".main-title");
		var aboutButton = document.querySelector(".about-button");

		var scrollPosition = window.scrollY;
		var videoPosition = scrollToVideo.offsetTop;
		var maxScroll = videoPosition - title.offsetHeight;
		var scrollPercent = Math.min(scrollPosition / maxScroll, 1);
		if (!scrollToVideo.classList.contains('js-scrolling')) {
			gsap.to(title, {
				scrollTrigger: {
					trigger: title,
					start: "top top",
					scrub: true,
					ease: "linear"
				},
				y: -200,
				opacity: 0,
				duration: .5
			});
			gsap.to(aboutButton, {
				scrollTrigger: {
					trigger: aboutButton,
					start: "top top",
					end: "bottom top",
					scrub: true,
					ease: "power2.out"
				},
				y: -200,
				opacity: 0,
				duration: .5
			});
		}
		window.addEventListener("wheel", (e) => {
			let isAnimatingScroll = !1;
			if (!scrollToVideo.classList.contains('js-scrolling')) {
				blockImage.style.display = "block";
				gsap.to(blockImage, {
					maxWidth: '1124px',
					maxHeight: 'auto',
					duration: 1,
					ease: "power1.inOut"
				})
			}
			if (scrollToVideo.classList.contains('js-scrolling')) {
				if (e.deltaY > 0) {
					blockImage.style.position = 'fixed';
					gsap.to(title, {
						opacity: 0,
						duration: 0.5,
						ease: "linear",
						onEnter: () => {
							gsap.to(aboutButton, {
								opacity: 0,
								duration: 0.5,
								ease: "power2.out",
								onComplete: () => {
									gsap.to(blockImage, {
										width: '100vw',
										maxWidth: '100vw',
										maxHeight: '100%',
										height: '100vh',
										right: "0px",
										duration: 0.1,
										ease: "linear",
										scrollTrigger: {
											trigger: sectionBody,
											start: "0% 0%",
											onEnter: (self) => {
												if (self.direction === 1) {
													if (!isAnimatingScroll && scrollToVideo.classList.contains('js-scrolling')) {
														isAnimatingScroll = true;
														window.addEventListener("wheel", preventScroll, { passive: false });
														gsap.to({}, {
															duration: 0.5,
															ease: "power4.out",
															onUpdate: () => {
																lenis.scrollTo(scrollToVideo.offsetTop - 90, {
																	immediate: false,
																	duration: 1
																});
																document.querySelector('.moving-img').style.display = "none";
															},
															onEnter: (self) => {
																blockImage.style.zIndex = "4";
																aboutButton.style.zIndex = "2";
																blockImage.querySelector('.scale-image img').style.scale = "1.24";
																blockImage.querySelector('.scale-image img').style.objectPosition = "right 62%";
																blockImage.style.opacity = "0";
																if (self.direction === 1) {
																	document.body.style.overflow = "hidden";
																}
															},
															onComplete: () => {
																scrollToVideo.classList.remove('js-scrolling');
																scrollToVideo.style.visibility = "visible";
																window.removeEventListener("wheel", preventScroll);
																document.body.style.overflow = "";
																isAnimatingScroll = false;
																setTimeout(() => {
																	if (window.innerWidth >= 768) {
																		blockImage.style.position = "absolute";
																	} else {
																		blockImage.style.position = "static";
																	}
																	blockImage.style.zIndex = "unset";
																	aboutButton.style.zIndex = "5";
																	blockImage.style.right = "auto";
																	document.querySelector('.moving-img').style.display = "block";
																	blockImage.style.height = "auto";
																	blockImage.style.maxWidth = "1152px";
																	sectionBody.style.maxInlineSize = "1920px";
																	scrollToVideo.style.position = "relative";
																	scrollToVideo.style.zIndex = "6";
																	blockImage.querySelector('.scale-image img').style.scale = "1";
																	blockImage.querySelector('.scale-image img').style.objectPosition = "center";
																	blockImage.style.opacity = "1";
																}, 500);
																video.play();
															},
															toggleActions: "play none none none"
														});
													}
												}
											},
											onLeave: () => {
												isAnimatingScroll = false;
												window.removeEventListener("wheel", preventScroll);
												document.body.style.overflow = "";
												video.play();
												if (window.innerWidth >= 768) {
													blockImage.style.position = "absolute";
												} else {
													blockImage.style.position = "static";
												}
												aboutButton.style.zIndex = "5";
												blockImage.style.height = "100%";
												blockImage.style.maxHeight = "100%";
												sectionBody.style.position = "relative";
												sectionBody.style.maxInlineSize = "1920px";
												scrollToVideo.style.visibility = "visible";
												blockImage.querySelector('.moving-img').style.display = "block";
												gsap.to(blockImage, {
													width: 'auto',
													height: 'auto',
													duration: 0.1,
													ease: "power3.out",
													onLeave: () => {
														blockImage.style.display = "block";
													}
												});
											},
											toggleActions: "play none none none"
										}
									});
								}
							});
						},
					});
				}
			}

		}

		)
	}
});
