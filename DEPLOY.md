# Деплой TalentMind

Ручная сборка Docker-образа и деплой в Kubernetes через Helm.


## 1. Сборка образа

Из корня репозитория:

```bash
docker build -t cr.yandex/crp6vn90m70ft81br1ud/talentmindru:0.2.0 .
```

> Собираете на ARM-маке под amd64-ноды кластера? Добавьте `--platform linux/amd64`.

### Проверка локально

```bash
docker run --rm -p 3000:3000 cr.yandex/crp6vn90m70ft81br1ud/talentmindru:0.2.0
# открыть http://localhost:3000 → должен отвечать 200, затем Ctrl+C
```

---

## 2. Пуш в registry

Запушить:

```bash
docker push cr.yandex/crp6vn90m70ft81br1ud/talentmindru:0.2.0
```

---

## 3. Подготовка кластера (один раз)

### Namespace

```bash
kubectl create namespace talentmind-demo
```

### Pull-секрет `regcred` (кластер тянет приватный образ)

Нужен JSON-ключ сервис-аккаунта с ролью `container-registry.images.puller`:

```bash
# создать ключ SA (файл key.json НЕ коммитить — он под .gitignore)
yc iam key create --service-account-name <SA_NAME> --output key.json

kubectl create secret docker-registry regcred \
  --namespace talentmind-demo \
  --docker-server=cr.yandex \
  --docker-username=json_key \
  --docker-password="$(cat key.json)"
```

### Секрет для формы заявок (Google Sheets)

Форма на `/contacts` пишет заявки в Google-таблицу. Ключ сервисного аккаунта
**не хранится в репозитории** — его нужно положить в k8s-секрет `talentmind-sheets`
(имя задаётся в `values.yaml` → `deployments.talentmind.sheetsSecretName`).

Понадобится JSON-ключ сервисного аккаунта Google (файл вида `tm12-XXXXXX.json`)
и ID таблицы. Таблица должна быть расшарена (доступ «Редактор») на email сервисного
аккаунта (поле `client_email` внутри JSON).

```bash
kubectl create secret generic talentmind-sheets \
  --namespace talentmind-demo \
  --from-literal=GOOGLE_SHEET_ID=1vUjPnU5tHvWwPLxhmSTWy_cGzmyABd5fEKYrqHymvrg \
  --from-file=GOOGLE_SERVICE_ACCOUNT_KEY=/путь/к/tm12-XXXXXX.json
```

> Ключ `GOOGLE_SERVICE_ACCOUNT_KEY` берётся из файла как есть (весь JSON) — приложение
> разбирает его само. Файл `*.json` **не коммитить** (он под `.gitignore`).

Секрет помечен `optional: true` в деплойменте: если его ещё нет, под всё равно
запустится, но форма не будет писать в таблицу, пока секрет не создан. После
создания/обновления секрета перезапустите поды:

```bash
kubectl -n talentmind-demo rollout restart deployment/talentmind
```

### (опционально) Basic-auth на ingress

Если включаете `basicAuth.enabled: true` в `values.yaml`:

```bash
htpasswd -c auth <username>            # создаст файл auth
kubectl create secret generic talentmind-basic-auth \
  --namespace talentmind-demo --from-file=auth
```

---

## 4. Деплой через Helm

Сначала **dry-run** — посмотреть, что отрендерится (по правилам безопасности):

```bash
helm upgrade --install talentmind ./.kuber \
  --namespace talentmind-demo \
  --dry-run
```

Если всё ок — установка/обновление:

```bash
helm upgrade --install talentmind ./.kuber \
  --namespace talentmind-demo \
  --atomic --wait
```

- `--atomic` — при неудачном деплое автоматически откатывает релиз.
- `--wait` — ждёт готовности подов.

Можно переопределить тег образа на лету, не редактируя values:

```bash
helm upgrade --install talentmind ./.kuber -n talentmind-demo \
  --set deployments.talentmind.image.tag=0.2.0 --atomic --wait
```

---

## 5. Проверка

```bash
kubectl -n talentmind-demo get pods,svc,ingress
kubectl -n talentmind-demo rollout status deployment/talentmind
kubectl -n talentmind-demo logs deploy/talentmind -f
```

Под должен быть `Running`/`Ready`. Ingress получит адрес, cert-manager выпустит `talentmind-tls` (нужно, чтобы DNS домена `talentmind.ru` смотрел на ingress-controller).

---

## 6. Откат

```bash
helm history talentmind -n talentmind-demo          # список ревизий
helm rollback talentmind <REVISION> -n talentmind-demo
```

---

## Обновление версии (шпаргалка)

1. Внести изменения в код.
2. Поднять тег:
   - `docker build -t cr.yandex/crp6vn90m70ft81br1ud/talentmindru:<NEW> .`
   - `docker push cr.yandex/crp6vn90m70ft81br1ud/talentmindru:<NEW>`
3. Обновить `.kuber/values.yaml` → `deployments.talentmind.image.tag: "<NEW>"` и `.kuber/Chart.yaml`.
4. `helm upgrade --install talentmind ./.kuber -n talentmind-demo --atomic --wait`
