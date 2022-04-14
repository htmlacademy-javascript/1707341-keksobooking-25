const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const AVATAR_WIDTH = '40';
const AVATAR_HEIGHT = '44';
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const PHOTO_PREVIEW_WIDTH = '70';
const PHOTO_PREVIEW_HEIGHT = '70';
const avatarInput = document.querySelector('#avatar');
const avatarContainer = document.querySelector('.ad-form-header__preview');
const photoInput = document.querySelector('#images');
const photoContainer = document.querySelector('.ad-form__photo');

const addAvatarAttributes = (picture) => {
  picture.alt = 'Аватар пользователя';
  picture.width = AVATAR_WIDTH;
  picture.height = AVATAR_HEIGHT;
};

const addPhotoAttributes = (picture) => {
  picture.alt = 'Фото пользователя';
  picture.width = PHOTO_PREVIEW_WIDTH;
  picture.height = PHOTO_PREVIEW_HEIGHT;
};

const addPictureHandler = (input, pictureContainer, pictureType) => {
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
      switch (pictureType) {
        case 'avatar': {
          addAvatarAttributes(picture);
          break;
        }
        case 'photo': {
          addPhotoAttributes(picture);
          break;
        }
      }
      pictureContainer.appendChild(picture);
    }
  });
};

const removePictures = () => {
  avatarContainer.removeChild(avatarContainer.querySelector('.picture'));
  const avatar = document.createElement('img');
  avatar.classList.add('picture');
  avatar.src = DEFAULT_AVATAR;
  addAvatarAttributes(avatar);
  avatarContainer.appendChild(avatar);
  if (photoContainer.querySelector('.picture')){
    photoContainer.removeChild(photoContainer.querySelector('.picture'));
  }
};

addPictureHandler(avatarInput, avatarContainer, 'avatar');
addPictureHandler(photoInput, photoContainer, 'photo');

export {removePictures};
