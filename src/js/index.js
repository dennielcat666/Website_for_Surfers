import Tabs from './Tabs';
import SideMenu from './SideMenu';

/** matches polyfill */
(function (e) {
	e.matches || (e.matches = e.matchesSelector || function (selector) {
		var matches = document.querySelectorAll(selector), th = this;
		return Array.prototype.some.call(matches, function(e) {
			return e === th;
		});
	});
})(Element.prototype);

/**
 * Открытие бокового меню
 * принимает конфиг и callback
*/
new SideMenu({}, function() {});

/**
 * Табы
 * поддерживают вложенность
 * принимает конфиг и callback
 */
new Tabs({}, function() {});

/** Копирует ссылку страницы в списке страниц */
(() => {
	$('.js-copy-link').click(function (e) {
		e.stopPropagation();
		const link = $(this).parents('a').attr('href');

		if (link) {
			let responseText;

			try {
				const textCopyContainer = $('<input>');
				$('body').append(textCopyContainer);

				textCopyContainer.val(qualifyURL(link)).select();
				document.execCommand('copy');
				textCopyContainer.remove();

				if (screen.width > 600) responseText = 'Ссылка скопирована';
				else responseText = 'Скопировано';

			} catch(e) {
				responseText = 'Неудача';
			}

			const response = $(`<div class="response">${responseText}</div>`);

			$(this).append(response);
			response.fadeOut(1500, () => {
				response.remove();
			});
		}

		return false;
	});

	function qualifyURL(url) {
		const elem = document.createElement('div');
		elem.innerHTML = `<a href="${url}">x</a>`;
		return elem.firstChild.href;
	}
})();
