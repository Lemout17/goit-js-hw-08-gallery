import images from './gallery-items.js'


const imagesContainer = document.querySelector('ul.js-gallery');
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');
const btnClose = document.querySelector('[data-action="close-lightbox"]');
const lightBoxOverlay = document.querySelector('.lightbox__overlay');
const bodyRef = document.querySelector('body');
const imagesMarkup = createImagesMarkup(images);
imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup);


function createImagesMarkup(images) {
     return images.map(({ preview, original, description }) => {
         return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
         
     }).join('');
}
 
function onOpenBtnClick(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    e.preventDefault();
    lightBox.classList.add('is-open');
    onOpenModal(e);
}

function onOpenModal(e) {
    lightBoxImage.src = e.target.dataset.source;
    lightBoxImage.alt = e.target.alt;
}

function onCloseBtnClick(e) {
    lightBox.classList.remove('is-open');
    lightBoxImage.src = "";
    lightBoxImage.alt = "";
    
}

function onEscKeydown(e) {
    if (e.keyCode !== 27) {
        return;
    }

    lightBox.classList.remove('is-open');
    onOpenModal(e);
}

imagesContainer.addEventListener('click', onOpenBtnClick);
btnClose.addEventListener('click', onCloseBtnClick);
lightBoxOverlay.addEventListener('click', onCloseBtnClick);
bodyRef.addEventListener('keydown', onEscKeydown);
