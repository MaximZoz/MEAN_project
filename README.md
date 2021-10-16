## 6.8 Удаление категории

#### Скрываем кнопку удалить если это не новая категория

- client\src\app\categories-page\categories-form\categories-form.component.html => button => \*ngIf="!isNew"

#### реализовываем метод удаления категории

- client\src\app\categories-page\categories-form\categories-form.component.ts => deleteCategory

#### создаём интерфейс Message

- client\src\app\shared\interfaces.ts => Message

#### реализовываем метод delete в categories service

- client\src\app\shared\services\categories.service.ts => delete
