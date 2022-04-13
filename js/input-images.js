const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const PHOTO_PREVIEW_WIDTH = '70';
const PHOTO_PREVIEW_HEIGHT = '70';
const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('#images');
const photoContainer = document.querySelector('.ad-form__photo');
avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoInput.addEventListener('change', () =>{
  const file = photoInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (photoContainer.querySelector('.preview')) {
      photoContainer.removeChild(photoContainer.querySelector('.preview'));
    }
    const photoPreview = document.createElement('img');
    photoPreview.classList.add('preview');
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.alt = 'Фото пользователя';
    photoPreview.width = PHOTO_PREVIEW_WIDTH;
    photoPreview.height = PHOTO_PREVIEW_HEIGHT;
    photoContainer.appendChild(photoPreview);
  }
});
