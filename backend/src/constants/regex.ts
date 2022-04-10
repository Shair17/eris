export const POST_SLUG: RegExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const USERNAME_REGEX: RegExp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,29}$/;

export const EMAIL_REGEX: RegExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const PASSWORD_REGEX: RegExp =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const AT_USERNAME_REGEX: RegExp =
	/^@(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,29}$/;
