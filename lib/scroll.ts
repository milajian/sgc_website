/**
 * 平滑滚动到指定 section，并管理焦点
 * @param sectionId - 目标 section 的 id
 */
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  // 动态获取 Header 高度
  const header = document.querySelector('header');
  const headerOffset = header ? header.offsetHeight : 80;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: "smooth"
  });

  // 焦点管理：滚动后将焦点移至目标 section
  element.setAttribute('tabindex', '-1');
  element.focus({ preventScroll: true });
  element.addEventListener('blur', () => {
    element.removeAttribute('tabindex');
  }, { once: true });
};

/**
 * 直接跳转到指定 section（无滚动动画），用于跨页面导航
 * @param sectionId - 目标 section 的 id
 */
export const jumpToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  // 动态获取 Header 高度
  const header = document.querySelector('header');
  const headerOffset = header ? header.offsetHeight : 80;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  // 直接跳转，无滚动动画
  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: "auto"
  });

  // 焦点管理：跳转后将焦点移至目标 section
  element.setAttribute('tabindex', '-1');
  element.focus({ preventScroll: true });
  element.addEventListener('blur', () => {
    element.removeAttribute('tabindex');
  }, { once: true });
};

