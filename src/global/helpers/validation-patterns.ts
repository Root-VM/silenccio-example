export const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
export const webUrlPattern = /^(?:www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(?:\/[^\s]*)?$/;
export const webUrlPatternLong = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(?:\/[^\s]*)?$/;

export const namePattern = /^[a-zA-ZÄÖÜẞßäöü\- ']+$/;

export const cityPattern = /^[a-zA-ZÄÖÜẞßäöü\- ']+$/;
