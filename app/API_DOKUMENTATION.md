# 📚 Study Timer API — Dokumentation

Base URL: `https://din-domän.com/api`

---

## Endpoints

### 1. Hämta alla sessioner

**`GET /api/sessions`**

Returnerar en paginerad lista med alla studiesessioner, nyaste först.

**Exempel:**
```
GET https://din-domän.com/api/sessions
```

**Svar:**
```json
{
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "subject": "Matte",
            "minutes": 30,
            "xp_earned": 300,
            "created_at": "2025-01-03T14:00:00.000000Z",
            "updated_at": "2025-01-03T14:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 3,
        "per_page": 15,
        "total": 42
    }
}
```

---

### 2. Filtrera på ämne

**`GET /api/sessions?subject={ämne}`**

Tillgängliga ämnen: `Engelska`, `Matte`, `Historia`

**Exempel:**
```
GET https://din-domän.com/api/sessions?subject=Matte
```

---

### 3. Ändra antal per sida

**`GET /api/sessions?per_page={antal}`**

Default är 15. 

**Exempel:**
```
GET https://din-domän.com/api/sessions?per_page=5
```

---

### 4. Kombinera filter

**Exempel:**
```
GET https://din-domän.com/api/sessions?subject=Engelska&per_page=10&page=2
```

---

### 5. Hämta en enskild session

**`GET /api/sessions/{id}`**

**Exempel:**
```
GET https://din-domän.com/api/sessions/1
```

**Svar:**
```json
{
    "data": {
        "id": 1,
        "user_id": 1,
        "subject": "Matte",
        "minutes": 30,
        "xp_earned": 300,
        "created_at": "2025-01-03T14:00:00.000000Z",
        "updated_at": "2025-01-03T14:00:00.000000Z"
    }
}
```

---

## Query-parametrar

| Parameter  | Typ     | Default | Beskrivning                        |
|------------|---------|---------|------------------------------------|
| `subject`  | string  | —       | Filtrera på ämne                   |
| `per_page` | integer | 15      | Antal sessioner per sida           |
| `page`     | integer | 1       | Sidnummer                          |

---

## Felkoder

| Kod  | Betydelse                          |
|------|------------------------------------|
| 200  | OK — request lyckades              |
| 404  | Sessionen hittades inte            |
| 500  | Serverfel                          |

---

## Exempel i JavaScript

```javascript
// Hämta alla sessioner
const res = await fetch('https://domän.com/api/sessions');
const data = await res.json();
console.log(data.data); // Array med sessioner

// Filtrera på ämne
const res = await fetch('https://domän.com/api/sessions?subject=Matte');
const data = await res.json();
```

## Exempel i Python

```python
import requests

# Hämta alla sessioner
res = requests.get('https://din-domän.com/api/sessions')
data = res.json()
print(data['data'])

# Filtrera på ämne
res = requests.get('https://din-domän.com/api/sessions', params={'subject': 'Matte'})
data = res.json()
```

---

> **OBS:** Byt ut `din-domän.com` mot din faktiska domän eller IP-adress.
