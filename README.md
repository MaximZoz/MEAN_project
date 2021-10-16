## 6.10 Добавление и редактирование позиций. Часть 2

#### в categories-form передаём в app-positions-form categoryId

- client\src\app\categories-page\categories-form\categories-form.component.html => app-positions-form => categoryId

#### создаём селектор модального окна modal

- client\src\app\categories-page\categories-form\positions-form\positions-form.component.html

#### Создаём интерфейс Position

- client\src\app\shared\interfaces.ts

#### в PositionsService создаём метод fetch

- client\src\app\shared\services\positions.service.ts

#### отображаем позиции

- client\src\app\categories-page\categories-form\positions-form\positions-form.component.ts
