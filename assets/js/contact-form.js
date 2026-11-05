(function () {
	'use strict';

	const contactEmail = 'jeff@fumblelabs.com';
	const form = document.getElementById('project-form');
	const status = document.getElementById('contact-status');

	function announce(target, message, isError) {
		target.textContent = message;
		target.classList.toggle('is-error', Boolean(isError));
	}

	const fieldMessages = {
		name: 'Enter your name.',
		'reply-email': 'Enter a valid email address.',
		message: 'Tell us what you would like cleaned.'
	};

	function showFieldError(field) {
		const error = document.getElementById(field.id + '-error');
		if (!error) return;
		field.setAttribute('aria-invalid', 'true');
		error.textContent = fieldMessages[field.id] || 'Check this field.';
		announce(status, 'Please check the highlighted fields.', true);
	}

	form.addEventListener('invalid', function (event) {
		showFieldError(event.target);
	}, true);

	['name', 'reply-email', 'message'].forEach(function (id) {
		const field = document.getElementById(id);
		field.addEventListener('input', function () {
			if (!field.validity.valid) return;
			field.removeAttribute('aria-invalid');
			document.getElementById(id + '-error').textContent = '';
		});
	});

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		const fields = new FormData(form);
		const subject = 'Apteno Optics project inquiry';
		const message = [
			'Hello Apteno Optics,',
			'',
			'Name: ' + fields.get('name'),
			'Reply email: ' + fields.get('replyEmail'),
			'Phone: ' + (fields.get('phone') || 'Not provided'),
			'Surface: ' + fields.get('surface'),
			'',
			'Project details:',
			fields.get('message')
		].join('\n');

		window.location.href = 'mailto:' + contactEmail +
			'?subject=' + encodeURIComponent(subject) +
			'&body=' + encodeURIComponent(message);
		announce(status, 'Your email app should open with the project details ready to send.', false);
	});
}());
