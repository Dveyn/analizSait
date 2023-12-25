export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация пароля (от 6 символов, хотя бы одна буква)
export const validatePassword = (password: string): boolean => {
  return password.length >= 6 && /[a-zA-Z]/.test(password);
};

// Валидация URL
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
