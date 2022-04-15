const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const PHOTO_PREVIEW_WIDTH = '70';
const PHOTO_PREVIEW_HEIGHT = '70';
const avatarInput = document.querySelector('#avatar');
const avatarPicture = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('#images');
const photoContainer = document.querySelector('.ad-form__photo');

const addAvatarHandler = (input, picture) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      picture.src = URL.createObjectURL(file);
    }
  });
};

const addPhotoHandler = (input, pictureContainer) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      if (pictureContainer.querySelector('.picture')) {
        pictureContainer.removeChild(pictureContainer.querySelector('.picture'));
      }
      const picture = document.createElement('img');
      picture.classList.add('picture');
      picture.src = URL.createObjectURL(file);
      picture.alt = 'Фото пользователя';
      picture.width = PHOTO_PREVIEW_WIDTH;
      picture.height = PHOTO_PREVIEW_HEIGHT;
      pictureContainer.appendChild(picture);
    }
  });
};

const removePictures = () => {
  avatarPicture.src = DEFAULT_AVATAR;
  if (photoContainer.querySelector('.picture')){
    photoContainer.removeChild(photoContainer.querySelector('.picture'));
  }
};

addAvatarHandler(avatarInput, avatarPicture);
addPhotoHandler(photoInput, photoContainer);

export {removePictures};
