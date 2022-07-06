'use strict';

const shape = document.querySelector('.mobile__shape');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const control = document.querySelector('.control');
const main = document.querySelector('.main');
const gooContainer = document.querySelector('.goo-container');
const gooPath = document.querySelector('.goo--path');
const gooRect = document.querySelector('.goo--rect');
const sections = document.querySelectorAll('.main__section');
const btns = document.querySelectorAll('.btn');
let circularProgress = document.querySelector('.circular-progress');
const mobileMenu = document.querySelector('.mobile__menu');
const mobileOne = document.querySelector('.mobile__menu-1');
const mobileNavigation = document.querySelector('.mobile__navigation');
let menuState = false;
let progress;
let progressValue;
let counter = 0;
let translate;

const showSection = function (e) {
  let currentNavLinkData = e.target.dataset.link;
  let activeSection = document.querySelector('.main--show');
  let futureSection = main.querySelector(`[data-link="${currentNavLinkData}"]`);

  if (activeSection.dataset.link !== currentNavLinkData) {
    [futureSection, activeSection].forEach((section) =>
      section.classList.add('transition')
    );
    activeSection.classList.remove('main--show');
    activeSection.classList.add('main--hide');
    futureSection.classList.remove('main--hide');
    futureSection.classList.add('main--show');

    changeGooColor(futureSection);
  }
};

const changeGooColor = function (section) {
  [gooPath, gooRect].forEach((el) => {
    let sectionBg = window
      .getComputedStyle(section)
      .getPropertyValue('background-color');
    el.style.fill = sectionBg;
  });
};

const moveGoo = async function (e) {
  let svg = e.target.querySelector('.nav__link-svg');
  let svgPosition = svg.offsetLeft;
  let svgHeight = svg.offsetTop;
  let gooPosition = `${svgPosition + svgHeight / 2 + 12}px`;

  gooContainer.style.left = gooPosition;
  translate = gooPosition;
};

const activeNavigationLink = function (e) {
  e.target.classList.add('active');

  navLinks.forEach((el) => {
    if (el != e.target) {
      el.classList.remove('active');
    }
  });
};

const noPointerEventsNav = function (e) {
  navLinks.forEach((el) => {
    if (el != e.target) {
      el.classList.add('no--click');
      setTimeout(function () {
        el.classList.remove('no--click');
      }, 1050);
    }
  });
};

const mobileMenuOpen = function () {
  mobileNavigation.style.transform = `translate(-100%, 50%)`;
  nav.classList.add('nav--mobile');
  mobileMenu.classList.add('open');
  menuState = true;
};

const mobileMenuClose = function () {
  mobileNavigation.style.transform = `translate(-50%, 50%)`;
  nav.classList.remove('nav--mobile');

  mobileMenu.classList.remove('open');
  menuState = false;
};

const showTimer = function () {
  progressValue = 0;
  let progressEnd = 360;
  let progressSpeed = 1000;
  circularProgress.style.opacity = `1`;

  progress = setInterval(() => {
    progressValue += 45;
    circularProgress.style.background = `conic-gradient(
        var(--primary) ${progressValue * 1}deg,
        var(--acc1) ${progressValue * 1}deg
      )`;

    if (progressValue === progressEnd) {
      hideTimer();
      resetTimer();
      mobileMenuClose();
    }
  }, progressSpeed);
};

const resetTimer = function () {
  progressValue = 0;
  circularProgress.style.background = `conic-gradient(
      var(--primary) 0deg,
      var(--acc1) 0deg
      )`;
  clearInterval(progress);
};

resetTimer();

const hideTimer = function () {
  circularProgress.style.opacity = `0`;
};

const init = function () {
  sections.forEach((section) => {
    if (section.classList.contains('main__section-2')) {
      section.classList.add('main--show');

      changeGooColor(section);

      navLinks.forEach((link) => {
        if (link.dataset.link === section.dataset.link)
          link.classList.add('active');
      });
    } else section.classList.add('main--hide');
  });
};

init();

nav.addEventListener('click', function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  counter += 1;
  if (counter > 1) {
    counter = 0;
    return;
  }

  if (!e.target.classList.contains('nav__link--active')) noPointerEventsNav(e);

  moveGoo(e);
  activeNavigationLink(e);
  showSection(e);
  resetTimer();
  showTimer();
});

mobileNavigation.addEventListener('click', (e) => {
  if (!menuState) {
    mobileMenuOpen();
    showTimer();
  } else {
    mobileMenuClose();
    resetTimer();
    hideTimer();
  }
});

mobileMenu.addEventListener('click', (e) => {
  mobileMenuClose();
  hideTimer();
  resetTimer();
});
