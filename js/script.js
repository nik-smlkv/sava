let windowsArray = ["1770", "1620", "1520", "1420", "1320", "1200", "1000", "900"];
let originalWindowsArray = [...windowsArray]; // Оригинальная копия массива
const burger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const headerBody = document.querySelector('.header__body');
let headerNav = document.querySelector('.header__nav');
let headerNavList = document.querySelector('.header__nav ul');
let temporalHeaderNav = headerNav.cloneNode(true);
temporalHeaderNav.classList.add('nav-clone');
let headerLogo = document.querySelector('.header__logo');
let clonedHeaderBlock = null;

const updateCheckWidth = () => {
	return window.innerWidth <= 1770 && window.innerWidth >= 768;
};

// Переключение меню при клике на бургер
burger.addEventListener('click', (event) => {
	event.stopPropagation(); // Предотвращаем всплытие
	headerMenu.classList.toggle('active');

	if (headerMenu.classList.contains('active')) {
		const headerBlock = document.querySelector('.header-block');
		clonedHeaderBlock = headerBlock.cloneNode(true);

		const childToRemove = clonedHeaderBlock.querySelector('.header__burger');
		if (childToRemove) {
			clonedHeaderBlock.removeChild(childToRemove);
		}

		headerMenu.appendChild(clonedHeaderBlock);
	} else {
		if (clonedHeaderBlock) {
			clonedHeaderBlock.remove();
			clonedHeaderBlock = null;
		}
	}
});

// Закрытие меню при клике вне его области
/* ДОПИСАТЬ */
document.addEventListener('click', (event) => {
	const target = event.target;
	if (!headerMenu.contains(target) && !burger.contains(target)) {
		headerMenu.classList.remove('active');
		if (clonedHeaderBlock) {
			clonedHeaderBlock.remove();
			clonedHeaderBlock = null;
		}
	}
});

document.querySelectorAll('.header__nav a').forEach(link => {
	link.addEventListener('click', function (event) {
		const target = event.target;
		if (headerMenu.contains(target)) {
			headerMenu.classList.remove('active');
			if (clonedHeaderBlock) {
				clonedHeaderBlock.remove();
				clonedHeaderBlock = null;
			}
		}
	});
});

// Обновление клона меню
const getHeaderClone = () => {
	const checkWidth = updateCheckWidth();
	if (checkWidth) {
		if (!headerMenu.querySelector('.nav-clone')) {
			temporalHeaderNav.querySelectorAll('li').forEach(item => item.remove());
			headerBody.insertAdjacentElement("afterbegin", headerNav);
			headerMenu.insertAdjacentElement("afterbegin", temporalHeaderNav);
		}
	} else {
		const existingClone = headerMenu.querySelector('.nav-clone');
		if (existingClone) existingClone.remove();
	}
};
let itemToRemoveArray = [];
let isResized = false;
// Обработка адаптивности ссылок
const handleHeaderLinks = () => {
	const checkWidth = updateCheckWidth();
	if (checkWidth && temporalHeaderNav) {
		let listItems = Array.from(headerNav.querySelectorAll('li'));
		let screenWidth = window.innerWidth;
		windowsArray.map(width => {
			windowsArray = windowsArray.filter(width => screenWidth >= parseInt(width));
			if (screenWidth < parseInt(width) && listItems.length > 0) {
				let itemToRemove = listItems.pop();
				if (headerNavList.contains(itemToRemove)) {
					headerNavList.removeChild(itemToRemove);
				}
				temporalHeaderNav.querySelector('ul').appendChild(itemToRemove);
				itemToRemoveArray.push(itemToRemove);
			}
		});
		isResized = true;
	} else if (isResized) {
		headerMenu.insertAdjacentElement("afterend", headerNav);
		temporalHeaderNav.querySelectorAll('li').forEach(item => {
			headerNavList.appendChild(item);
		});
		itemToRemoveArray.forEach(item => {
			headerNavList.appendChild(item);
		});
		windowsArray = originalWindowsArray;
	}
};
// Обновление логотипа
const getHeaderLogo = () => {
	const checkWidth = updateCheckWidth();
	const existingLogo = headerBody.querySelector('.header__logo.clone');

	if (checkWidth) {
		if (!existingLogo) {
			const clonedHeaderLogo = headerLogo.cloneNode(true);
			clonedHeaderLogo.classList.add('clone');
			headerBody.appendChild(clonedHeaderLogo);
		}
	} else {
		if (existingLogo) {

			existingLogo.remove();
		}
	}
};

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
	getHeaderClone();
	getHeaderLogo();

	handleHeaderLinks();
});

// Обработка при изменении размера окна
window.addEventListener('resize', () => {
	getHeaderClone();
	handleHeaderLinks();
	getHeaderLogo();

});

document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector("header");
	const whiteBackgroundBlocks = document.querySelectorAll(".white-bg-block");
	const observerHeader = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Если блок с белым фоном пересекается
				header.style.backgroundColor = "#07315F";
			} else {
				header.style.backgroundColor = "rgba(28, 54, 82, 0.2)";
			}
		});
	}, {
		threshold: 0.01,
	});
	whiteBackgroundBlocks.forEach((block) => observerHeader.observe(block));


});
document.addEventListener("DOMContentLoaded", () => {
	const navLinks = document.querySelectorAll(".header__nav li a");
	const sections = document.querySelectorAll("section");

	if (!sections.length || !navLinks.length) {
		console.error("Секции или ссылки не найдены!");
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const link = document.querySelector(`a[href="#${entry.target.id}"]`);

			if (link) {
				if (entry.isIntersecting) {
					link.classList.add("active-link");
				} else {
					link.classList.remove("active-link");
				}
			}
		});
	}, {
		threshold: 0.5
	});

	sections.forEach((section) => observer.observe(section));


	document.querySelectorAll('.header__nav a').forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault(); // Отключаем стандартное поведение якоря

			const targetId = this.getAttribute('href').substring(1); // Получаем ID цели
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				// Плавное перемещение к цели
				const offset = -100; // Сдвиг на -100px
				const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth' // Плавный переход
				});

				// Подсветка активной ссылки
				document.querySelectorAll('.flex-style-row a').forEach(link => link.classList.remove('active-link'));
				this.classList.add('active-link');
			}
		});
	});
	const logo = document.querySelector('.header__logo');
	if (logo) {
		logo.addEventListener('click', function (event) {
			event.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
			document.querySelectorAll('.flex-style-row a').forEach(link => link.classList.remove('active-link'));
		});
	}
	const buttonScrollForm = document.querySelector('.js-scroll-form');
	if (buttonScrollForm) {
		buttonScrollForm.addEventListener('click', function (event) {
			event.preventDefault();

			const targetId = this.getAttribute('href').substring(1); // Получаем ID цели
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				// Плавное перемещение к цели
				const offset = -100; // Сдвиг на -100px
				const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth' // Плавный переход
				});
				document.querySelectorAll('.flex-style-row a').forEach(link => link.classList.remove('active-link'));
				this.classList.add('active-link');
			}
		});
	}
});

let startX;
let isScrolling = false;

const getScrollablePanels = () => {
	const checkWidth = updateCheckWidth();
	if (checkWidth) {
		const scrollable = document.querySelector('#panels-container');
		if (!scrollable) {
			console.error('Элемент #panels-container не найден!');
			return;
		}

		scrollable.addEventListener('touchstart', (event) => {
			startX = event.touches[0].clientX;
		});

		scrollable.addEventListener('touchmove', (event) => {
			event.preventDefault();
			const touchX = event.touches[0].clientX;
			const deltaX = startX - touchX;

			if (!isScrolling) {
				isScrolling = true;
				requestAnimationFrame(() => {
					scrollable.scrollBy({
						left: deltaX,
						behavior: 'smooth'
					});
					isScrolling = false;
				});
			}

			startX = touchX;
		}, { passive: false });
	}
};

const priceRequestDialog = document.getElementById('priceRequest');
const openDialogButton = document.querySelector('.open-dialog');
const closeDialogButton = priceRequestDialog.querySelector('.close__dialog');

// Открытие диалога с анимацией
openDialogButton.addEventListener('click', () => {
	priceRequestDialog.showModal();
	priceRequestDialog.classList.add('active');
});

// Закрытие диалога с анимацией
closeDialogButton.addEventListener('click', () => {
	priceRequestDialog.classList.remove('active');

	setTimeout(() => {
		priceRequestDialog.close();
	}, 400);
});

$('[data-fancybox="apartment"]').fancybox({
	buttons: [
		"slideShow",
		"thumbs",
		"zoom",
		"fullScreen",
		"share",
		"close"
	],
	loop: false,
	protect: true
});

$('[data-fancybox="gallery"]').fancybox({
	buttons: [
		"thumbs",
		"zoom",
		"fullScreen",
		"share",
		"close"
	],
	loop: false,
	slideShow: false,

	protect: true
});

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("requestForm");
	const inputs = document.querySelectorAll(".input-event");
	inputs.forEach((input) => {
		input.addEventListener("input", () => {
			if (input.value > 0) {

			}
		})
	})
	form.addEventListener("submit", (event) => {
		event.preventDefault(); // Предотвращение отправки формы

		// Получение значений
		const nameInput = document.getElementById("name");
		const phoneInput = document.getElementById("phone");
		const emailInput = document.getElementById("mail");

		// Очистка сообщений об ошибках
		clearErrorMessages();

		let isValid = true;

		// Валидация имени
		if (!validateName(nameInput.value)) {
			showError(nameInput, "Name is required and should not contain special characters.");
			isValid = false;
		}

		// Валидация телефона
		if (!validatePhone(phoneInput.value)) {
			showError(phoneInput, "Phone is required and should follow format +381 00 000-0000.");
			isValid = false;
		}

		// Валидация email
		if (!validateEmail(emailInput.value)) {
			showError(emailInput, "Email is required and must be a valid email address.");
			isValid = false;
		}

		if (isValid) {
			alert("Form submitted successfully!");
		}
	});

	// Функции для валидации
	function validateName(name) {
		const namePattern = /^[a-zA-Z\s]+$/;
		return name.trim() !== "" && namePattern.test(name);
	}

	function validatePhone(phone) {
		const phonePattern = /^\+381 \d{2} \d{3}-\d{4}$/;
		return phone.trim() !== "" && phonePattern.test(phone);
	}

	function validateEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return email.trim() !== "" && emailPattern.test(email);
	}

	// Показ сообщения об ошибке
	function showError(input, message) {
		const errorMessage = input.parentElement.querySelector(".error-message");
		errorMessage.textContent = message;
		errorMessage.style.color = "red"; // Цвет сообщения
	}

	// Очистка сообщений об ошибках
	function clearErrorMessages() {
		const errorMessages = document.querySelectorAll(".error-message");
		errorMessages.forEach((message) => {
			message.textContent = "";
		});
	}
});


/* 
const createOdometer = (el, value) => {
	const odometer = new Odometer({
		el: el,
		value: 0,
	});

	let hasRun = false;

	const options = {
		threshold: [0, 0.9],
	};

	const callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (!hasRun) {
					odometer.update(value);
					hasRun = true;
				}
			}
		});
	};

	const observer = new IntersectionObserver(callback, options);
	observer.observe(el);
};

const residentialOdometer = document.querySelector(".residential-odometer");
createOdometer(residentialOdometer, 23762);

const commercialOdometer = document.querySelector(".commercial-odometer");
createOdometer(commercialOdometer, 17);

const buildingsOdometer = document.querySelector(".buildings-odometer");
createOdometer(buildingsOdometer, 4);

const apartmentsOdometer = document.querySelector(".apartments-odometer");
createOdometer(apartmentsOdometer, 384);

 */
document.addEventListener('DOMContentLoaded', () => {
	let buttonsCardOpen = document.querySelectorAll('.circle');
	buttonsCardOpen.forEach(buttonOpen => {
		buttonOpen.addEventListener('click', () => {
			const textContent = buttonOpen.nextElementSibling;
			textContent.classList.toggle('open');
			if (textContent.classList.contains('open')) {
				buttonOpen.innerHTML = "Click <br> closed";
			} else {
				buttonOpen.innerHTML = "Click <br> open";
			}
		})
	});

	if (window.innerWidth <= 1000) {
		const slidesBlock = document.querySelector('.slides-block__content');
		const infoListItems = document.querySelectorAll('.block-info__list .features-block-info__item');
		const clonedSlidesBlock = slidesBlock.cloneNode(true);
		if (clonedSlidesBlock) {
			slidesBlock.classList.add('remove-block');
			if (slidesBlock.classList.contains('remove-block')) {
				slidesBlock.remove();
			}
		}
		const slides = clonedSlidesBlock.querySelectorAll('.slide-block__card');
		infoListItems.forEach((item, index) => {
			if (slides[index]) {
				item.appendChild(slides[index]);
			}
		});
	}
})

