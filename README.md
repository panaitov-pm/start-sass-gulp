# start-sass-gulp - для стартовый проект для быстрой и качественной верстки

Данный пакет содержит в себе необходимые npm плагины для быстрой верстки:

* **browser-sync** - встроенный сервер для редактирвоаниия sccs файлов без перезагрузи страницы.
* **gulp-sass** - компилятор sass файлов
* **gulp.spritesmith** - автоматическое создание спрайтов
* **gulp-autoprefixer** - создание префиксов css для кросброузерности
* **gulp-sourcemaps** - для генерации карты css
* **gulp-ftp** - для отправки изменений на сервер
* **gulp-file-include** - для подключения частей шаблона, например header, footer
* **gulp-imagemin** - минификатор изображений
* **gulp-group-css-media-queries** - для групировки медиазапросов
* и другие важные плагины...

##Как начать работу

1. Копируем репозиторий в папку в которой планируем делать верстку. Для этого запускаем в консоли ```$ git clone https://github.com/karakushan/start-sass-gulp.git```
2. Запускаем ```npm update``` в консоли для скачивания, обновления npm плагинов
3. Для старта сервера запускаем команду ```gulp```

## Описание папок

Папка **app** содержит поддиректории в которых должны находится исходники, которые будут преобазованны в файлы пригодные для отображения на сайте.
* html - содержит исходники html файлов. 
* scss - исходники sass файлов в формате scss
* img - папка с исходными изображениями
* img/icons - папка с иконками (для генерации спрайта)
* js - javascript файлы

Папка **dist** содержит в себе компилированные файлы пригодные для отображения на сайте.

## Поключение частей шаблона в html

Теперь нет необходимости верстать весь шаблон наново потому что у нас есть прекрасный плагин под названием **gulp-file-include**. Это удобно для подключения повторяющихся блоков на всех страницах html шаблона. Использйте конструкцию ```@@include('./view.html')``` для того, чтобы включить блок view.html в общем шаблоне. 

## Благодарности

Если мой проект помогает вам, то я не против если вы отблагодарите хоть какой-то суммой. Для сотрудничества пишите на мою почту: karakushan@gmail.com я дам вам реквизиты для перечисления средств. 

**Желаю плодотворной работы, и хорошего настроения. Удачи вам!!!**




