export default {
  translation: {
    header: {
      logout: 'Выйти',
    },
    loginPage: {
      title: 'Вход',
      imgAlt: 'главное изображение',
      nickname: 'Никнейм',
      password: 'Пароль',
      button: 'Войти',
      footer: {
        text: 'Нет аккаунта?',
        link: 'Регистрация',
      },
    },
    signupPage: {
      title: 'Регистрация',
      imgAlt: 'главное изображение для регистрации',
      nickname: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
      footer: {
        text: 'Есть аккаунт?',
        link: 'Вход',
      },
    },
    channels: {
      title: 'Каналы',
      dropdown: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
    },
    messages: {
      messages: 'сообщения',
    },
    modals: {
      titleRenameChannel: 'Переименовать канал',
      titleDeleteChannel: 'Удалить канал',
      titleAddChannel: 'Добавить канал',
      textDeleteChannel: 'Вы действительно хотите удалить канал?',
    },
    form: {
      labels: {
        channelName: 'Название канала',
      },
      buttons: {
        submit: 'Отправить',
        cancel: 'Отменить',
        delete: 'Удалить',
      },
      errors: {
        required: 'Обязательное поле',
        channelExists: 'Такой канал уже существует',
        min: 'Слишком мало',
        max: 'Слишком много',
        userExists: 'Такой пользователь уже существует',
        nickname: 'Неверные имя пользователя или пароль',
        password: 'Неверные имя пользователя или пароль',
        passwordConfirm: 'Неверные имя пользователя или пароль',
        passwordMustMatch: 'Пароли должны совпадать',
      },
    },
    toast: {
      addChannel: 'Канал добавлен',
      renameChannel: 'Канал переименован',
      errorNetwork: 'Ошибка соединения',
    },
  },
};
