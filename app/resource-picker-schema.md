# Resource Picker Schema

Gunakan `ResourcePicker` untuk menambahkan resource katalog dari HitPay. ResourcePicker hanya untuk memilih data; setelah `pick({ type })`, persist payload ke Turso dan render dari Turso.

## Supported resource types

- `product`
- `customer`
- `order`
- `charge`
- `invoice`
- `add-on`

## Payload minimum

Setiap item yang dipilih menyediakan `id` HitPay dan field snapshot yang relevan, biasanya `name`, `title`, `number`, `status`, `amount`, atau `currency` sesuai resource.

```ts
type ResourcePickerItem = {
  id: string
  [key: string]: unknown
}
```

Simpan `id` HitPay sebagai identifier utama. Simpan field tampilan sebagai snapshot agar workflow tidak perlu memanggil ulang API untuk setiap row.

## Aturan implementasi

- Panggil ResourcePicker dengan `useResourcePicker()` dan `pick({ type })`.
- Kirim payload hasil picker ke `createServerFn`.
- Validasi role dan persist payload di server; jangan percaya identity dari client.
- Render visible rows dari Turso, bukan dari `list-*` HitPay.
- `get-*-details` hanya untuk menampilkan atau me-refresh satu id yang sudah tersimpan.
- Jangan mengirim connector value, token, atau kredensial ke browser.
- Coupon, discount, tax, shipping, pickup, category, dan location menggunakan matching `*Select`, bukan ResourcePicker.
